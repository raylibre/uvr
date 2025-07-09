export enum UserCategory {
  COMBAT_PARTICIPANT = 'COMBAT_PARTICIPANT',
  FAMILY_OF_DECEASED = 'FAMILY_OF_DECEASED',
  FAMILY_OF_MISSING = 'FAMILY_OF_MISSING',
  PERSON_WITH_DISABILITY = 'PERSON_WITH_DISABILITY'
}

export enum MaritalCategory {
  MARRIED = 'MARRIED',
  SINGLE = 'SINGLE',
  DIVORCED = 'DIVORCED',
  DIVORCED_PAYING_ALIMONY = 'DIVORCED_PAYING_ALIMONY'
}

export enum ActivityType {
  SOCIAL = 'SOCIAL',
  ECONOMIC = 'ECONOMIC',
  VOLUNTEER = 'VOLUNTEER'
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
  activity_type: ActivityType;
  bio?: string;

  // Step 3 - Emergency Info
  address: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  has_minor_children: boolean;
  minor_children_count?: number;

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
