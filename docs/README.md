# ROS 2 Humanoid System Documentation

This documentation site covers ROS 2 (Robot Operating System 2) fundamentals for humanoid robotics applications.

## Chapters

1. **Introduction to ROS 2 for Physical AI** - Understanding ROS 2 and DDS concepts for humanoid applications
2. **ROS 2 Communication Model** - Nodes, topics, services, and agent ↔ controller flow with rclpy
3. **Robot Structure with URDF** - Understanding URDF for humanoid robots and simulation readiness

## Development

To run the documentation site locally:

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## Building

To build the static site:

```bash
npm run build
```

The built site can be served using any static file server.

## Deployment

The site is designed to be deployed to GitHub Pages. See the `baseUrl` configuration in `docusaurus.config.js` for the deployment settings.