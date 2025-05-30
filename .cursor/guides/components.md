# Component Guidelines

## Component Architecture

### Atomic Design
The project follows Atomic Design principles for organizing components:

1. **Atoms (`a-*`)**: Basic building blocks (buttons, inputs, etc.)
2. **Molecules (`m-*`)**: Simple groups of UI elements functioning together
3. **Organisms (`o-*`)**: Complex UI components composed of molecules and atoms
4. **Unique Organisms (`o-*`)**: Specialized organisms for specific use cases
5. **Templates (`t-*`)**: Page layouts
6. **Pages (`p-*`)**: Complete pages

### Component Structure
Each component should be organized as follows:

```
component-name/
├── __tests__/
│   └── component-name.test.js
├── index.js
├── component-name.vue
└── component-name.scss
```

- `index.js`: Export file for the component
- `component-name.vue`: Main Vue component file
- `component-name.scss`: Component-specific styles
- `__tests__/`: Directory containing test files

## Naming Conventions

### Files and Directories
- Use kebab-case for file and directory names
- Component files should match their component name (e.g., `a-button.vue`)
- Test files should have the `.test.js` suffix

### Components
- Use PascalCase for component names in JavaScript/TypeScript
- Use PascalCase for component names in templates
- Prefix components according to their type:
  - `A` for atoms (e.g., `AButton`)
  - `M` for molecules (e.g., `MCardHeader`)
  - `O` for organisms (e.g., `OInvoiceNotesTab`)
  - `T` for templates (e.g., `TInvoice`)
  - `P` for pages (e.g., `PInvoiceDetails`)

### CSS Classes
- Use kebab-case for CSS class names
- Component root elements should have a class matching the component name
- Use BEM-like naming for nested elements

### Data Attributes
- Use `at-` prefix for data attributes used in testing
- Component root elements should have a data attribute matching the component name

## Vue Component Guidelines

### Component Structure
- Use Vue 3 with the Composition API
- Use the `defineComponent` function for type inference
- Use the `setup()` function for component logic
- Use composables (use*) for reusable logic
- Document props with JSDoc comments

### State Management
- Use `ref` for primitive values
- Use `reactive` for objects
- Use `computed` for derived state
- Use `AsyncSource` for API calls

### Event Handling
- Use the event bus for cross-component communication
- Use emits for parent-child communication
- Use descriptive event names

## Component Best Practices

### Component Design
- Keep components focused on a single responsibility
- Make components reusable and composable
- Use props for component configuration
- Use slots for content projection
- Use provide/inject for deep component hierarchies

### Performance Optimization
- Use computed properties for derived state
- Avoid unnecessary re-renders
- Use v-once for static content
- Use v-memo for optimizing v-for loops
- Lazy load components when appropriate

### Accessibility
- Use semantic HTML elements
- Provide ARIA attributes when necessary
- Ensure keyboard navigation works
- Test with screen readers

### Internationalization
- Use translation keys for all user-facing text
- Use the translation service for localization
- Support right-to-left languages when necessary

### Error Handling
- Provide meaningful error messages
- Use error boundaries for component errors
- Handle edge cases gracefully