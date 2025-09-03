// Base API paths
export const API_BASE = '/api';
export const V1 = '/v1';
export const FUNCTIONS = '/functions';

// Authentication endpoints
export const AUTH = '/auth';
export const AUTH_REGISTRATION = '/auth-register';
export const AUTH_LOGIN = '/auth-login';
export const AUTH_ME = '/auth-me';
export const AUTH_LOGOUT = '/auth-logout';
export const AUTH_REFRESH = '/auth-refresh';

// Public API endpoints
export const PUBLIC_API = '/public-api';
export const TEAM = '/team';
export const PUBLIC_PROJECTS = '/public-projects';
export const PROJECTS = '/projects';
export const CATEGORIES = '/categories';
export const UPLOADS = '/uploads';

// News endpoints
export const NEWS_LIST = '/news-list';
export const NEWS_ARTICLE = '/news-article';
// Regions endpoints (Functions v1)
export const REGION_DETAILS = '/region-details';
export const REGION_CONTACTS = '/region-contacts';
export const REGION_NEWS = '/region-news';
export const REGION_OTG = '/region-otg';

// User and profile endpoints
export const USERS = '/users';
export const PROFILE = '/profile';
export const NOTIFICATIONS = '/notifications';

// Specific API endpoints for different resources
export const HOME_DATA = '/home-data';
export const USER_PROJECTS = '/user-projects';
export const FEATURED_PROJECTS = '/featured-projects';

// API versions
export const API_V1 = API_BASE + V1;
export const FUNCTIONS_V1 = FUNCTIONS + V1;

// Combined endpoint constants
export const FUNCTIONS_V1_AUTH_REGISTRATION = FUNCTIONS + V1 + AUTH_REGISTRATION;
export const FUNCTIONS_V1_AUTH_LOGIN = FUNCTIONS + V1 + AUTH_LOGIN;
export const FUNCTIONS_V1_AUTH_ME = FUNCTIONS + V1 + AUTH_ME;
export const FUNCTIONS_V1_AUTH_LOGOUT = FUNCTIONS + V1 + AUTH_LOGOUT;
export const FUNCTIONS_V1_AUTH_REFRESH = FUNCTIONS + V1 + AUTH_REFRESH;

export const FUNCTIONS_V1_PUBLIC_API_TEAM = FUNCTIONS + V1 + PUBLIC_API + TEAM;
export const FUNCTIONS_V1_PUBLIC_PROJECTS = FUNCTIONS + V1 + PUBLIC_PROJECTS;

// News endpoints
export const FUNCTIONS_V1_NEWS_LIST = FUNCTIONS + V1 + NEWS_LIST;
export const FUNCTIONS_V1_NEWS_ARTICLE = FUNCTIONS + V1 + NEWS_ARTICLE;
// Regions endpoints
export const FUNCTIONS_V1_REGION_DETAILS = FUNCTIONS + V1 + REGION_DETAILS;
export const FUNCTIONS_V1_REGION_CONTACTS = FUNCTIONS + V1 + REGION_CONTACTS;
export const FUNCTIONS_V1_REGION_NEWS = FUNCTIONS + V1 + REGION_NEWS;
export const FUNCTIONS_V1_REGION_OTG = FUNCTIONS + V1 + REGION_OTG;
export const FUNCTIONS_V1_LEADERSHIP_APPLICATION = FUNCTIONS + V1 + '/leadership-application';

// New project endpoints
export const FUNCTIONS_V1_PROJECT_BY_SLUG = FUNCTIONS + V1 + '/project-by-slug';
export const FUNCTIONS_V1_USER_PROJECT_STATUS = FUNCTIONS + V1 + '/user-project-status';

export const API_V1_PROJECTS = API_V1 + PROJECTS;
export const API_V1_CATEGORIES = API_V1 + CATEGORIES;
export const API_V1_UPLOADS = API_V1 + UPLOADS;
export const API_V1_USERS = API_V1 + USERS;
export const API_V1_PROFILE = API_V1 + PROFILE;
export const API_V1_NOTIFICATIONS = API_V1 + NOTIFICATIONS;

export const API_V1_HOME_DATA = API_V1 + HOME_DATA;
export const API_V1_USER_PROJECTS = API_V1 + USER_PROJECTS;
export const API_V1_FEATURED_PROJECTS = API_V1 + FEATURED_PROJECTS;
