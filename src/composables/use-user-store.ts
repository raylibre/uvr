import { ref, computed, reactive } from 'vue';
import AsyncSource from 'async-source';
import { loginUser, registerUser, logoutUser } from '~/services/api/auth-api-service';
import type { User, LoginCredentials } from '~/interfaces/auth';
import { useEventBus } from './use-event-bus';
import { EVENTS } from '~/constants/event-bus-constants';
import { handleApiError, notifySuccess } from '~/services/notification-service';

// Global state - shared across all instances of the composable
const user = ref<User | null>(null);
const isAuthenticated = ref(false);

export function useUserStore() {
  const { BUS } = useEventBus();

  // Create AsyncSource instances for auth operations
  const loginSource = reactive(new AsyncSource(loginUser, handleApiError));
  const registerSource = reactive(new AsyncSource(registerUser, handleApiError));
  const logoutSource = reactive(new AsyncSource(logoutUser, handleApiError));

  // Computed properties
  const userFullName = computed(() => {
    if (!user.value) return '';
    const { first_name, last_name, patronymic } = user.value;
    return [first_name, last_name, patronymic].filter(Boolean).join(' ');
  });

  const userDisplayName = computed(() => {
    if (!user.value) return '';
    const { first_name, last_name } = user.value;
    return `${first_name} ${last_name}`.trim();
  });

  const userInitials = computed(() => {
    if (!user.value) return '';
    const { first_name, last_name } = user.value;
    return `${first_name.charAt(0)}${last_name.charAt(0)}`.toUpperCase();
  });

  const isVerified = computed(() => {
    return user.value?.verification_status === 'verified';
  });

  // Loading states
  const isLoginLoading = computed(() => loginSource.isLoading);
  const isRegisterLoading = computed(() => registerSource.isLoading);
  const isLogoutLoading = computed(() => logoutSource.isLoading);
  const isLoading = computed(() => isLoginLoading.value || isRegisterLoading.value || isLogoutLoading.value);

  // Authentication methods
  const login = (credentials: LoginCredentials) => {
    loginSource.push(handleLoginSuccess, credentials);
  };

  const register = (credentials: { email: string; phone: string; password: string }) => {
    registerSource.push(handleRegisterSuccess, credentials);
  };

  const logout = () => {
    logoutSource.push(handleLogoutSuccess);
  };

  // Success handlers
  function handleLoginSuccess(response: any) {
    user.value = response.user;
    isAuthenticated.value = true;
    
    // Store token and user data
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    BUS.emit(EVENTS.SUCCESS_LOGIN, { user: response.user });
    notifySuccess('Successfully logged in!');
  }

  function handleRegisterSuccess(response: any) {
    user.value = response.user;
    isAuthenticated.value = true;
    
    // Store token and user data
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    BUS.emit(EVENTS.SUCCESS_REGISTER, { user: response.user });
    notifySuccess('Registration successful!');
  }

  function handleLogoutSuccess() {
    user.value = null;
    isAuthenticated.value = false;
    
    // Clear stored data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    BUS.emit(EVENTS.LOGOUT as any);
    notifySuccess('Successfully logged out!');
  }

  // Initialize from stored data
  const initialize = () => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      try {
        user.value = JSON.parse(storedUser);
        isAuthenticated.value = true;
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        // Clear corrupted data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
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
    user: computed(() => user.value),
    isAuthenticated: computed(() => isAuthenticated.value),
    isLoading,
    isLoginLoading,
    isRegisterLoading,
    isLogoutLoading,
    
    // Computed properties
    userFullName,
    userDisplayName,
    userInitials,
    isVerified,
    
    // Methods
    login,
    register,
    logout,
    initialize,
    
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