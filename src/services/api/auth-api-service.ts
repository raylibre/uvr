import type { LoginResponse, LoginCredentials, LoginApiResponse } from '~/interfaces/auth';
import { AxiosResponse } from 'axios';
import apiClient from './api-client';
import type { RegistrationPayload, ApiResponse } from '~/types/auth';
import { FUNCTIONS_V1_AUTH_REGISTRATION, FUNCTIONS_V1_AUTH_LOGIN } from '~/constants/url-constants.ts';

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  // // MOCK IMPLEMENTATION FOR TESTING - Replace with real API call later
  // console.log('Mock login with credentials:', credentials);
  //
  // // Simulate API delay
  // await new Promise(resolve => setTimeout(resolve, 1000));
  //
  // // Mock validation - accept any credentials for testing
  // const mockApiResponse: LoginApiResponse = {
  //   success: true,
  //   data: {
  //     success: true
  //     // data: {
  //     //   user: {
  //     //     id: "0b7a6b03-918b-4f01-9e98-1247d404016b",
  //     //     email: credentials.identifier.includes('@') ? credentials.identifier : "test@example.com",
  //     //     first_name: "Користувач",
  //     //     last_name: "Тестовий",
  //     //     patronymic: null,
  //     //     phone: credentials.identifier.includes('@') ? "380501234567" : credentials.identifier,
  //     //     date_of_birth: null,
  //     //     category: "volunteer",
  //     //     region: null,
  //     //     city: null,
  //     //     verification_status: "pending",
  //     //     avatar_url: null,
  //     //     last_login_at: new Date().toISOString(),
  //     //     created_at: "2025-06-09T11:32:44.930173Z",
  //     //     bio: null,
  //     //     address: null,
  //     //     emergency_contact_name: null,
  //     //     emergency_contact_phone: null,
  //     //     notifications_enabled: true,
  //     //     email_notifications: true,
  //     //     sms_notifications: false,
  //     //     is_active: true,
  //     //     available_projects_count: 0,
  //     //     unread_notifications_count: 3
  //     //   },
  //     //   session: {
  //     //     access_token: "mock-jwt-token-" + Date.now(),
  //     //     token_type: "bearer",
  //     //     expires_in: 3600,
  //     //     expires_at: Math.floor(Date.now() / 1000) + 3600,
  //     //     refresh_token: "mock-refresh-token",
  //     //     user: {
  //     //       id: "0b7a6b03-918b-4f01-9e98-1247d404016b",
  //     //       aud: "authenticated",
  //     //       role: "authenticated",
  //     //       email: credentials.identifier.includes('@') ? credentials.identifier : "test@example.com",
  //     //       email_confirmed_at: "2025-06-09T11:32:44.945319Z",
  //     //       phone: credentials.identifier.includes('@') ? "380501234567" : credentials.identifier,
  //     //       phone_confirmed_at: "2025-06-09T11:32:44.950074Z",
  //     //       confirmed_at: "2025-06-09T11:32:44.945319Z",
  //     //       recovery_sent_at: "2025-06-09T11:32:45.252968Z",
  //     //       last_sign_in_at: new Date().toISOString(),
  //     //       app_metadata: {
  //     //         provider: "email",
  //     //         providers: ["email", "phone"]
  //     //       },
  //     //       user_metadata: {
  //     //         email_verified: true
  //     //       },
  //     //       identities: [],
  //     //       created_at: "2025-06-09T11:32:44.930173Z",
  //     //       updated_at: new Date().toISOString(),
  //     //       is_anonymous: false
  //     //     }
  //     //   },
  //     //   message: "Ласкаво просимо!"
  //     // }
  //   }
  // };

  // const { user, session } = mockApiResponse.data.data;
  //
  // return {
  //   user,
  //   token: session.access_token
  // };

  // REAL API CALL (commented out for testing)
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

export async function register(credentials: { email: string; phone: string; password: string }): Promise<LoginResponse> {
  return await apiClient.post(
    FUNCTIONS_V1_AUTH_REGISTRATION,
    credentials
  );
}

// Mock implementation for registration
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

  // Mock successful registration - need to update this to match new User interface
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

export class AuthApiService {
  private static readonly BASE_PATH = '/auth';

  /**
   * Register a new user
   * @param payload - Registration data
   */
  static async register(payload: RegistrationPayload): Promise<ApiResponse> {
    const response: AxiosResponse<ApiResponse> = await apiClient.post(
      `${this.BASE_PATH}/register`,
      payload
    );
    return response.data;
  }

  /**
   * Check if email is available
   * @param email - Email to check
   */
  static async checkEmailAvailability(email: string): Promise<boolean> {
    const response: AxiosResponse<{ available: boolean }> = await apiClient.get(
      `${this.BASE_PATH}/check-email`,
      { params: { email } }
    );
    return response.data.available;
  }
} 