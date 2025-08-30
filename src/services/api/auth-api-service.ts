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
 * Register user with multipart/form-data including documents
 * Expects payload fields similar to the multi-step form and a documents array
 */
export async function registerUserMultipart(payload: Record<string, any>): Promise<LoginResponse> {
  const formData = new FormData();

  // Clone and extract documents
  const { documents = [], ...rest } = payload || {};

  // Build documents metadata and append files
  const documents_metadata: Array<{ type: string; category: string; filename: string; index: number }> = [];
  let fileIndex = 0;
  const userCategory = rest.category;

  (documents as Array<{ type: string; files: File[] }>).forEach((doc) => {
    (doc.files || []).forEach((file) => {
      documents_metadata.push({
        type: doc.type,
        category: userCategory,
        filename: file.name,
        index: fileIndex
      });
      formData.append(`document_${fileIndex}`, file);
      fileIndex += 1;
    });
  });

  // Normalize and map fields to match server expectations (see http-requests/auth/auth-register.http)
  const normalizeOptional = (v: any) => (typeof v === 'string' && v.trim() === '' ? null : v);

  const {
    has_minor_children,
    minor_children_count,
    patronymic,
    emergency_contact_name,
    emergency_contact_phone,
    terms, // not required by backend
    ...restFields
  } = rest;

  const have_minor_children = Boolean(has_minor_children);
  const minor_children_number = have_minor_children ? Number(minor_children_count || 0) : 0;

  const dataPart = {
    ...restFields,
    patronymic: normalizeOptional(patronymic),
    emergency_contact_name: normalizeOptional(emergency_contact_name),
    emergency_contact_phone: normalizeOptional(emergency_contact_phone),
    have_minor_children,
    minor_children_number,
    documents_metadata
  };

  // Append JSON payload as a plain string field so backend reads it as form-data field, not a file
  formData.append('data', JSON.stringify(dataPart));

  // Ensure multipart header overrides the JSON default on the axios instance
  const response: AxiosResponse<LoginResponse> = await apiClient.post(
    FUNCTIONS_V1_AUTH_REGISTRATION,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
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
