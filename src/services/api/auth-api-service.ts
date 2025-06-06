import type { LoginResponse, LoginCredentials } from '~/interfaces/auth';
import { AxiosResponse } from 'axios';
import apiClient from './api-client';
import type { RegistrationPayload, ApiResponse } from '~/types/auth';

// This is a mock implementation. Replace with actual API calls.
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Validate credentials (mock implementation)
  if (credentials.password === 'test123') {
    return {
      user: {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'user'
      },
      token: 'mock-jwt-token'
    };
  }

  throw new Error('Invalid credentials');
}

// Mock implementation for registration
export async function register(credentials: { email: string; phone: string; password: string }): Promise<LoginResponse> {
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
      id: Math.floor(Math.random() * 1000) + 1,
      email: credentials.email,
      name: credentials.email.split('@')[0],
      role: 'user'
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