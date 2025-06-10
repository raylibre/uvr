import apiClient from './api-client';
import type { 
  LoginResponse, 
  LoginCredentials, 
  LoginApiResponse,
  AuthMeApiResponse,
  AuthMeResponse 
} from '~/interfaces/auth';
import { AxiosResponse } from 'axios';
import type { RegistrationPayload, ApiResponse } from '~/types/auth';
import { 
  FUNCTIONS_V1_AUTH_REGISTRATION, 
  FUNCTIONS_V1_AUTH_LOGIN,
  FUNCTIONS_V1_AUTH_ME, 
  FUNCTIONS_V1_AUTH_LOGOUT, 
  FUNCTIONS_V1_AUTH_REFRESH 
} from '~/constants/url-constants';

/**
 * Login user with credentials
 * This function is used with AsyncSource for proper loading states and error handling
 */
export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  const response: AxiosResponse<LoginApiResponse> = await apiClient.post(
    FUNCTIONS_V1_AUTH_LOGIN,
    {
      login: credentials.identifier,
      password: credentials.password,
      remember_me: false
    }
  );

  if (!response.data.success || !response.data.data.success) {
    throw new Error('Login failed');
  }

  const { user, session } = response.data.data.data;

  return {
    user,
    token: session.access_token
  };
}

/**
 * Get current user profile and data
 * This function is used with AsyncSource for proper loading states and error handling
 * Requires valid authentication token
 */
export async function getCurrentUser(): Promise<AuthMeResponse> {
  const response: AxiosResponse<AuthMeApiResponse> = await apiClient.get(
    FUNCTIONS_V1_AUTH_ME
  );

  if (!response.data.success) {
    throw new Error('Failed to fetch user data');
  }

  const { profile, verification_statuses, statistics, pending_applications } = response.data.data;

  return {
    profile,
    verificationStatuses: {
      primaryCategory: verification_statuses.primary_category,
      additionalCategories: verification_statuses.additional_categories
    },
    statistics,
    pendingApplications: pending_applications
  };
}

/**
 * Register new user
 * This function is used with AsyncSource for proper loading states and error handling
 */
export async function registerUser(credentials: { email: string; phone: string; password: string }): Promise<LoginResponse> {
  const response = await apiClient.post(
    FUNCTIONS_V1_AUTH_REGISTRATION,
    credentials
  );
  return response.data;
}

/**
 * Logout current user
 */
export async function logoutUser(): Promise<void> {
  await apiClient.post(FUNCTIONS_V1_AUTH_LOGOUT);
}

/**
 * Refresh authentication token
 */
export async function refreshAuthToken(refreshToken: string): Promise<{ access_token: string; refresh_token: string }> {
  const response = await apiClient.post(FUNCTIONS_V1_AUTH_REFRESH, {
    refresh_token: refreshToken
  });
  return response.data;
}

/**
 * Check if email is available for registration
 */
export async function checkEmailAvailability(email: string): Promise<boolean> {
  const response: AxiosResponse<{ available: boolean }> = await apiClient.get(
    '/auth/check-email',
    { params: { email } }
  );
  return response.data.available;
}

/**
 * Register user with full registration payload
 */
export async function registerUserWithPayload(payload: RegistrationPayload): Promise<ApiResponse> {
  const response: AxiosResponse<ApiResponse> = await apiClient.post(
    '/auth/register',
    payload
  );
  return response.data;
}

// Legacy functions for backward compatibility - remove after refactoring all usages
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  return loginUser(credentials);
}

export async function register(credentials: { email: string; phone: string; password: string }): Promise<LoginResponse> {
  return registerUser(credentials);
}
