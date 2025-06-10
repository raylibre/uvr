// Base API paths
export const API_BASE = '/api';
export const V1 = '/v1';
export const FUNCTIONS = '/functions';

// API versions
export const API_V1 = API_BASE + V1;
export const FUNCTIONS_V1 = FUNCTIONS + V1;

// Authentication endpoints
export const AUTH = '/auth';
export const AUTH_REGISTRATION = '/auth-register';
export const AUTH_LOGIN = '/auth-login';
export const AUTH_LOGOUT = '/auth-logout';
export const AUTH_REFRESH = '/auth-refresh';

// Public API endpoints
export const PUBLIC_API = '/public-api';
export const TEAM = '/team';
export const PUBLIC_PROJECTS = '/public-projects';
export const PROJECTS = '/projects';
export const CATEGORIES = '/categories';
export const UPLOADS = '/uploads';

// User and profile endpoints
export const USERS = '/users';
export const PROFILE = '/profile';
export const NOTIFICATIONS = '/notifications';

// Combined endpoint constants
export const FUNCTIONS_V1_AUTH_REGISTRATION = FUNCTIONS + V1 + AUTH_REGISTRATION;
export const FUNCTIONS_V1_AUTH_LOGIN = FUNCTIONS + V1 + AUTH_LOGIN;
export const FUNCTIONS_V1_AUTH_LOGOUT = FUNCTIONS + V1 + AUTH_LOGOUT;
export const FUNCTIONS_V1_AUTH_REFRESH = FUNCTIONS + V1 + AUTH_REFRESH;

export const FUNCTIONS_V1_PUBLIC_API_TEAM = FUNCTIONS + V1 + PUBLIC_API + TEAM;
export const FUNCTIONS_V1_PUBLIC_PROJECTS = FUNCTIONS + V1 + PUBLIC_PROJECTS;

export const API_V1_PROJECTS = API_V1 + PROJECTS;
export const API_V1_CATEGORIES = API_V1 + CATEGORIES;
export const API_V1_UPLOADS = API_V1 + UPLOADS;
export const API_V1_USERS = API_V1 + USERS;
export const API_V1_PROFILE = API_V1 + PROFILE;
export const API_V1_NOTIFICATIONS = API_V1 + NOTIFICATIONS;

// Specific API endpoints for different resources
export const HOME_DATA = '/home-data';
export const USER_PROJECTS = '/user-projects';
export const FEATURED_PROJECTS = '/featured-projects';

export const API_V1_HOME_DATA = API_V1 + HOME_DATA;
export const API_V1_USER_PROJECTS = API_V1 + USER_PROJECTS;
export const API_V1_FEATURED_PROJECTS = API_V1 + FEATURED_PROJECTS;