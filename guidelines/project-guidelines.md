# Project Guidelines and Patterns

## Project Structure
```
src/
├── assets/         # Static assets (images, styles, etc.)
├── components/     # Components following Atomic Design
│   ├── atoms/     # Basic building blocks
│   ├── molecules/ # Combinations of atoms
│   ├── organisms/ # Complex components
│   └── pages/     # Page-specific components
├── composables/   # Vue composition functions (use-*.ts files)
├── constants/     # Application constants
├── i18n/         # Internationalization
├── interfaces/   # TypeScript interfaces
├── pages/        # Route pages
├── router/       # Vue Router configuration
├── routes/       # Route definitions
├── services/     # Business logic and services
│   ├── api/     # API service functions (*-api-service.ts)
│   └── ...      # Other services (*-service.ts)
├── types/        # TypeScript type definitions
├── constructors/ # Constructor functions and classes
├── directives/  # Vue custom directives
├── iconfont/    # Icon font assets
├── plugins/     # Vue plugins
└── validate-rules/ # Form validation rules

## Naming Conventions

### Composables
- File naming: kebab-case with 'use-' prefix (e.g., `use-counter.ts`)
- Function naming: camelCase with 'use' prefix (e.g., `useCounter`)
- State should be defined outside the main composable function using reactive/ref

### Services
- Regular services: suffix with '-service' (e.g., `auth-service.ts`)
- API services: suffix with '-api-service' (e.g., `users-api-service.ts`)
- Store in appropriate services directory

## Component Design Patterns

### 1. Atomic Design Pattern
- Atoms: Basic building blocks (buttons, inputs, labels)
- Molecules: Simple groups of atoms (form fields, search bars)
- Organisms: Complex components (headers, forms, cards)
- Pages: Page-specific components and layouts

### 2. Component Naming and Structure
- Use PascalCase for component names
- Multi-word component names are required (except for root App.vue)
- Components should have a root element with a class matching the component name

### 3. Class Naming Convention
- Root element class should match component name
- Use BEM-like naming for nested elements
- Component's root class should ONLY be used within that component
- For external styling, use additional specific classes:
  ```vue
  <!-- Correct -->
  <ASomeComponent class="specific-component" />
  
  <!-- In parent component CSS -->
  .specific-component { /* styles */ }
  
  <!-- WRONG -->
  .a-some-component { /* styles */ } /* Don't use component's root class outside its own file */
  ```

## State Management
- No external state management library
- Use Composition API and composables for state management
- State should be defined outside composable functions:
  ```typescript
  // use-some-state.ts
  const state = reactive({
    // state properties
  })
  
  export function useSomeState() {
    // composable logic
    return {
      // return state and methods
    }
  }
  ```

## Routing
- Use custom `useRouter` composable for all routing operations
- Don't use Vue Router composables directly
- All route-related functions should go through `useRouter`

## Code Style Rules

### Vue Components
- Maximum 3 attributes per line in single-line elements
- One attribute per line in multiline elements
- Self-closing tags are required for void elements
- Proper component order (as per vue/order-in-components)
- No unused components
- No this usage in templates

### Styling
- No scoped styles
- All styles must be nested under component's root class
- Component's root class must only be used in its own component
- Use specific classes for external styling
- No global styles unless absolutely necessary

### TypeScript
- Explicit types for function parameters
- Avoid using generic Function type
- Warn on any usage
- Proper type definitions in interfaces/

### General
- No console.log (only console.warn and console.error allowed)
- Debugger statements are warned
- Modern ES2021+ features supported

## Tools and Libraries

### VueUse
- Prefer VueUse composables for common functionality
- Import from '@vueuse/core'

### Internationalization
- Use Vue-i18n for translations
- Keep translations in src/i18n/locales/
- Use translation keys in components

## Development Workflow
- Use Node version specified in .nvmrc
- ESLint + Prettier for code formatting
- TypeScript for type safety
- Vite for development and building
- Follow Git branching model
- Write descriptive commit messages
- Create pull requests for code reviews

## Best Practices
1. Keep components small and focused
2. Use TypeScript interfaces for prop definitions
3. Implement proper error handling
4. Follow Vue 3 Composition API patterns
5. Use VueUse composables when available
6. Keep translations organized and maintainable
7. Follow atomic design principles strictly
8. Use self-closing tags for components without content
9. Document complex logic with JSDoc comments
10. Keep documentation up to date

## Component Organization and Structure

### Page Components
- Create separate components for each section of a page
- Each page should have its own composable for state management
- Pass props or events between components when needed
- Use the store composable for shared state

### Component Reusability
- Create reusable components for common UI elements (buttons, links, icons, etc.)
- Extract components that appear in multiple places
- Use router-link component for internal navigation
- Create shared layouts for common page structures (like footer)

### Component Naming and Structure
- Use PascalCase for component names
- Multi-word component names are required (except for root App.vue)
- Components should have a root element with a class matching the component name

## Data Management

### Mock Data Organization
- Only mock data that will come from API calls
- Never mock static UI text or labels
- Store mock data in api-service files, not in constants
- Use clear, API-like naming (remove 'mock' from file names)
- Example:
  ```typescript
  // ✅ Good - only mocking API data
  export const getHomePageData = () => ({
    featuredPrograms: [...],
    representatives: [...],
    newsItems: [...]
  });

  // ❌ Bad - don't mock static UI text
  export const HOME_MOCK_DATA = {
    title: 'Welcome',
    description: 'Some text'
  };
  ```

### State Management
- Each page should have its own composable for state management
- Use composables as stores for complex components
- Keep related state and logic together
- Example:
  ```typescript
  // home-store.ts
  export function useHomeStore() {
    const programs = ref([]);
    const representatives = ref([]);
    
    async function fetchData() {
      // fetch and update state
    }

    return {
      programs,
      representatives,
      fetchData
    };
  }
  ```

### Component Best Practices
- Never use index as key in v-for directives
- Always use unique identifiers for keys
- Break down large components into smaller, focused ones
- Use props and events for parent-child communication
- Use store composables for complex state management

Example:
```vue
<!-- ✅ Good -->
<div v-for="program in programs" :key="program.id">

<!-- ❌ Bad -->
<div v-for="(program, index) in programs" :key="index">
``` 