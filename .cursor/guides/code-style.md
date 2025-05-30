# Code Style Guidelines

## Naming Conventions

### Files and Directories
- Use kebab-case for file and directory names
- Component files should match their component name (e.g., `a-button.vue`)
- Test files should have the `.test.js` suffix
- Service files should have the `-service.js` suffix
- Constant files should have the `-constants.js` suffix

### JavaScript/TypeScript
- Use camelCase for variable and function names
- Use PascalCase for class and component names
- Use UPPER_SNAKE_CASE for constants
- Use descriptive names that convey meaning and purpose
- Avoid abbreviations unless they are well-known

### CSS Classes
- Use kebab-case for CSS class names
- Component root elements should have a class matching the component name
- Use BEM-like naming for nested elements
- Prefix utility classes with their purpose (e.g., `u-margin-top-10`)

### Data Attributes
- Use `at-` prefix for data attributes used in testing
- Component root elements should have a data attribute matching the component name

## Code Formatting

### Indentation and Spacing
- Use 2 spaces for indentation
- Use spaces around operators
- Use spaces after commas
- No trailing whitespace
- End files with a newline

### Line Length
- Keep lines under 100 characters
- Break long lines at logical points
- Indent continuation lines appropriately

### Brackets and Braces
- Opening braces on the same line as the statement
- Closing braces on their own line
- Always use braces for control statements, even for single-line blocks

### Quotes
- Use single quotes for JavaScript strings
- Use double quotes for HTML attributes
- Use backticks for template literals

### Semicolons
- Always use semicolons to terminate statements
- Avoid relying on automatic semicolon insertion

## Code Organization

### Import Order
- Group imports into three main sections with blank lines between them:
  1. First section: imports from libraries (vue, external libraries)
  2. Second section: component imports
  3. Last section: functions or constants
     - This section is divided into 2 subsections (without an empty line between them):
       a. First subsection: functions/classes/uses
       b. Second subsection: constants
- Avoid using `import * as` syntax, especially in tests. Instead, import only the specific functions or constants that are needed:
  ```javascript
  // Bad example
  import * as invoiceApiService from '~/services/api/invoice/invoice-api-service';
  import * as dateTimeService from '~/services/spa-date-time-service';

  // Good example
  import {
      getPayments,
      generateUrlWithId
  } from '~/services/api/invoice/invoice-api-service';
  import { toTimeZoneDateString } from '~/services/spa-date-time-service';
  ```
- Sort all imports within each section by the length of the longest line in the import statement:
  - For single-line imports, use the entire line length
  - For multi-line imports, find the longest line in the statement, which could be either:
    - The closing line with the path: `} from '~/services/api/invoice/invoice-api-service';`
    - A line with a very long imported item: `    theLongestFunctionNameInTheWholeWorldEverIsHere`
  - Sort from shortest to longest based on this longest line
- When importing multiple items from the same source, place each item on a new line and sort them from shortest to longest:
  ```javascript
  // Bad example
  import { getPayments, generateUrlWithId } from '~/services/api/invoice/invoice-api-service';

  // Good example
  import {
      watch,
      computed,
      reactive,
      defineComponent
  } from 'vue';
  ```

- Examples of determining the longest line for sorting:
  ```javascript
  // Example 1: The longest line is the closing line with the path
  import {
      getPayments,
      generateUrlWithId
  } from '~/services/api/invoice/invoice-api-service';
  // Longest line: "} from '~/services/api/invoice/invoice-api-service';" (56 characters)

  // Example 2: The longest line is an imported item
  import {
      getPayments,
      theLongestFunctionNameInTheWholeWorldEverIsHere
  } from '~/services/api/some-service';
  // Longest line: "    theLongestFunctionNameInTheWholeWorldEverIsHere" (52 characters)
  ```
- Example of proper import organization (from OCashAppOpenPayments component):
  ```javascript
  // First section: imports from libraries
  import {
      watch,
      markRaw,
      computed,
      reactive,
      defineComponent
  } from 'vue';
  import AsyncSource from 'async-source';

  // Second section: component imports
  import MHeaderCell from '~/components/molecules/m-header-cell';
  import MActionsRowBar from '~/components/molecules/m-actions-row-bar';
  import MGridNoRecords from '~/components/molecules/m-grid-no-records';
  import OGridWrapper from '~/components/unique-organisms/o-grid-wrapper';
  import OLayoutCardExpand from '~/components/organisms/o-layout-card-expand';
  import AGridNoRecordsPortal from '~/components/atoms/a-grid-no-records-portal';
  import OCashAppOpenPaymentsPanel from '~/components/unique-organisms/o-cash-app-open-payments-panel';

  // Last section: functions and constants
  // First subsection: functions/classes/uses
  import useBus from '~/use/use-bus';
  import useTranslation from '~/use/use-translation';
  import { notifyError } from '~/services/notification-service';
  import useCashAppColumns from '~/use/cash-app/use-cash-app-columns';
  import useCashAppFilters from '~/use/cash-app/use-cash-app-filters';
  import usePaymentsUserData from '~/use/cash-app/use-payments-user-data';
  import useOpenedManagePopups from '~/use/cash-app/use-opened-manage-popups';
  import { useGridWrapper } from '~/components/unique-organisms/o-grid-wrapper/use/use-grid-wrapper';
  import { getSummaryFilterValue } from '~/components/unique-organisms/o-grid-wrapper/services/grid-utils';
  // Second subsection: constants
  import {
      COLUMN_NAMES,
      MANDATORY_COLUMNS,
      PAYMENT_ROW_ACTIONS,
      OPEN_PAYMENTS_GRID_ID,
      MAPPING_COLUMNS_OPEN_PAYMENTS,
      MAPPING_ACTIONS_OPEN_PAYMENT_ROW
  } from '~/constants/cash-app/payments-grids-columns-constants';
  import { FILTER_OPERATOR } from '~/constants/filter-constants';
  import { ALLOCATION_STATUSES_CONFIG } from '~/constants/cash-app/allocation-status-constants';
  import { FILTER_LOGIC_TYPES } from '~/components/unique-organisms/o-grid-wrapper/services/grid-constants';
  ```

### Component Structure
- Follow a consistent order for component options:
  1. name
  2. components
  3. props
  4. data
  5. computed
  6. watch
  7. lifecycle methods
  8. methods
- For components using the Composition API with setup function:
  - Create an `onInit` function for operations like API calls, if statements, function calls, etc.
  - Call the `onInit` function from the setup function
  - Keep `setBusListener` function calls in the root setup function, not in the `onInit` function
  - Example:

  ```javascript
  export default defineComponent({
      name: 'ComponentName',
      props: {
          id: {
              type: Number,
              required: true
          }
      },
      setup(props) {
          // Reactive state, computed properties, etc.
          const data = reactive({});
          const isLoading = computed(() => {});

          // Define functions
          function someFunction() {
              // Function logic
          }

          function onInit() {
              // API calls
              dataSource.update(props.id);

              // Other initialization logic
              someFunction();
          }

          // Call onInit
          onInit();

          // setBusListener calls remain in root setup
          setBusListener(EVENTS.SOME_EVENT, someHandler);

          return {
              // Return values
          };
      }
  });
  ```

### Function Organization
- Keep functions small and focused on a single task
- Group related functions together
- Place helper functions after the main functions they support
- Use arrow functions for callbacks and anonymous functions

## Code Quality

### ESLint and Stylelint
- Follow ESLint and Stylelint rules
- Run linters before committing code
- Fix all linting errors and warnings
- Use consistent code style across the project

### TypeScript
- Use TypeScript for type safety when possible
- Define interfaces for complex data structures
- Use type annotations for function parameters and return values
- Avoid using `any` type unless absolutely necessary

### Comments
- Write comments that explain why, not what
- Use JSDoc comments for functions and components
- Keep comments up to date with code changes
- Remove commented-out code

### Best Practices
- Write clean, readable, and maintainable code
- Follow the DRY (Don't Repeat Yourself) principle
- Use meaningful variable and function names
- Avoid magic numbers and strings
- Use constants for values that don't change

### Icons
- Always use the ICONS constant from `~/constants/icons-constants.js` for Material Design icons
- Always use the DS_ICONS constant from `~/constants/icons-constants.js` for Design System icons
- If an icon is not defined in the constants, add it to the appropriate constant object
- Example:
  ```javascript
  // Bad - Using string literals for icons
  // In template
  // <AIcon icon="business" />

  // Good - Using constants for icons
  // In script
  import { ICONS } from '~/constants/icons-constants';

  // In setup function
  return {
      // other properties
      ICONS
  };

  // In template
  // <AIcon :icon="ICONS.BUSINESS" />
  ```

## Performance

### Optimization
- Avoid unnecessary re-renders
- Use computed properties for derived state
- Lazy load components when appropriate
- Optimize expensive operations
- Use memoization for expensive calculations

### Memory Management
- Clean up event listeners and subscriptions
- Avoid memory leaks
- Use weak references when appropriate
- Be mindful of closure scope

## Error Handling

### Error Patterns
- Handle errors gracefully
- Provide meaningful error messages
- Use try/catch blocks for error-prone code
- Log errors for debugging
- Use the notification service for user feedback

### Defensive Programming
- Validate input data
- Check for null and undefined values
- Use default values for optional parameters
- Handle edge cases explicitly
