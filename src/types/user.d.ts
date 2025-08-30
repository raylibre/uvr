export enum UserCategory {
  FAMILY_WITHOUT_FATHER = 'family_without_father',
  VOLUNTEER = 'volunteer',
  ACTIVE_MILITARY = 'active_military',
  ACTIVE_VETERAN = 'active_veteran',
  RETIRED_VETERAN = 'retired_veteran',
  COMBAT_DISABLED = 'combat_disabled',
  HOMELESS_FAMILY = 'homeless_family'
}

export enum MaritalCategory {
  MARRIED = 'married',
  SINGLE = 'single',
  DIVORCED = 'divorced',
  DIVORCED_PAYING_ALIMONY = 'divorced_alimony'
}

export enum ActivityType {
  SOCIAL = 'social',
  ECONOMIC = 'economic',
  VOLUNTEER = 'volunteer'
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
  gender: 'male' | 'female';
  category: UserCategory;
  activity_type: ActivityType;
  marital_status: MaritalCategory;
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
