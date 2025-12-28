---
id: communication-model
title: ROS 2 Communication Model
sidebar_label: Communication Model
---

# ROS 2 Communication Model

## Nodes

In ROS 2, a **Node** is the fundamental unit of execution. Nodes are processes that perform computation and communicate with other nodes through the ROS graph. Think of nodes as the individual components of a robotic system, such as a sensor driver, a path planner, or a motor controller.

### Creating a Node

A node is typically created by inheriting from the `Node` class provided by the client library (rclpy for Python, rclcpp for C++):

```python
import rclpy
from rclpy.node import Node

class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')
        # Node initialization code here
```

### Node Characteristics

- Each node should have a unique name within the ROS domain
- Nodes can be created and destroyed dynamically
- Nodes contain publishers, subscribers, services, and other communication interfaces
- Nodes handle their own threading model

## Topics and Publishers/Subscribers

**Topics** are named buses over which nodes exchange messages. The communication is based on a publish/subscribe pattern where publishers send messages to a topic and subscribers receive messages from a topic.

### Publishers

A **Publisher** is an object that sends messages to a topic:

```python
from std_msgs.msg import String

class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1
```

### Subscribers

A **Subscriber** receives messages from a topic:

```python
from std_msgs.msg import String

class MinimalSubscriber(Node):

    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info('I heard: "%s"' % msg.data)
```

## Services

**Services** provide a request/reply communication pattern, which is synchronous. A service has a service server that provides the functionality and service clients that request the functionality.

### Service Server

```python
from example_interfaces.srv import AddTwoInts

class MinimalService(Node):

    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info('Incoming request\na: %d b: %d' % (request.a, request.b))
        return response
```

### Service Client

```python
from example_interfaces.srv import AddTwoInts

class MinimalClientAsync(Node):

    def __init__(self):
        super().__init__('minimal_client_async')
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')
        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('service not available, waiting again...')
        self.req = AddTwoInts.Request()

    def send_request(self, a, b):
        self.req.a = a
        self.req.b = b
        self.future = self.cli.call_async(self.req)
        rclpy.spin_until_future_complete(self, self.future)
        return self.future.result()
```

## Agent ↔ Controller Flow with rclpy

In humanoid robotics, the agent-controller flow typically involves:

1. **Sensors** publishing data to topics (e.g., joint states, IMU data, camera feeds)
2. **Perception nodes** subscribing to sensor data and publishing processed information
3. **Planning/decision nodes** receiving processed information and sending commands
4. **Actuator controllers** receiving commands and controlling the robot's joints

### Example Agent-Controller Flow

Here's a simplified example of how an agent might interact with a controller:

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import JointState
from trajectory_msgs.msg import JointTrajectory, JointTrajectoryPoint
from builtin_interfaces.msg import Duration

class HumanoidController(Node):
    def __init__(self):
        super().__init__('humanoid_controller')

        # Subscribe to joint states
        self.joint_state_sub = self.create_subscription(
            JointState,
            '/joint_states',
            self.joint_state_callback,
            10
        )

        # Publish joint trajectories
        self.trajectory_pub = self.create_publisher(
            JointTrajectory,
            '/joint_trajectory',
            10
        )

        # Timer for control loop
        self.control_timer = self.create_timer(0.05, self.control_loop)  # 20 Hz

    def joint_state_callback(self, msg):
        # Process joint state data
        self.current_joint_states = msg

    def control_loop(self):
        # Implement control logic
        trajectory_msg = JointTrajectory()
        trajectory_msg.joint_names = ['joint1', 'joint2', 'joint3']  # Example joint names

        point = JointTrajectoryPoint()
        point.positions = [0.0, 0.0, 0.0]  # Example positions
        point.velocities = [0.0, 0.0, 0.0]  # Example velocities
        point.time_from_start = Duration(sec=0, nanosec=50000000)  # 50ms

        trajectory_msg.points.append(point)
        self.trajectory_pub.publish(trajectory_msg)

def main(args=None):
    rclpy.init(args=args)
    controller = HumanoidController()
    rclpy.spin(controller)
    controller.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Quality of Service (QoS) Considerations

When designing communication patterns for humanoid robots, consider the following QoS settings:

- **Reliable vs Best Effort**: Use reliable for critical control data, best effort for sensor data where some loss is acceptable
- **Keep Last vs Keep All**: Use keep last with history depth for most applications to avoid memory issues
- **Durability**: Use transient local for configuration parameters that late-joining nodes need to receive

## Learning Objectives

By the end of this chapter, you should be able to:

- Understand the fundamental ROS 2 communication patterns (nodes, topics, services)
- Create and use publishers and subscribers in Python with rclpy
- Implement service servers and clients
- Design agent-controller communication flows for humanoid robots
- Apply appropriate QoS settings for different types of data

## Practical Exercises

1. Create a simple publisher that sends messages to a custom topic
2. Create a subscriber that receives and processes messages from the topic
3. Implement a service that performs a simple calculation
4. Design a basic agent-controller flow for a simple robot task

## Next Steps

In the next chapter, we'll explore how to describe robot structure using URDF (Unified Robot Description Format) and prepare for simulation readiness.