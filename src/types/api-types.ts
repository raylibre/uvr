// Import enums from constants files
import type {
  UserCategory,
  VerificationStatus,
  UserRole,
  ProjectType,
  ApplicationStatus,
  DocumentType,
  NotificationStatus,
  NotificationType
} from '../constants/status-constants';

import type { UkraineRegion } from '../constants/geographic-constants';

// Re-export for backward compatibility
export type {
  UserCategory,
  VerificationStatus,
  UserRole,
  ProjectType,
  ApplicationStatus,
  DocumentType,
  NotificationStatus,
  NotificationType,
  UkraineRegion
};

// Base interfaces for API responses
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  meta: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
  };
}

// User related interfaces
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  category: UserCategory;
  role: UserRole;
  region: UkraineRegion;
  verificationStatus: VerificationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: number;
  userId: number;
  type: DocumentType;
  fileUrl: string;
  status: VerificationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  type: ProjectType;
  startDate: string;
  endDate?: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: number;
  userId: number;
  projectId: number;
  status: ApplicationStatus;
  documents: Document[];
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: number;
  userId: number;
  type: NotificationType;
  status: NotificationStatus;
  title: string;
  message: string;
  createdAt: string;
  updatedAt: string;
} 