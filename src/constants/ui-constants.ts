/**
 * UI-related constants
 * Contains design system values, breakpoints, component configurations, and UI behavior constants
 */

// Breakpoints for responsive design
export const BREAKPOINTS = {
  XS: 480,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536
} as const;

// Spacing values (in pixels)
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
  XXXL: 64
} as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000
} as const;

// Z-index layers
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  NOTIFICATION: 1080
} as const;

// Component sizes
export const COMPONENT_SIZES = {
  BUTTON: {
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg'
  },
  INPUT: {
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg'
  },
  AVATAR: {
    EXTRA_SMALL: 'xs',
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg',
    EXTRA_LARGE: 'xl'
  }
} as const;

// Color palette names
export const COLORS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  GRAY: 'gray',
  WHITE: 'white',
  BLACK: 'black'
} as const;

// Status badge colors
export const STATUS_BADGE_COLORS = {
  SUCCESS: 'green',
  WARNING: 'yellow',
  ERROR: 'red',
  INFO: 'blue',
  NEUTRAL: 'gray'
} as const;

// Pagination settings
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  SMALL_PAGE_SIZE: 6,
  LARGE_PAGE_SIZE: 24,
  MAX_VISIBLE_PAGES: 7,
  MOBILE_MAX_VISIBLE_PAGES: 3
} as const;

// Loading states
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
} as const;

// Modal sizes
export const MODAL_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
  EXTRA_LARGE: 'xl',
  FULL: 'full'
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
} as const;

// Notification durations (in milliseconds)
export const NOTIFICATION_DURATIONS = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000,
  PERMANENT: 0 // Don't auto-dismiss
} as const;

// Form field types
export const FORM_FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  TEL: 'tel',
  NUMBER: 'number',
  DATE: 'date',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  FILE: 'file'
} as const;

// Table configurations
export const TABLE_CONFIG = {
  DEFAULT_ROWS_PER_PAGE: 10,
  ROWS_PER_PAGE_OPTIONS: [5, 10, 25, 50, 100],
  COMPACT_ROWS_PER_PAGE: 5,
  MAX_COLUMN_WIDTH: 300,
  MIN_COLUMN_WIDTH: 100
} as const;

// Tooltip positions
export const TOOLTIP_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
  TOP_START: 'top-start',
  TOP_END: 'top-end',
  BOTTOM_START: 'bottom-start',
  BOTTOM_END: 'bottom-end'
} as const;

// Image aspect ratios
export const ASPECT_RATIOS = {
  SQUARE: '1:1',
  LANDSCAPE: '16:9',
  PORTRAIT: '3:4',
  GOLDEN: '1.618:1',
  WIDE: '21:9'
} as const;

// Common UI text constants
export const UI_TEXT = {
  LOADING: 'Завантаження...',
  ERROR: 'Помилка',
  SUCCESS: 'Успіх',
  CANCEL: 'Скасувати',
  CONFIRM: 'Підтвердити',
  SAVE: 'Зберегти',
  DELETE: 'Видалити',
  EDIT: 'Редагувати',
  VIEW: 'Переглянути',
  CLOSE: 'Закрити',
  BACK: 'Назад',
  NEXT: 'Далі',
  PREVIOUS: 'Попередня',
  SUBMIT: 'Надіслати',
  RESET: 'Скинути',
  SEARCH: 'Пошук',
  FILTER: 'Фільтр',
  SORT: 'Сортування',
  SELECT_ALL: 'Вибрати все',
  CLEAR_ALL: 'Очистити все',
  NO_DATA: 'Немає даних',
  NO_RESULTS: 'Результатів не знайдено',
  TRY_AGAIN: 'Спробувати знову'
} as const; 