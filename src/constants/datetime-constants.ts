/**
 * Date and time related constants
 * Contains date formats, locales, time zones, and temporal configurations
 */

// Date format patterns
export const DATE_FORMATS = {
  FULL_DATE: 'dd MMMM yyyy',
  SHORT_DATE: 'dd.MM.yyyy',
  MONTH_YEAR: 'MMMM yyyy',
  YEAR_ONLY: 'yyyy',
  ISO_DATE: 'yyyy-MM-dd',
  API_DATETIME: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
  DISPLAY_DATETIME: 'dd.MM.yyyy HH:mm',
  TIME_ONLY: 'HH:mm',
  RELATIVE_TIME: 'relative'
} as const;

// Ukrainian locale settings
export const LOCALE_CONFIG = {
  UKRAINE: 'uk-UA',
  DEFAULT: 'uk-UA',
  FALLBACK: 'en-US'
} as const;

// Time zones
export const TIME_ZONES = {
  UKRAINE: 'Europe/Kyiv',
  UTC: 'UTC'
} as const;

// Calendar configurations
export const CALENDAR_CONFIG = {
  FIRST_DAY_OF_WEEK: 1, // Monday
  WEEKEND_DAYS: [6, 0], // Saturday, Sunday
  WORKING_DAYS: [1, 2, 3, 4, 5], // Monday to Friday
  MONTHS_IN_YEAR: 12,
  DAYS_IN_WEEK: 7
} as const;

// Ukrainian month names
export const UKRAINIAN_MONTHS = [
  'Січень',
  'Лютий', 
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень'
] as const;

// Ukrainian short month names
export const UKRAINIAN_MONTHS_SHORT = [
  'Січ',
  'Лют',
  'Бер',
  'Кві',
  'Тра',
  'Чер',
  'Лип',
  'Сер',
  'Вер',
  'Жов',
  'Лис',
  'Гру'
] as const;

// Ukrainian day names
export const UKRAINIAN_DAYS = [
  'Неділя',
  'Понеділок',
  'Вівторок',
  'Середа',
  'Четвер',
  'П\'ятниця',
  'Субота'
] as const;

// Ukrainian short day names
export const UKRAINIAN_DAYS_SHORT = [
  'Нд',
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб'
] as const;

// Age calculation constants
export const AGE_CONSTANTS = {
  MONTHS_IN_YEAR: 12,
  DAYS_IN_MONTH_AVERAGE: 30.44,
  MILLISECONDS_IN_DAY: 24 * 60 * 60 * 1000,
  MILLISECONDS_IN_YEAR: 365.25 * 24 * 60 * 60 * 1000
} as const;

// Time duration constants (in milliseconds)
export const TIME_DURATIONS = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000
} as const;

// Relative time thresholds
export const RELATIVE_TIME_LIMITS = {
  JUST_NOW: 1 * TIME_DURATIONS.MINUTE,
  MINUTES_AGO: 60 * TIME_DURATIONS.MINUTE,
  HOURS_AGO: 24 * TIME_DURATIONS.HOUR,
  DAYS_AGO: 7 * TIME_DURATIONS.DAY,
  WEEKS_AGO: 4 * TIME_DURATIONS.WEEK
} as const;

// Working hours configuration
export const WORKING_HOURS = {
  START_HOUR: 9,
  END_HOUR: 18,
  LUNCH_START: 13,
  LUNCH_END: 14,
  TIMEZONE: TIME_ZONES.UKRAINE
} as const;

// Date validation limits
export const DATE_LIMITS = {
  MIN_BIRTH_YEAR: 1900,
  MAX_BIRTH_YEAR: new Date().getFullYear(),
  MIN_PROJECT_DURATION_MONTHS: 1,
  MAX_PROJECT_DURATION_MONTHS: 60,
  APPLICATION_DEADLINE_BUFFER_DAYS: 7
} as const;

// Common date presets for forms
export const DATE_PRESETS = {
  TODAY: 'today',
  TOMORROW: 'tomorrow',
  NEXT_WEEK: 'next_week',
  NEXT_MONTH: 'next_month',
  END_OF_YEAR: 'end_of_year'
} as const; 