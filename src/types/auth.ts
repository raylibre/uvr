export interface RegistrationPayload {
  email: string;
  phone: string;
  password: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: unknown;
  errors?: Record<string, string[]>;
} 