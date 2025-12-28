---
id: physics-simulation-gazebo
title: Physics Simulation with Gazebo
sidebar_label: Physics Simulation with Gazebo
---

# Physics Simulation with Gazebo

## Introduction to Gazebo Physics Simulation

Gazebo is a powerful physics simulation environment that provides realistic simulation of robots in complex indoor and outdoor environments. It provides high-fidelity physics simulation, high-quality graphics, and convenient programmatic interfaces that make it an ideal platform for testing robotics algorithms, designs, and concepts.

In the context of humanoid robotics, Gazebo is particularly valuable because it allows for:

- Accurate physics simulation including gravity, friction, and collision detection
- Complex environment modeling with realistic lighting and textures
- Integration with ROS/ROS2 for robot control and sensor simulation
- Sensor simulation for cameras, LiDAR, IMU, and other sensors

## Setting Up a Gazebo Environment

### Basic Environment Setup

To set up a basic Gazebo environment, you'll need to create a world file that defines the physics properties, lighting, and objects in the environment. Here's a basic example:

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <world name="basic_world">
    <!-- Physics Engine Configuration -->
    <physics type="ode">
      <max_step_size>0.001</max_step_size>
      <real_time_factor>1.0</real_time_factor>
      <real_time_update_rate>1000.0</real_time_update_rate>
      <gravity>0 0 -9.8</gravity>
    </physics>

    <!-- Include a basic ground plane -->
    <include>
      <uri>model://ground_plane</uri>
    </include>

    <!-- Include the sun for lighting -->
    <include>
      <uri>model://sun</uri>
    </include>

    <!-- Add a simple box obstacle -->
    <model name="box_obstacle">
      <pose>2 0 0.5 0 0 0</pose>
      <link name="link">
        <collision name="collision">
          <geometry>
            <box>
              <size>1 1 1</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>1 1 1</size>
            </box>
          </geometry>
          <material>
            <ambient>0.5 0 0 1</ambient>
            <diffuse>1 0 0 1</diffuse>
            <specular>1 0 0 1</specular>
          </material>
        </visual>
        <inertial>
          <mass>1.0</mass>
          <inertia>
            <ixx>0.166667</ixx>
            <ixy>0</ixy>
            <ixz>0</ixz>
            <iyy>0.166667</iyy>
            <iyz>0</iyz>
            <izz>0.166667</izz>
          </inertia>
        </inertial>
      </link>
    </model>
  </world>
</sdf>
```

### Physics Properties Configuration

Gazebo allows you to configure various physics properties to match your specific requirements:

#### Gravity
The gravity vector defines the gravitational force in the simulation. The default is Earth's gravity (-9.8 m/s² in the Z direction):
```xml
<gravity>0 0 -9.8</gravity>
```

#### Time Step Configuration
The physics engine uses a time step to advance the simulation. Smaller time steps provide more accurate simulation but require more computational resources:
```xml
<max_step_size>0.001</max_step_size>
<real_time_factor>1.0</real_time_factor>
<real_time_update_rate>1000.0</real_time_update_rate>
```

#### Solver Parameters
You can configure the physics solver parameters to balance accuracy and performance:
```xml
<ode>
  <solver>
    <type>quick</type>
    <iters>10</iters>
    <sor>1.0</sor>
  </solver>
  <constraints>
    <cfm>0.0</cfm>
    <erp>0.2</erp>
    <contact_max_correcting_vel>100.0</contact_max_correcting_vel>
    <contact_surface_layer>0.001</contact_surface_layer>
  </constraints>
</ode>
```

## Humanoid Robot Simulation in Gazebo

### Loading Humanoid Robot Models

Humanoid robots in Gazebo are typically defined using URDF (Unified Robot Description Format) or SDF (Simulation Description Format). Here's an example of loading a humanoid robot model:

```xml
<model name="simple_humanoid">
  <!-- Robot base link -->
  <link name="base_link">
    <inertial>
      <mass>10.0</mass>
      <origin xyz="0 0 0.5" rpy="0 0 0"/>
      <inertia ixx="1.0" ixy="0.0" ixz="0.0" iyy="1.0" iyz="0.0" izz="1.0"/>
    </inertial>
    <visual>
      <origin xyz="0 0 0.5" rpy="0 0 0"/>
      <geometry>
        <box size="0.5 0.5 1.0"/>
      </geometry>
    </visual>
    <collision>
      <origin xyz="0 0 0.5" rpy="0 0 0"/>
      <geometry>
        <box size="0.5 0.5 1.0"/>
      </geometry>
    </collision>
  </link>

  <!-- Head link -->
  <link name="head">
    <inertial>
      <mass>2.0</mass>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <inertia ixx="0.1" ixy="0.0" ixz="0.0" iyy="0.1" iyz="0.0" izz="0.1"/>
    </inertial>
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <sphere radius="0.15"/>
      </geometry>
    </visual>
    <collision>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <sphere radius="0.15"/>
      </geometry>
    </collision>
  </link>

  <!-- Joint connecting head to base -->
  <joint name="neck_joint" type="revolute">
    <parent>base_link</parent>
    <child>head</child>
    <origin xyz="0 0 1.0" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="-0.5" upper="0.5" effort="100" velocity="1"/>
  </joint>
</model>
```

### Realistic Physics Interactions

To achieve realistic physics interactions in humanoid robot simulation:

#### Joint Dynamics
Configure joint limits, friction, and damping to match real-world behavior:
```xml
<joint name="elbow_joint" type="revolute">
  <parent>upper_arm</parent>
  <child>lower_arm</child>
  <origin xyz="0 0 -0.3" rpy="0 0 0"/>
  <axis xyz="0 0 1"/>
  <limit lower="-2.0" upper="2.0" effort="50" velocity="2"/>
  <dynamics damping="0.5" friction="0.1"/>
</joint>
```

#### Contact Properties
Define contact properties between different materials for realistic collision behavior:
```xml
<collision name="link_collision">
  <surface>
    <friction>
      <ode>
        <mu>1.0</mu>
        <mu2>1.0</mu2>
        <fdir1>0 0 0</fdir1>
        <slip1>0.0</slip1>
        <slip2>0.0</slip2>
      </ode>
    </friction>
    <bounce>
      <restitution_coefficient>0.1</restitution_coefficient>
      <threshold>100000</threshold>
    </bounce>
    <contact>
      <ode>
        <soft_cfm>0.0</soft_cfm>
        <soft_erp>0.2</soft_erp>
        <kp>1e+13</kp>
        <kd>1.0</kd>
        <max_vel>0.01</max_vel>
        <min_depth>0.001</min_depth>
      </ode>
    </contact>
  </surface>
</collision>
```

## Practical Exercises

### Exercise 1: Basic Gazebo Environment
Create a simple Gazebo world with a ground plane, a light source, and a few objects with different physical properties.

**Steps**:
1. Create a new world file named `basic_humanoid_env.world`
2. Add a ground plane with realistic friction properties
3. Add a humanoid robot model to the environment
4. Configure physics properties appropriate for humanoid simulation
5. Launch the environment in Gazebo and observe the behavior

### Exercise 2: Physics Property Tuning
Experiment with different physics properties to understand their impact on humanoid robot behavior.

**Steps**:
1. Modify gravity to simulate different environments (e.g., moon gravity)
2. Adjust time step size and observe the impact on simulation accuracy
3. Change friction coefficients and observe how it affects robot movement
4. Document the differences in behavior

## Learning Objectives

By completing this chapter, you should be able to:

1. Create and configure basic Gazebo environments for humanoid robot simulation
2. Understand and configure physics properties for realistic simulation
3. Load and configure humanoid robot models in Gazebo
4. Implement realistic physics interactions between robot components and environment
5. Troubleshoot common physics simulation issues

## Prerequisites

Before starting this chapter, you should have:

- Basic understanding of ROS/ROS2 concepts
- Familiarity with URDF/SDF robot description formats
- Understanding of fundamental physics concepts (gravity, friction, collision)
- Basic knowledge of humanoid robot kinematics

## Next Steps

In the next chapter, we'll explore how to create high-fidelity digital twins using Unity for enhanced Human-Robot Interaction (HRI) scenarios.