/**
 * Notification service for displaying errors and success messages to users
 * This service provides a centralized way to handle user notifications
 */

export interface NotificationOptions {
  message: string;
  type?: 'error' | 'success' | 'warning' | 'info';
  duration?: number;
  persistent?: boolean;
}

// Simple notification storage (can be enhanced with more sophisticated UI library)
const notifications = new Map<string, NotificationOptions>();

/**
 * Display an error notification to the user
 * @param message - Error message to display
 * @param options - Additional notification options
 */
export function notifyError(message: string, options?: Partial<NotificationOptions>): void {
  const notification: NotificationOptions = {
    message,
    type: 'error',
    duration: 5000,
    persistent: false,
    ...options
  };

  showNotification(notification);
}

/**
 * Display a success notification to the user
 * @param message - Success message to display
 * @param options - Additional notification options
 */
export function notifySuccess(message: string, options?: Partial<NotificationOptions>): void {
  const notification: NotificationOptions = {
    message,
    type: 'success',
    duration: 3000,
    persistent: false,
    ...options
  };

  showNotification(notification);
}

/**
 * Display a warning notification to the user
 * @param message - Warning message to display
 * @param options - Additional notification options
 */
export function notifyWarning(message: string, options?: Partial<NotificationOptions>): void {
  const notification: NotificationOptions = {
    message,
    type: 'warning',
    duration: 4000,
    persistent: false,
    ...options
  };

  showNotification(notification);
}

/**
 * Display an info notification to the user
 * @param message - Info message to display
 * @param options - Additional notification options
 */
export function notifyInfo(message: string, options?: Partial<NotificationOptions>): void {
  const notification: NotificationOptions = {
    message,
    type: 'info',
    duration: 3000,
    persistent: false,
    ...options
  };

  showNotification(notification);
}

/**
 * Show notification (internal implementation)
 * This can be enhanced to integrate with UI libraries like Element Plus, Quasar, etc.
 */
function showNotification(notification: NotificationOptions): void {
  const id = Date.now().toString();
  notifications.set(id, notification);

  // Console logging for development (replace with actual UI notification)
  const emoji = getNotificationEmoji(notification.type || 'info');
  console.warn(`${emoji} ${notification.type?.toUpperCase()}: ${notification.message}`);

  // Auto-remove non-persistent notifications
  if (!notification.persistent && notification.duration) {
    setTimeout(() => {
      notifications.delete(id);
    }, notification.duration);
  }
}

/**
 * Get emoji for notification type
 */
function getNotificationEmoji(type: string): string {
  switch (type) {
    case 'error':
      return '❌';
    case 'success':
      return '✅';
    case 'warning':
      return '⚠️';
    case 'info':
    default:
      return 'ℹ️';
  }
}

/**
 * Handle API errors with standardized error messaging
 * @param error - The error object from API calls
 */
export function handleApiError(error: any): void {
  if (error.response) {
    // Handle HTTP errors
    const status = error.response.status;
    const data = error.response.data;
    
    switch (status) {
      case 400:
        notifyError(data?.message || 'Bad request. Please check your input.');
        break;
      case 401:
        notifyError('You are not authorized. Please login again.');
        break;
      case 403:
        notifyError('Access denied. You do not have permission to perform this action.');
        break;
      case 404:
        notifyError('The requested resource was not found.');
        break;
      case 422:
        // Validation errors
        if (data?.errors) {
          const errorMessages = Object.values(data.errors).flat();
          notifyError(`Validation error: ${errorMessages.join(', ')}`);
        } else {
          notifyError(data?.message || 'Validation error occurred.');
        }
        break;
      case 429:
        notifyError('Too many requests. Please try again later.');
        break;
      case 500:
        notifyError('Server error occurred. Please try again later.');
        break;
      default:
        notifyError(data?.message || 'An unexpected error occurred.');
    }
  } else if (error.request) {
    // Network error
    notifyError('Network error. Please check your internet connection.');
  } else {
    // Other errors
    notifyError(error.message || 'An unexpected error occurred.');
  }
  
  // Log error for debugging
  console.error('API Error:', error);
}

/**
 * Get all current notifications (for UI components)
 */
export function getCurrentNotifications(): Map<string, NotificationOptions> {
  return new Map(notifications);
}

/**
 * Clear all notifications
 */
export function clearAllNotifications(): void {
  notifications.clear();
} 