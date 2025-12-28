// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'index',
    {
      type: 'category',
      label: 'ROS 2 Humanoid System',
      items: [
        'ros2-humanoid-system/introduction-to-ros2',
        'ros2-humanoid-system/communication-model',
        'ros2-humanoid-system/robot-structure-urdf',
        'ros2-humanoid-system/summary',
      ],
    },
    {
      type: 'category',
      label: 'Digital Twin Simulation',
      items: [
        'digital-twin-sim/physics-simulation-gazebo',
        'digital-twin-sim/digital-twins-hri-unity',
        'digital-twin-sim/sensor-simulation-validation',
      ],
    },
  ],
};

export default sidebars;