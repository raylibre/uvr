export interface User {
  id: number;
  email: string;
  phone?: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
} 