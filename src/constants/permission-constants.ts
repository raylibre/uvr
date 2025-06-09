export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  COORDINATOR = 'coordinator',
  USER = 'user'
}

export enum Permission {
  // Profile permissions
  VIEW_OWN_PROFILE = 'view_own_profile',
  VIEW_ALL_PROFILES = 'view_all_profiles',
  UPDATE_OWN_PROFILE = 'update_own_profile',
  UPDATE_ANY_PROFILE = 'update_any_profile',
  UPDATE_VERIFICATION_STATUS = 'update_verification_status',

  // Category change permissions
  VIEW_OWN_CATEGORY_REQUESTS = 'view_own_category_requests',
  VIEW_ALL_CATEGORY_REQUESTS = 'view_all_category_requests',
  CREATE_CATEGORY_REQUEST = 'create_category_request',
  UPDATE_OWN_PENDING_REQUEST = 'update_own_pending_request',
  UPDATE_REQUEST_STATUS = 'update_request_status',

  // Document permissions
  VIEW_OWN_DOCUMENTS = 'view_own_documents',
  VIEW_ALL_DOCUMENTS = 'view_all_documents',
  UPLOAD_DOCUMENTS = 'upload_documents',
  DELETE_OWN_PENDING_DOCUMENTS = 'delete_own_pending_documents',
  VERIFY_DOCUMENTS = 'verify_documents',

  // Project permissions
  VIEW_ACTIVE_PROJECTS = 'view_active_projects',
  VIEW_ALL_PROJECTS = 'view_all_projects',
  CREATE_PROJECTS = 'create_projects',
  UPDATE_OWN_PROJECTS = 'update_own_projects',
  UPDATE_ANY_PROJECT = 'update_any_project',

  // Application permissions
  VIEW_OWN_APPLICATIONS = 'view_own_applications',
  VIEW_PROJECT_APPLICATIONS = 'view_project_applications',
  CREATE_APPLICATION = 'create_application',
  UPDATE_OWN_DRAFT = 'update_own_draft',
  UPDATE_APPLICATION_STATUS = 'update_application_status',

  // Audit permissions
  VIEW_AUDIT_LOGS = 'view_audit_logs'
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: Object.values(Permission),
  [UserRole.MODERATOR]: [
    Permission.VIEW_ALL_PROFILES,
    Permission.UPDATE_VERIFICATION_STATUS,
    Permission.VIEW_ALL_CATEGORY_REQUESTS,
    Permission.UPDATE_REQUEST_STATUS,
    Permission.VIEW_ALL_DOCUMENTS,
    Permission.VERIFY_DOCUMENTS,
    Permission.VIEW_ACTIVE_PROJECTS,
    Permission.VIEW_PROJECT_APPLICATIONS,
    Permission.UPDATE_APPLICATION_STATUS
  ],
  [UserRole.COORDINATOR]: [
    Permission.VIEW_OWN_PROFILE,
    Permission.UPDATE_OWN_PROFILE,
    Permission.VIEW_ACTIVE_PROJECTS,
    Permission.UPDATE_OWN_PROJECTS,
    Permission.VIEW_PROJECT_APPLICATIONS,
    Permission.UPDATE_APPLICATION_STATUS
  ],
  [UserRole.USER]: [
    Permission.VIEW_OWN_PROFILE,
    Permission.UPDATE_OWN_PROFILE,
    Permission.VIEW_OWN_CATEGORY_REQUESTS,
    Permission.CREATE_CATEGORY_REQUEST,
    Permission.UPDATE_OWN_PENDING_REQUEST,
    Permission.VIEW_OWN_DOCUMENTS,
    Permission.UPLOAD_DOCUMENTS,
    Permission.DELETE_OWN_PENDING_DOCUMENTS,
    Permission.VIEW_ACTIVE_PROJECTS,
    Permission.VIEW_OWN_APPLICATIONS,
    Permission.CREATE_APPLICATION,
    Permission.UPDATE_OWN_DRAFT
  ]
}; 