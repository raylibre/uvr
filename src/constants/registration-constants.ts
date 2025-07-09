import {
  UserCategory,
  MaritalCategory,
  ActivityType
} from '~/types/user.d';
import { T_KEYS } from '~/constants/translation-keys';


export const REGISTRATION_STEPS = [
  {
    id: 1,
    title: 'Personal Details',
    description: 'Provide your personal details',
    icon: 'fas fa-user',
    isCompleted: false
  },
  {
    id: 2,
    title: 'Demographics',
    description: 'Tell us about yourself',
    icon: 'fas fa-info-circle',
    isCompleted: false
  },
  {
    id: 3,
    title: 'Emergency Info',
    description: 'Emergency contact information',
    icon: 'fas fa-phone-alt',
    isCompleted: false
  },
  {
    id: 4,
    title: 'Notifications',
    description: 'Set your notification preferences',
    icon: 'fas fa-bell',
    isCompleted: false
  },
  {
    id: 5,
    title: 'Confirmation',
    description: 'Review and confirm your details',
    icon: 'fas fa-check-circle',
    isCompleted: false
  }
] as const;

export const USER_CATEGORIES = [
  { value: UserCategory.COMBAT_PARTICIPANT, label: T_KEYS.USER_CATEGORIES_COMBAT_PARTICIPANT },
  { value: UserCategory.FAMILY_OF_DECEASED, label: T_KEYS.USER_CATEGORIES_FAMILY_OF_DECEASED },
  { value: UserCategory.FAMILY_OF_MISSING, label: T_KEYS.USER_CATEGORIES_FAMILY_OF_MISSING },
  { value: UserCategory.PERSON_WITH_DISABILITY, label: T_KEYS.USER_CATEGORIES_PERSON_WITH_DISABILITY }
] as const;

export const MARITAL_CATEGORIES = [
  { value: MaritalCategory.MARRIED, label: T_KEYS.MARITAL_STATUS_MARRIED },
  { value: MaritalCategory.SINGLE, label: T_KEYS.MARITAL_STATUS_SINGLE },
  { value: MaritalCategory.DIVORCED, label: T_KEYS.MARITAL_STATUS_DIVORCED },
  { value: MaritalCategory.DIVORCED_PAYING_ALIMONY, label: T_KEYS.MARITAL_STATUS_DIVORCED_PAYING_ALIMONY }
] as const;

export const ACTIVITY_TYPES = [
  { value: ActivityType.SOCIAL, label: T_KEYS.ACTIVITY_TYPE_SOCIAL },
  { value: ActivityType.ECONOMIC, label: T_KEYS.ACTIVITY_TYPE_ECONOMIC },
  { value: ActivityType.VOLUNTEER, label: T_KEYS.ACTIVITY_TYPE_VOLUNTEER }
] as const;

export const REGIONS = [
  { value: 'kyiv', label: 'Kyiv' },
  { value: 'lviv', label: 'Lviv' },
  { value: 'kharkiv', label: 'Kharkiv' },
  { value: 'odesa', label: 'Odesa' },
  { value: 'dnipro', label: 'Dnipro' }
] as const;

// Add more cities based on selected region
export const CITIES = {
  kyiv: [
    { value: 'kyiv-city', label: 'Kyiv City' },
    { value: 'brovary', label: 'Brovary' },
    { value: 'irpin', label: 'Irpin' }
  ],
  lviv: [
    { value: 'lviv-city', label: 'Lviv City' },
    { value: 'drohobych', label: 'Drohobych' },
    { value: 'stryi', label: 'Stryi' }
  ]
  // Add more regions and cities
} as const;

export const GENDER_OPTIONS = [
  { value: 'male', label: 'registration.gender.male' },
  { value: 'female', label: 'registration.gender.female' },
  { value: 'other', label: 'registration.gender.other' }
] as const;

export const HOW_HEARD_OPTIONS = [
  { value: 'social_media', label: 'registration.howHeard.socialMedia' },
  { value: 'friend', label: 'registration.howHeard.friend' },
  { value: 'news', label: 'registration.howHeard.news' },
  { value: 'search', label: 'registration.howHeard.search' },
  { value: 'other', label: 'registration.howHeard.other' }
] as const;

export const FILE_UPLOAD_CONSTRAINTS = {
  maxFiles: 10,
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'application/pdf', 'image/heic'],
  errorMessages: {
    maxFiles: 'registration.upload.errors.maxFiles',
    maxSize: 'registration.upload.errors.maxSize',
    fileType: 'registration.upload.errors.fileType'
  }
} as const;

export const VALIDATION_RULES = {
  password: {
    min: 8,
    max: 50,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecial: true
  },
  motivation: {
    min: 100,
    max: 500
  },
  age: {
    min: 16,
    max: 80
  }
} as const; 
