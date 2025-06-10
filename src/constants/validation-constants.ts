/**
 * Validation-related constants
 * Contains validation rules, limits, and patterns for forms and inputs
 */

// Field length limits
export const FIELD_LIMITS = {
  FIRST_NAME_MIN: 2,
  FIRST_NAME_MAX: 50,
  LAST_NAME_MIN: 2,
  LAST_NAME_MAX: 50,
  PATRONYMIC_MAX: 50,
  EMAIL_MAX: 255,
  PHONE_MIN: 10,
  PHONE_MAX: 15,
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 128,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 1000,
  ADDRESS_MIN: 10,
  ADDRESS_MAX: 200,
  EMERGENCY_CONTACT_NAME_MIN: 2,
  EMERGENCY_CONTACT_NAME_MAX: 100,
  PROJECT_TITLE_MIN: 5,
  PROJECT_TITLE_MAX: 200,
  PROJECT_DESCRIPTION_MIN: 20,
  PROJECT_DESCRIPTION_MAX: 5000
} as const;

// File upload limits
export const FILE_UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB in bytes
  MAX_FILES_COUNT: 5,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
} as const;

// Regular expression patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  UKRAINIAN_PHONE: /^\+380\d{9}$/,
  NAME: /^[a-zA-Zа-яА-ЯіІїЇєЄ''\-\s]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  SLUG: /^[a-z0-9-]+$/,
  NUMERIC: /^\d+$/,
  DECIMAL: /^\d+(\.\d{1,2})?$/
} as const;

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Це поле є обов\'язковим',
  EMAIL_INVALID: 'Введіть дійсну електронну адресу',
  PHONE_INVALID: 'Введіть дійсний номер телефону',
  PASSWORD_TOO_SHORT: `Пароль повинен містити принаймні ${FIELD_LIMITS.PASSWORD_MIN} символів`,
  PASSWORD_TOO_WEAK: 'Пароль повинен містити принаймні одну велику літеру, одну малу літеру, одну цифру та один спеціальний символ',
  PASSWORDS_NOT_MATCH: 'Паролі не співпадають',
  NAME_INVALID: 'Ім\'я може містити лише літери, апострофи, дефіси та пробіли',
  FILE_TOO_LARGE: `Розмір файлу не повинен перевищувати ${FILE_UPLOAD_LIMITS.MAX_FILE_SIZE / 1024 / 1024} МБ`,
  FILE_TYPE_INVALID: 'Непідтримуваний тип файлу',
  TOO_MANY_FILES: `Максимальна кількість файлів: ${FILE_UPLOAD_LIMITS.MAX_FILES_COUNT}`,
  FIELD_TOO_SHORT: (min: number) => `Мінімальна довжина: ${min} символів`,
  FIELD_TOO_LONG: (max: number) => `Максимальна довжина: ${max} символів`,
  NUMERIC_ONLY: 'Поле може містити лише цифри',
  FUTURE_DATE_ONLY: 'Дата не може бути в минулому'
} as const;

// File type groups for validation
export const FILE_TYPE_GROUPS = {
  IMAGES: FILE_UPLOAD_LIMITS.ALLOWED_IMAGE_TYPES,
  DOCUMENTS: FILE_UPLOAD_LIMITS.ALLOWED_DOCUMENT_TYPES,
  ALL_UPLOADS: [
    ...FILE_UPLOAD_LIMITS.ALLOWED_IMAGE_TYPES,
    ...FILE_UPLOAD_LIMITS.ALLOWED_DOCUMENT_TYPES
  ]
} as const;

// Age validation constants
export const AGE_LIMITS = {
  MIN_USER_AGE: 16,
  MAX_USER_AGE: 120,
  MIN_VOLUNTEER_AGE: 18,
  RETIREMENT_AGE: 65
} as const;

// Input debounce delays (in milliseconds)
export const DEBOUNCE_DELAYS = {
  SEARCH_INPUT: 300,
  FORM_VALIDATION: 500,
  API_CALLS: 1000,
  RESIZE_EVENTS: 100
} as const; 