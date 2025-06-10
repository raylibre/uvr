import apiClient from './api-client';
import type { LoginResponse, LoginCredentials, LoginApiResponse } from '~/interfaces/auth';
import { AxiosResponse } from 'axios';
import type { RegistrationPayload, ApiResponse } from '~/types/auth';
import { FUNCTIONS_V1_AUTH_REGISTRATION, FUNCTIONS_V1_AUTH_LOGIN, FUNCTIONS_V1_AUTH_LOGOUT, FUNCTIONS_V1_AUTH_REFRESH } from '~/constants/url-constants';

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

// Mock implementation for testing - remove when real API is ready
export async function registerMock(credentials: { email: string; phone: string; password: string }): Promise<LoginResponse> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock validation
  if (credentials.email === 'taken@example.com') {
    throw new Error('Email is already taken');
  }
  if (credentials.phone === '+1234567890') {
    throw new Error('Phone number is already taken');
  }

  // Mock successful registration
  return {
    user: {
      id: Math.floor(Math.random() * 1000).toString(),
      email: credentials.email,
      first_name: credentials.email.split('@')[0],
      last_name: '',
      patronymic: null,
      phone: credentials.phone,
      date_of_birth: null,
      category: 'volunteer',
      region: null,
      city: null,
      verification_status: 'pending',
      avatar_url: null,
      last_login_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      bio: null,
      address: null,
      emergency_contact_name: null,
      emergency_contact_phone: null,
      notifications_enabled: true,
      email_notifications: true,
      sms_notifications: false,
      is_active: true,
      available_projects_count: 0,
      unread_notifications_count: 0
    },
    token: 'mock-jwt-token'
  };
}

// Legacy class-based service - remove after refactoring
export class AuthApiService {
  private static readonly BASE_PATH = '/auth';

  static async register(payload: RegistrationPayload): Promise<ApiResponse> {
    return registerUserWithPayload(payload);
  }

  static async checkEmailAvailability(email: string): Promise<boolean> {
    return checkEmailAvailability(email);
  }
} 