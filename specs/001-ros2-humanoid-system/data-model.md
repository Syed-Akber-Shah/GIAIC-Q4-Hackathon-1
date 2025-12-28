# Data Model: ROS 2 Humanoid System

## Entities

### Chapter Content
- **Name**: String (unique identifier for the chapter)
- **Title**: String (display title of the chapter)
- **Content**: Markdown (main content of the chapter)
- **Learning Objectives**: Array<String> (what user should learn from this chapter)
- **Prerequisites**: Array<String> (what user should know before reading)
- **Examples**: Array<CodeExample> (code snippets included in chapter)
- **Exercises**: Array<Exercise> (practice problems for users)

### Code Example
- **Language**: String (programming language, e.g., "python", "xml")
- **Code**: String (actual code content)
- **Description**: String (explanation of what the code does)
- **File Path**: String (where the example file is located)
- **Tags**: Array<String> (categories like "node", "topic", "service", "urdf")

### Exercise
- **Title**: String (title of the exercise)
- **Description**: String (what the user needs to do)
- **Difficulty**: Enum (beginner, intermediate, advanced)
- **Expected Outcome**: String (what the result should be)
- **Solution**: String (optional solution for reference)

### Learning Objective
- **Text**: String (what the user should be able to do)
- **Type**: Enum (understanding, application, analysis)
- **Chapter**: Reference to Chapter Content
- **Success Criteria**: String (how to measure if objective is met)

## Relationships

- Chapter Content contains multiple Code Examples
- Chapter Content contains multiple Exercises
- Chapter Content has multiple Learning Objectives
- Code Examples are categorized by tags (node, topic, service, urdf)

## Validation Rules

- Chapter titles must be unique within the module
- All code examples must be technically accurate and tested
- Exercises must have appropriate difficulty levels
- Learning objectives must be measurable and specific
- All content must be grounded in official ROS 2 documentation

## State Transitions

### Content Creation Workflow
1. **Draft**: Content is being written
2. **Reviewed**: Content reviewed by technical expert
3. **Validated**: Content verified against official documentation
4. **Published**: Content is live in documentation site

### Exercise States
1. **Proposed**: Exercise idea is suggested
2. **Created**: Exercise is written with problem statement
3. **Tested**: Exercise solution is verified to work
4. **Integrated**: Exercise is added to chapter