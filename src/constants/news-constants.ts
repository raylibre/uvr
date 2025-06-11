/**
 * News-related constants
 * Contains news categories, labels, and other news-specific configurations
 */

// News categories
export enum NewsCategory {
  GENERAL = 'general',
  PROJECT_RELATED = 'project_related'
}

// News category labels for UI display
export const NEWS_CATEGORY_LABELS = {
  [NewsCategory.GENERAL]: 'Загальні',
  [NewsCategory.PROJECT_RELATED]: 'Проєкти'
} as const;

// News category CSS classes
export const NEWS_CATEGORY_CLASSES = {
  [NewsCategory.GENERAL]: 'category-general',
  [NewsCategory.PROJECT_RELATED]: 'category-project'
} as const;

// News pagination settings
export const NEWS_PAGINATION = {
  DEFAULT_LIMIT: 10,
  HOME_PAGE_LIMIT: 4,
  LOAD_MORE_INCREMENT: 10
} as const; 