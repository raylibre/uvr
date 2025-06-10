export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  patronymic: string | null;
  phone: string;
  date_of_birth: string | null;
  category: string;
  region: string | null;
  city: string | null;
  verification_status: string;
  avatar_url: string | null;
  last_login_at: string;
  created_at: string;
  bio: string | null;
  address: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  notifications_enabled: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
  is_active: boolean;
  available_projects_count: number;
  unread_notifications_count: number;
}

export interface UserVerificationStatus {
  category: string;
  status: string;
  verified_at: string | null;
}

export interface UserStatistics {
  available_projects: number;
  unread_notifications: number;
  pending_applications: number;
}

export interface PendingApplication {
  id: string;
  project_id: string;
  project_name: string;
  status: string;
  submitted_at: string;
  // Add more fields as needed based on actual structure
}

export interface AuthMeApiResponse {
  success: boolean;
  data: {
    profile: User;
    verification_statuses: {
      primary_category: UserVerificationStatus;
      additional_categories: UserVerificationStatus[];
    };
    statistics: UserStatistics;
    pending_applications: PendingApplication[];
  };
}

export interface AuthMeResponse {
  profile: User;
  verificationStatuses: {
    primaryCategory: UserVerificationStatus;
    additionalCategories: UserVerificationStatus[];
  };
  statistics: UserStatistics;
  pendingApplications: PendingApplication[];
}

export interface UserSession {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string;
    phone: string;
    phone_confirmed_at: string;
    confirmed_at: string;
    recovery_sent_at: string;
    last_sign_in_at: string;
    app_metadata: {
      provider: string;
      providers: string[];
    };
    user_metadata: {
      email_verified: boolean;
    };
    identities: Array<{
      identity_id: string;
      id: string;
      user_id: string;
      identity_data: Record<string, any>;
      provider: string;
      last_sign_in_at: string;
      created_at: string;
      updated_at: string;
      email?: string;
    }>;
    created_at: string;
    updated_at: string;
    is_anonymous: boolean;
  };
}

export interface LoginApiResponse {
  success: boolean;
  data: {
    success: boolean;
    data: {
      user: User;
      session: UserSession;
      message: string;
    };
  };
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
} 