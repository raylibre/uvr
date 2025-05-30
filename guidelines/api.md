# API Integration Guidelines

## Service Organization

### Service Structure
- Services are organized by functionality
- Use the `-service.js` suffix for service files
- API services should be in the `services/api` directory
- Group related API services in subdirectories (e.g., `services/api/invoice/`)
- Export individual functions rather than service objects

### Service Naming
- Use descriptive names for service files and functions
- Follow a consistent naming pattern for similar operations
- Use verb-noun format for function names (e.g., `getInvoiceData`, `updateCustomerInfo`)

## API Interactions

### AsyncSource Usage
- Use `AsyncSource` for API calls to handle loading states and errors consistently
- Import AsyncSource from the 'async-source' package
- Create AsyncSource instances with service methods and error handlers
- Use reactive AsyncSource instances for reactive state management

```javascript
import AsyncSource from 'async-source';
import { notifyError } from '~/services/notification-service';
import { getInvoiceData } from '~/services/api/invoice-api-service';

// Create a reactive AsyncSource instance
const invoiceDataSource = reactive(new AsyncSource(getInvoiceData, notifyError));

// Access loading state
const isLoading = computed(() => invoiceDataSource.isLoading);

// Make API call
function loadInvoiceData(invoiceId) {
  invoiceDataSource.push(handleSuccess, { invoiceId });
}

// Handle successful response
function handleSuccess(response) {
  // Process response data
}
```

### Shared AsyncSource
- Use the async-source-service for shared AsyncSource instances
- Use `getSharedAsyncSource` to create or retrieve a shared AsyncSource
- Use `removeSharedAsyncSource` to clean up shared AsyncSource instances

```javascript
import { getSharedAsyncSource, removeSharedAsyncSource } from '~/services/async-source-service';
import { getInvoiceData } from '~/services/api/invoice-api-service';
import { notifyError } from '~/services/notification-service';

// Get or create a shared AsyncSource
const invoiceDataSource = getSharedAsyncSource(
  'invoiceData',
  null,
  getInvoiceData,
  notifyError
);

// Clean up when component is unmounted
onBeforeUnmount(() => {
  removeSharedAsyncSource('invoiceData', getInvoiceData);
});
```

## API Service Implementation

### HTTP Service
- Use the central httpService for making HTTP requests
- Use appropriate HTTP methods (GET, POST, PUT, DELETE)
- Handle request and response transformations consistently
- Set proper headers and content types

```javascript
import { httpService } from '~/services/api-service';
import { API_INVOICES } from '~/constants/url-constants';

function getInvoiceData(invoiceId) {
  return httpService.get(`${API_INVOICES}/${invoiceId}`);
}

function updateInvoiceData(invoiceId, data) {
  return httpService.put(`${API_INVOICES}/${invoiceId}`, data);
}

function createInvoice(data) {
  return httpService.post(API_INVOICES, data);
}

function deleteInvoice(invoiceId) {
  return httpService.delete(`${API_INVOICES}/${invoiceId}`);
}
```

### URL Constants
- Define API endpoints as constants in url-constants.js
- Use these constants in API services
- Follow a consistent naming pattern for URL constants
- Group related endpoints together

```javascript
// In constants/url-constants.js
export const API = '/api';
export const INVOICES = '/invoices';
export const CUSTOMERS = '/customers';
export const API_INVOICES = API + INVOICES;
export const API_CUSTOMERS_INVOICES = API + CUSTOMERS + INVOICES;
```

## Error Handling

### Error Handling Patterns
- Use the notification service for displaying errors to users
- Handle specific error cases with custom logic
- Provide fallback behavior for error states
- Log errors for debugging

```javascript
import { notifyError } from '~/services/notification-service';

function customErrorHandler(error) {
  if (error.response && error.response.status === 404) {
    // Handle not found error
    notifyError('Resource not found');
  } else if (error.response && error.response.status === 403) {
    // Handle forbidden error
    notifyError('You do not have permission to access this resource');
  } else {
    // Handle generic error
    notifyError('An error occurred. Please try again later.');
  }
  
  // Log error for debugging
  console.error('API Error:', error);
}
```

### Loading States
- Use AsyncSource's isLoading property to track loading states
- Show loading indicators during API calls
- Disable UI elements during loading
- Provide feedback for long-running operations

```vue
<template>
  <div v-loading="isLoading">
    <!-- Content here -->
  </div>
</template>

<script>
export default {
  setup() {
    const dataSource = reactive(new AsyncSource(fetchData, notifyError));
    const isLoading = computed(() => dataSource.isLoading);
    
    // ...
    
    return {
      isLoading
    };
  }
}
</script>
```

## Response Handling Patterns

### Data Transformation
- Transform API responses to match component data structures
- Use computed properties for derived data
- Handle null or undefined values gracefully
- Format dates, numbers, and other values consistently

### Caching
- Cache frequently used data when appropriate
- Implement cache invalidation strategies
- Use shared AsyncSource instances for shared data
- Consider using Vuex or Pinia for global state management

### Pagination and Filtering
- Implement consistent patterns for paginated data
- Handle filtering and sorting on the server when possible
- Maintain filter and pagination state
- Provide clear loading indicators during data fetching