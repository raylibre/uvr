import {
  UserCategory,
  MaritalCategory,
  ActivityType
} from '~/types/user.d';
import { T_KEYS } from '~/constants/translation-keys';
import {
  getRegionsForDropdown,
  getCitiesForDropdown,
  getRegionOptions,
  getCityOptions,
  UKRAINE_REGION_LABELS
} from '~/constants/geographic-constants';


export const REGISTRATION_STEPS = [
  {
    id: 1,
    title: T_KEYS.AUTH.REGISTER.STEPS.STEP1.TITLE,
    description: T_KEYS.AUTH.REGISTER.STEPS.STEP1.DESCRIPTION,
    icon: 'fas fa-user',
    isCompleted: false
  },
  {
    id: 2,
    title: T_KEYS.AUTH.REGISTER.STEPS.STEP2.TITLE,
    description: T_KEYS.AUTH.REGISTER.STEPS.STEP2.DESCRIPTION,
    icon: 'fas fa-info-circle',
    isCompleted: false
  },
  {
    id: 3,
    title: T_KEYS.AUTH.REGISTER.STEPS.STEP3.TITLE,
    description: T_KEYS.AUTH.REGISTER.STEPS.STEP3.DESCRIPTION,
    icon: 'fas fa-phone-alt',
    isCompleted: false
  },
  {
    id: 4,
    title: T_KEYS.AUTH.REGISTER.STEPS.STEP4.TITLE,
    description: T_KEYS.AUTH.REGISTER.STEPS.STEP4.DESCRIPTION,
    icon: 'fas fa-bell',
    isCompleted: false
  },
  {
    id: 5,
    title: T_KEYS.AUTH.REGISTER.STEPS.STEP5.TITLE,
    description: T_KEYS.AUTH.REGISTER.STEPS.STEP5.DESCRIPTION,
    icon: 'fas fa-check-circle',
    isCompleted: false
  }
] as const;

export const USER_CATEGORIES = [
  { value: UserCategory.FAMILY_WITHOUT_FATHER, label: T_KEYS.USER_CATEGORIES_FAMILY_WITHOUT_FATHER },
  { value: UserCategory.VOLUNTEER, label: T_KEYS.USER_CATEGORIES_VOLUNTEER },
  { value: UserCategory.ACTIVE_MILITARY, label: T_KEYS.USER_CATEGORIES_ACTIVE_MILITARY },
  { value: UserCategory.ACTIVE_VETERAN, label: T_KEYS.USER_CATEGORIES_ACTIVE_VETERAN },
  { value: UserCategory.RETIRED_VETERAN, label: T_KEYS.USER_CATEGORIES_RETIRED_VETERAN },
  { value: UserCategory.COMBAT_DISABLED, label: T_KEYS.USER_CATEGORIES_COMBAT_DISABLED },
  { value: UserCategory.HOMELESS_FAMILY, label: T_KEYS.USER_CATEGORIES_HOMELESS_FAMILY }
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

// Document types for registration document uploads
export const DOCUMENT_TYPES = [
  { value: 'volunteer_certificate', label: T_KEYS.DOCUMENTS.TYPES.VOLUNTEER_CERTIFICATE },
  { value: 'military_id', label: T_KEYS.DOCUMENTS.TYPES.MILITARY_ID },
  { value: 'veteran_certificate', label: T_KEYS.DOCUMENTS.TYPES.VETERAN_CERTIFICATE },
  { value: 'disability_certificate', label: T_KEYS.DOCUMENTS.TYPES.DISABILITY_CERTIFICATE },
  { value: 'death_certificate', label: T_KEYS.DOCUMENTS.TYPES.DEATH_CERTIFICATE },
  { value: 'marriage_certificate', label: T_KEYS.DOCUMENTS.TYPES.MARRIAGE_CERTIFICATE },
  { value: 'birth_certificate', label: T_KEYS.DOCUMENTS.TYPES.BIRTH_CERTIFICATE },
  { value: 'displacement_certificate', label: T_KEYS.DOCUMENTS.TYPES.DISPLACEMENT_CERTIFICATE },
  { value: 'passport', label: T_KEYS.DOCUMENTS.TYPES.PASSPORT },
  { value: 'other', label: T_KEYS.DOCUMENTS.TYPES.OTHER }
] as const;

// Use dynamic functions from geographic constants for comprehensive Ukrainian data
export const getRegionsForRegistration = getRegionsForDropdown;

export const getCitiesForRegion = getCitiesForDropdown;

// Backward-compatible constants for components expecting arrays
export const REGIONS = getRegionOptions();

// Legacy CITIES structure: map every region key to its city options
export const CITIES: Record<string, Array<{ value: string; label: string; disabled?: boolean }>> = Object.fromEntries(
  Object.keys(UKRAINE_REGION_LABELS).map((regionKey) => [regionKey, getCityOptions(regionKey)])
);

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
