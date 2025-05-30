# Project Guidelines

## Project Overview
This is a Vue.js frontend application built with modern tooling and practices. The project follows a component-based architecture with a clear separation of concerns and a focus on maintainability and reusability.

## Project Structure

### Root Structure
- `src/`: Main source code
- `jest-utils/`: Testing utilities
- `dev-utils/`: Development utilities
- `.husky/`: Git hooks configuration
- `coverage/`: Test coverage reports

### Source Code Organization
The source code is organized into the following directories:

- `assets/`: Static assets like images, fonts, etc.
- `components/`: UI components following Atomic Design principles
- `constants/`: Application constants and enumerations
- `constructors/`: Constructor functions and classes
- `directives/`: Vue custom directives
- `iconfont/`: Icon font assets
- `plugins/`: Vue plugins
- `routes/`: Routing configuration
- `services/`: Business logic and API services
- `types/`: TypeScript type definitions
- `use/`: Vue 3 Composition API composables
- `validate-rules/`: Form validation rules

## Guideline Documents

For detailed guidelines on specific aspects of the project, please refer to the following documents:

- [Components](./components.md) - Guidelines for component structure, naming, and organization
- [Testing](./testing.md) - Guidelines for writing and organizing tests (ALWAYS look here when creating tests)
- [Code Style](./code-style.md) - Guidelines for code formatting and style conventions
- [API Integration](./api.md) - Guidelines for integrating with APIs

## Development Workflow

### Git Workflow
- Follow the Git branching model
- Write descriptive commit messages
- Create pull requests for code reviews

### Code Reviews
- Review code for functionality, readability, and maintainability
- Ensure code follows project guidelines
- Provide constructive feedback

### Documentation
- Document complex logic
- Use JSDoc comments for functions and components
- Keep documentation up to date