/**
 * Status-related enums and constants
 * Contains all status enums and their mappings for consistent usage across the application
 */

// User status enums
export enum UserCategory {
  FAMILY_WITHOUT_FATHER = 'family_without_father',
  VOLUNTEER = 'volunteer',
  ACTIVE_MILITARY = 'active_military',
  ACTIVE_VETERAN = 'active_veteran',
  RETIRED_VETERAN = 'retired_veteran',
  COMBAT_DISABLED = 'combat_disabled',
  HOMELESS_FAMILY = 'homeless_family'
}

export enum VerificationStatus {
  PENDING = 'pending',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REQUIRES_ADDITIONAL_DOCS = 'requires_additional_docs'
}

export enum UserRole {
  USER = 'user',
  COORDINATOR = 'coordinator',
  MODERATOR = 'moderator',
  ADMIN = 'admin'
}

// Project status enums
export enum ProjectType {
  PROSTHETICS = 'prosthetics',
  FAMILY_SUPPORT = 'family_support',
  LEGAL_AID = 'legal_aid',
  AI_PSYCHOLOGY = 'ai_psychology',
  CIVILIAN_RETRAINING = 'civilian_retraining',
  MILITARY_RETRAINING = 'military_retraining'
}

export enum ApplicationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  IN_QUEUE = 'in_queue',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum ParticipationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  WITHDRAWN = 'withdrawn'
}

export enum ProgramStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  DRAFT = 'draft'
}

// Document and notification enums
export enum DocumentType {
  VOLUNTEER_CERTIFICATE = 'volunteer_certificate',
  MILITARY_ID = 'military_id',
  VETERAN_CERTIFICATE = 'veteran_certificate',
  DISABILITY_CERTIFICATE = 'disability_certificate',
  DEATH_CERTIFICATE = 'death_certificate',
  MARRIAGE_CERTIFICATE = 'marriage_certificate',
  BIRTH_CERTIFICATE = 'birth_certificate',
  DISPLACEMENT_CERTIFICATE = 'displacement_certificate',
  PASSPORT = 'passport',
  OTHER = 'other'
}

export enum NotificationStatus {
  UNREAD = 'unread',
  READ = 'read',
  ARCHIVED = 'archived'
}

export enum NotificationType {
  VERIFICATION_APPROVED = 'verification_approved',
  VERIFICATION_REJECTED = 'verification_rejected',
  APPLICATION_STATUS_CHANGED = 'application_status_changed',
  NEW_PROJECT_AVAILABLE = 'new_project_available',
  DOCUMENT_REQUIRED = 'document_required',
  SYSTEM_MESSAGE = 'system_message'
}

// Status label mappings
export const USER_CATEGORY_LABELS = {
  [UserCategory.FAMILY_WITHOUT_FATHER]: 'Сім\'я без батька',
  [UserCategory.VOLUNTEER]: 'Волонтер',
  [UserCategory.ACTIVE_MILITARY]: 'Діючий військовослужбовець',
  [UserCategory.ACTIVE_VETERAN]: 'Діючий ветеран',
  [UserCategory.RETIRED_VETERAN]: 'Ветеран у відставці',
  [UserCategory.COMBAT_DISABLED]: 'Інвалід бойових дій',
  [UserCategory.HOMELESS_FAMILY]: 'Сім\'я без житла'
} as const;

export const VERIFICATION_STATUS_LABELS = {
  [VerificationStatus.PENDING]: 'Очікує перевірки',
  [VerificationStatus.UNDER_REVIEW]: 'На розгляді',
  [VerificationStatus.APPROVED]: 'Схвалено',
  [VerificationStatus.REJECTED]: 'Відхилено',
  [VerificationStatus.REQUIRES_ADDITIONAL_DOCS]: 'Потрібні додаткові документи'
} as const;

export const PARTICIPATION_STATUS_LABELS = {
  [ParticipationStatus.PENDING]: 'Заявка на розгляді',
  [ParticipationStatus.APPROVED]: 'Заявка схвалена',
  [ParticipationStatus.REJECTED]: 'Заявка відхилена',
  [ParticipationStatus.COMPLETED]: 'Програма завершена',
  [ParticipationStatus.WITHDRAWN]: 'Заявка відкликана'
} as const;

export const PROJECT_TYPE_LABELS = {
  [ProjectType.PROSTHETICS]: 'Протезування',
  [ProjectType.FAMILY_SUPPORT]: 'Підтримка сімей',
  [ProjectType.LEGAL_AID]: 'Правова допомога',
  [ProjectType.AI_PSYCHOLOGY]: 'ШІ-психологія',
  [ProjectType.CIVILIAN_RETRAINING]: 'Перекваліфікація цивільних',
  [ProjectType.MILITARY_RETRAINING]: 'Перекваліфікація військових'
} as const;

// Status color mappings
export const VERIFICATION_STATUS_COLORS = {
  [VerificationStatus.PENDING]: 'yellow',
  [VerificationStatus.UNDER_REVIEW]: 'blue',
  [VerificationStatus.APPROVED]: 'green',
  [VerificationStatus.REJECTED]: 'red',
  [VerificationStatus.REQUIRES_ADDITIONAL_DOCS]: 'orange'
} as const;

export const PARTICIPATION_STATUS_COLORS = {
  [ParticipationStatus.PENDING]: 'yellow',
  [ParticipationStatus.APPROVED]: 'green',
  [ParticipationStatus.REJECTED]: 'red',
  [ParticipationStatus.COMPLETED]: 'blue',
  [ParticipationStatus.WITHDRAWN]: 'gray'
} as const;

export const APPLICATION_STATUS_COLORS = {
  [ApplicationStatus.DRAFT]: 'gray',
  [ApplicationStatus.SUBMITTED]: 'blue',
  [ApplicationStatus.IN_QUEUE]: 'yellow',
  [ApplicationStatus.IN_PROGRESS]: 'blue',
  [ApplicationStatus.COMPLETED]: 'green',
  [ApplicationStatus.CANCELLED]: 'red'
} as const; 