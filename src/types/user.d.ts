export enum UserCategory {
  VETERAN = 'VETERAN',
  FAMILY = 'FAMILY',
  VOLUNTEER = 'VOLUNTEER',
  MEDICAL = 'MEDICAL',
  OTHER = 'OTHER'
}

export interface UserProfile {
  // Step 1 - Base Identity
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  patronymic?: string;
  password: string;
  password_confirmation: string;

  // Step 2 - Demographics
  date_of_birth: string;
  region: string;
  city: string;
  category: UserCategory;
  bio?: string;

  // Step 3 - Emergency Info
  address: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;

  // Step 4 - Notifications
  notifications_enabled: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
}

export interface RegistrationStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  isCompleted: boolean;
} 