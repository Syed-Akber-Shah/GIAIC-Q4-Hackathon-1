---
id: robot-structure-urdf
title: Robot Structure with URDF
sidebar_label: Robot Structure with URDF
---

# Robot Structure with URDF

## What is URDF?

URDF (Unified Robot Description Format) is an XML-based format used in ROS to describe robot models. It defines the physical and visual properties of a robot, including its links (rigid parts), joints (connections between links), and other elements like sensors and actuators.

URDF is crucial for:
- Robot simulation
- Visualization
- Kinematics and dynamics calculations
- Robot state publishing

## URDF Fundamentals

A URDF file typically contains:

- **Links**: Rigid parts of the robot (e.g., base, arms, legs)
- **Joints**: Connections between links that allow relative motion
- **Visual**: How the robot looks (for visualization)
- **Collision**: Collision properties for simulation
- **Inertial**: Mass and inertia properties for physics simulation

### Basic URDF Structure

```xml
<?xml version="1.0"?>
<robot name="my_robot">
  <!-- Links -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.5 0.5 0.2"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 0.8 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.5 0.5 0.2"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1"/>
      <inertia ixx="1" ixy="0" ixz="0" iyy="1" iyz="0" izz="1"/>
    </inertial>
  </link>

  <!-- Joints -->
  <joint name="base_to_wheel" type="continuous">
    <parent link="base_link"/>
    <child link="wheel_link"/>
    <origin xyz="0.2 0 0" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
  </joint>

  <link name="wheel_link">
    <visual>
      <geometry>
        <cylinder radius="0.1" length="0.05"/>
      </geometry>
    </visual>
  </link>
</robot>
```

## Humanoid-Specific URDF Considerations

Humanoid robots have specific structural requirements that need to be reflected in their URDF:

### Joint Types for Humanoid Robots

- **Revolute**: Single-axis rotation with limits (e.g., elbow, knee)
- **Continuous**: Single-axis rotation without limits (e.g., shoulder, hip)
- **Fixed**: No movement (e.g., sensor mounting)

### Typical Humanoid Joint Configuration

Humanoid robots typically have:

- **6 DOF** in each leg (hip: 3 DOF, knee: 1 DOF, ankle: 2 DOF)
- **7 DOF** in each arm (shoulder: 3 DOF, elbow: 1 DOF, wrist: 3 DOF)
- **3 DOF** in the torso (waist: 3 DOF)
- **3 DOF** in the head (neck: 3 DOF)

### Example Humanoid URDF Snippet

```xml
<?xml version="1.0"?>
<robot name="simple_humanoid">
  <!-- Torso -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.2 0.2 0.4"/>
      </geometry>
      <material name="light_grey">
        <color rgba="0.7 0.7 0.7 1.0"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.2 0.2 0.4"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="5.0"/>
      <inertia ixx="0.1" ixy="0" ixz="0" iyy="0.1" iyz="0" izz="0.1"/>
    </inertial>
  </link>

  <!-- Head -->
  <joint name="neck_joint" type="revolute">
    <parent link="base_link"/>
    <child link="head_link"/>
    <origin xyz="0 0 0.3" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="-0.5" upper="0.5" effort="100" velocity="1"/>
  </joint>

  <link name="head_link">
    <visual>
      <geometry>
        <sphere radius="0.1"/>
      </geometry>
      <material name="white">
        <color rgba="1 1 1 1"/>
      </material>
    </visual>
    <inertial>
      <mass value="1.0"/>
      <inertia ixx="0.01" ixy="0" ixz="0" iyy="0.01" iyz="0" izz="0.01"/>
    </inertial>
  </link>

  <!-- Left Arm -->
  <joint name="left_shoulder_joint" type="continuous">
    <parent link="base_link"/>
    <child link="left_upper_arm_link"/>
    <origin xyz="0.1 0.15 0.1" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
  </joint>

  <link name="left_upper_arm_link">
    <visual>
      <geometry>
        <cylinder length="0.3" radius="0.05"/>
      </geometry>
      <origin xyz="0 0 0.15" rpy="1.5708 0 0"/>
    </visual>
    <inertial>
      <mass value="0.5"/>
      <inertia ixx="0.01" ixy="0" ixz="0" iyy="0.01" iyz="0" izz="0.01"/>
    </inertial>
  </link>

  <joint name="left_elbow_joint" type="revolute">
    <parent link="left_upper_arm_link"/>
    <child link="left_lower_arm_link"/>
    <origin xyz="0 0 0.3" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-2.0" upper="2.0" effort="50" velocity="2"/>
  </joint>

  <link name="left_lower_arm_link">
    <visual>
      <geometry>
        <cylinder length="0.25" radius="0.04"/>
      </geometry>
      <origin xyz="0 0 0.125" rpy="1.5708 0 0"/>
    </visual>
    <inertial>
      <mass value="0.3"/>
      <inertia ixx="0.005" ixy="0" ixz="0" iyy="0.005" iyz="0" izz="0.005"/>
    </inertial>
  </link>
</robot>
```

## Simulation Readiness

To make your URDF ready for simulation:

### 1. Complete Inertial Properties

Every link should have properly defined inertial properties:

```xml
<inertial>
  <mass value="1.0"/>
  <inertia ixx="0.01" ixy="0" ixz="0" iyy="0.01" iyz="0" izz="0.01"/>
</inertial>
```

### 2. Proper Joint Limits

For revolute and prismatic joints, always specify limits:

```xml
<limit lower="-1.57" upper="1.57" effort="100" velocity="1"/>
```

### 3. Transmission Elements

For simulation and real robot control, add transmission elements:

```xml
<transmission name="left_elbow_trans">
  <type>transmission_interface/SimpleTransmission</type>
  <joint name="left_elbow_joint">
    <hardwareInterface>hardware_interface/EffortJointInterface</hardwareInterface>
  </joint>
  <actuator name="left_elbow_motor">
    <hardwareInterface>hardware_interface/EffortJointInterface</hardwareInterface>
    <mechanicalReduction>1</mechanicalReduction>
  </actuator>
</transmission>
```

### 4. Gazebo-Specific Elements

For Gazebo simulation, you might need additional tags:

```xml
<gazebo reference="left_upper_arm_link">
  <material>Gazebo/Blue</material>
</gazebo>
```

## Xacro for Complex Humanoid URDFs

For complex humanoid robots, using Xacro (XML Macros) can simplify the URDF:

```xml
<?xml version="1.0"?>
<robot xmlns:xacro="http://www.ros.org/wiki/xacro" name="humanoid_with_xacro">

  <!-- Define properties -->
  <xacro:property name="M_PI" value="3.1415926535897931" />
  <xacro:property name="arm_length" value="0.3" />
  <xacro:property name="arm_radius" value="0.05" />

  <!-- Macro for arm segments -->
  <xacro:macro name="arm_segment" params="name parent xyz rpy material">
    <joint name="${name}_joint" type="revolute">
      <parent link="${parent}"/>
      <child link="${name}_link"/>
      <origin xyz="${xyz}" rpy="${rpy}"/>
      <axis xyz="0 0 1"/>
      <limit lower="-2.0" upper="2.0" effort="50" velocity="2"/>
    </joint>

    <link name="${name}_link">
      <visual>
        <geometry>
          <cylinder length="${arm_length}" radius="${arm_radius}"/>
        </geometry>
        <origin xyz="0 0 ${arm_length/2}" rpy="${M_PI/2} 0 0"/>
      </visual>
      <collision>
        <geometry>
          <cylinder length="${arm_length}" radius="${arm_radius}"/>
        </geometry>
        <origin xyz="0 0 ${arm_length/2}" rpy="${M_PI/2} 0 0"/>
      </collision>
      <inertial>
        <mass value="0.5"/>
        <inertia ixx="0.01" ixy="0" ixz="0" iyy="0.01" iyz="0" izz="0.01"/>
      </inertial>
    </link>
  </xacro:macro>

  <!-- Use the macro -->
  <xacro:arm_segment name="left_upper_arm" parent="base_link"
                     xyz="0.1 0.15 0.1" rpy="0 0 0" material="blue"/>

</robot>
```

## Learning Objectives

By the end of this chapter, you should be able to:

- Understand the structure and components of a URDF file
- Create URDF descriptions for humanoid robots
- Apply proper inertial properties and joint limits
- Prepare URDF files for simulation
- Use Xacro to simplify complex URDF definitions

## Practical URDF Exercises

1. Create a simple URDF for a bipedal robot with basic links and joints
2. Add proper inertial properties to your robot model
3. Create a URDF using Xacro macros for repetitive elements
4. Validate your URDF using ROS tools like `check_urdf`

## Links to Simulation Tools and Resources

- [ROS URDF Documentation](http://wiki.ros.org/urdf)
- [Gazebo Simulation](http://gazebosim.org/)
- [RViz Visualization](http://wiki.ros.org/rviz)
- [URDF Tutorials](http://wiki.ros.org/urdf/Tutorials)

## Next Steps

With the foundational knowledge of ROS 2, its communication model, and URDF, you now have the core concepts needed to develop applications for humanoid robots. The next step would be to explore specific applications and advanced topics in humanoid robotics.