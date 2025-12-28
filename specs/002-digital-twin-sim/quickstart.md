# Quickstart: Digital Twin Simulation with Gazebo & Unity Documentation

## Setup and Development Environment

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git for version control
- A text editor or IDE

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   This will start a local development server at http://localhost:3000

4. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

### Project Structure
```
docs/
├── docs/
│   ├── digital-twin-sim/                        # Main module directory
│   │   ├── physics-simulation-gazebo.md         # Chapter 1
│   │   ├── digital-twins-hri-unity.md           # Chapter 2
│   │   └── sensor-simulation-validation.md      # Chapter 3
│   └── ...
├── docusaurus.config.js                        # Docusaurus configuration
├── sidebars.js                                 # Navigation sidebar configuration
├── package.json                                # Project dependencies and scripts
└── static/                                     # Static assets
```

## Adding New Content

### Creating a New Chapter
1. Create a new `.md` file in the `docs/docs/digital-twin-sim/` directory
2. Add frontmatter to the file:
   ```markdown
   ---
   id: chapter-title
   title: Chapter Title
   sidebar_label: Chapter Title
   ---
   ```
3. Add the chapter to the `sidebars.js` file to make it appear in the navigation

### Running Tests
```bash
npm test
# or
yarn test
```

### Previewing Changes
- The development server automatically reloads when you make changes
- Visit http://localhost:3000 to see your changes in real-time

## Deployment
- The site is automatically deployed to GitHub Pages when changes are pushed to the main branch
- Ensure all links work correctly and content renders properly before committing
- Run `npm run build` locally to test the production build before deployment

## Troubleshooting
- If you encounter issues with the development server, try clearing the cache:
  ```bash
  npm run clear
  # or
  yarn clear
  ```
- If build fails, check for syntax errors in your markdown files
- Ensure all referenced images and files exist in the correct locations

## Gazebo and Unity Simulation Environment Setup

For users who want to follow along with the simulation examples:

### Gazebo Setup
- Install ROS 2 (Humble Hawksbill or later recommended)
- Install Gazebo Garden or Fortress
- Set up the ROS 2 workspace with required packages

### Unity Setup
- Install Unity Hub and Unity 2022.3 LTS or later
- Install required packages for robotics simulation
- Set up ROS-TCP-Connector for communication with ROS 2

### Recommended System Requirements
- OS: Ubuntu 22.04 LTS or Windows 10/11
- RAM: 16GB or more recommended
- GPU: Dedicated graphics card with OpenGL 4.5 support for Unity
- Storage: 20GB free space for complete simulation environment