import { ref, computed, reactive, readonly } from 'vue';
import AsyncSource from 'async-source';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  getCurrentUser, 
  registerUserMultipart
} from '~/services/api/auth-api-service';
import type { 
  User, 
  LoginCredentials, 
  AuthMeResponse,
  UserStatistics,
  UserVerificationStatus 
} from '~/interfaces/auth';
import { useEventBus } from './use-event-bus';
import { EVENTS } from '~/constants/event-bus-constants';
import { handleApiError, notifySuccess } from '~/services/notification-service';
import { T_KEYS } from '~/constants/translation-keys';

// Global state - shared across all instances of the composable
const user = ref<User | null>(null);
const userStatistics = ref<UserStatistics | null>(null);
const verificationStatuses = ref<{
  primaryCategory: UserVerificationStatus;
  additionalCategories: UserVerificationStatus[];
} | null>(null);
const pendingApplications = ref<any[]>([]);
const isAuthenticated = ref(false);
const isInitialized = ref(false);

export function useUserStore() {
  const { BUS } = useEventBus();

  // Create AsyncSource instances for auth operations
  const loginSource = reactive(new AsyncSource(loginUser, handleApiError));

  // Emit FAILED_REGISTER on server errors in addition to notifications
  function handleRegisterError(error: any) {
    handleApiError(error);
    BUS.emit(EVENTS.FAILED_REGISTER as any, { error: error?.message || 'Registration failed' });
  }

  const registerSource = reactive(new AsyncSource(registerUser, handleRegisterError));
  const registerFullSource = reactive(new AsyncSource(registerUserMultipart, handleRegisterError));
  const logoutSource = reactive(new AsyncSource(logoutUser, handleApiError));
  const currentUserSource = reactive(new AsyncSource(getCurrentUser, handleAuthMeError));

  // Computed properties
  const userFullName = computed(() => {
    if (!user.value) return '';
    const { first_name, last_name, patronymic } = user.value;
    // UA order: Last First Patronymic
    return [last_name, first_name, patronymic].filter(Boolean).join(' ');
  });

  const userDisplayName = computed(() => {
    if (!user.value) return '';
    const { first_name, last_name, patronymic } = user.value;
    // Prefer the same UA order even for compact display
    return [last_name, first_name, patronymic].filter(Boolean).join(' ');
  });

  const userInitials = computed(() => {
    if (!user.value) return '';
    const { first_name, last_name } = user.value;
    return `${first_name.charAt(0)}${last_name.charAt(0)}`.toUpperCase();
  });

  const isVerified = computed(() => {
    return user.value?.verification_status === 'verified';
  });

  const availableProjectsCount = computed(() => {
    return userStatistics.value?.available_projects || 0;
  });

  const unreadNotificationsCount = computed(() => {
    return userStatistics.value?.unread_notifications || 0;
  });

  const pendingApplicationsCount = computed(() => {
    return userStatistics.value?.pending_applications || 0;
  });

  // Loading states
  const isLoginLoading = computed(() => loginSource.isLoading);
  const isRegisterLoading = computed(() => registerSource.isLoading || registerFullSource.isLoading);
  const isLogoutLoading = computed(() => logoutSource.isLoading);
  const isCurrentUserLoading = computed(() => currentUserSource.isLoading);
  const isLoading = computed(() => 
    isLoginLoading.value || 
    isRegisterLoading.value || 
    isLogoutLoading.value || 
    isCurrentUserLoading.value
  );

  // Authentication methods
  const login = (credentials: LoginCredentials) => {
    loginSource.push(handleLoginSuccess, credentials);
  };

  const register = (payload: any) => {
    // Define a unified post-success handler that triggers login + auth-me
    const afterRegister = (response: any) => {
      // Emit registration success for UI feedback, but do NOT set token yet
      handleRegisterSuccess(response);

      // Attempt automatic login using freshly registered credentials
      try {
        const identifier = payload?.email || payload?.phone;
        const password = payload?.password;
        if (identifier && password) {
          login({ identifier, password });
        } else {
          console.warn('Cannot auto-login after register: missing identifier or password');
        }
      } catch (e) {
        console.warn('Auto-login after register failed to start:', e);
      }
    };

    // If minimal payload (email/phone/password only), use simple register
    if (
      payload &&
      typeof payload === 'object' &&
      Object.keys(payload).every((k) => ['email', 'phone', 'password'].includes(k))
    ) {
      return registerSource.push(afterRegister, payload);
    } else {
      // Full registration with documents (multipart)
      return registerFullSource.push(afterRegister, payload);
    }
  };

  const logout = () => {
    logoutSource.push(handleLogoutSuccess);
  };

  // Initialize user data from token
  const initialize = async () => {
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
      // Try to get current user data from API
      currentUserSource.push(handleCurrentUserSuccess);
    } else {
      // No token, user is not authenticated
      isInitialized.value = true;
    }
  };

  // Success handlers
  function handleLoginSuccess(response: any) {
    user.value = response.user;
    isAuthenticated.value = true;
    
    // Store token and user data
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    BUS.emit(EVENTS.SUCCESS_LOGIN, { user: response.user });
    notifySuccess(T_KEYS.AUTH.LOGIN.SUCCESS_TOAST);

    // Get fresh user data after login
    currentUserSource.push(handleCurrentUserSuccess);
  }

  function handleRegisterSuccess(response: any) {
    // Do not set token here; registration response may not include it.
    // Emit success for UI and let auto-login handle auth + auth-me.
    BUS.emit(EVENTS.SUCCESS_REGISTER, { user: response?.user });
    notifySuccess(T_KEYS.AUTH.REGISTER.SUCCESS_TOAST);
  }

  function handleLogoutSuccess() {
    user.value = null;
    userStatistics.value = null;
    verificationStatuses.value = null;
    pendingApplications.value = [];
    isAuthenticated.value = false;
    
    // Clear stored data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    BUS.emit(EVENTS.LOGOUT as any);
    notifySuccess(T_KEYS.AUTH.LOGIN.LOGOUT_SUCCESS_TOAST);
  }

  function handleCurrentUserSuccess(response: AuthMeResponse) {
    user.value = response.profile;
    userStatistics.value = response.statistics;
    verificationStatuses.value = response.verificationStatuses;
    pendingApplications.value = response.pendingApplications;
    isAuthenticated.value = true;
    isInitialized.value = true;

    // Update stored user data
    localStorage.setItem('user', JSON.stringify(response.profile));
    
    BUS.emit(EVENTS.USER_DATA_UPDATED, { user: response.profile });
  }

  // Special error handler for auth-me that doesn't show notifications
  // since this runs on every page load
  function handleAuthMeError(error: any) {
    console.log('Auth-me failed, user not authenticated:', error.message);
    
    // Clear invalid token and user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    user.value = null;
    userStatistics.value = null;
    verificationStatuses.value = null;
    pendingApplications.value = [];
    isAuthenticated.value = false;
    isInitialized.value = true;

    // Only show error if it's not a 401 (unauthorized)
    if (error.response?.status !== 401) {
      handleApiError(error);
    }
  }

  // Refresh user data manually
  const refreshUserData = () => {
    if (isAuthenticated.value) {
      currentUserSource.push(handleCurrentUserSuccess);
    }
  };

  // Future user-related API methods can be added here
  const updateProfile = async (profileData: Partial<User>) => {
    // TODO: Implement profile update API call with AsyncSource
    console.log('Profile update not implemented yet:', profileData);
  };

  const updatePassword = async (_currentPassword: string, _newPassword: string) => {
    // TODO: Implement password update API call with AsyncSource
    console.log('Password update not implemented yet');
  };

  const updateNotificationSettings = async (settings: {
    notifications_enabled?: boolean;
    email_notifications?: boolean;
    sms_notifications?: boolean;
  }) => {
    // TODO: Implement notification settings update API call with AsyncSource
    console.log('Notification settings update not implemented yet:', settings);
  };

  const getUserProjects = async () => {
    // TODO: Implement get user projects API call with AsyncSource
    console.log('Get user projects not implemented yet');
  };

  const getUserNotifications = async () => {
    // TODO: Implement get user notifications API call with AsyncSource
    console.log('Get user notifications not implemented yet');
  };

  // Watch for storage changes (for cross-tab synchronization)
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === 'token' && !e.newValue) {
        // Token was removed in another tab
        user.value = null;
        isAuthenticated.value = false;
      } else if (e.key === 'user' && e.newValue) {
        // User data was updated in another tab
        try {
          user.value = JSON.parse(e.newValue);
        } catch (error) {
          console.error('Failed to sync user data from storage:', error);
        }
      }
    });
  }

  return {
    // State
    user: readonly(user),
    userStatistics: readonly(userStatistics),
    verificationStatuses: readonly(verificationStatuses),
    pendingApplications: readonly(pendingApplications),
    isAuthenticated: readonly(isAuthenticated),
    isInitialized: readonly(isInitialized),
    
    // Computed properties
    userFullName,
    userDisplayName,
    userInitials,
    isVerified,
    availableProjectsCount,
    unreadNotificationsCount,
    pendingApplicationsCount,
    
    // Loading states
    isLoading,
    isLoginLoading,
    isRegisterLoading,
    isLogoutLoading,
    isCurrentUserLoading,
    
    // Methods
    login,
    register,
    logout,
    initialize,
    refreshUserData,
    
    // Future methods
    updateProfile,
    updatePassword,
    updateNotificationSettings,
    getUserProjects,
    getUserNotifications,
    
    // Getters (for backward compatibility)
    getUser: () => user.value,
    getIsAuthenticated: () => isAuthenticated.value
  };
} 
