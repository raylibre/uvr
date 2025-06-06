export enum UserCategory {
  FamilyWithoutFather = 'family_without_father',
  Volunteer = 'volunteer',
  ActiveMilitary = 'active_military',
  ActiveVeteran = 'active_veteran',
  RetiredVeteran = 'retired_veteran',
  CombatDisabled = 'combat_disabled',
  HomelessFamily = 'homeless_family'
}

export enum VerificationStatus {
  Pending = 'pending',
  UnderReview = 'under_review',
  Approved = 'approved',
  Rejected = 'rejected',
  RequiresAdditionalDocs = 'requires_additional_docs'
}

export enum UserRole {
  User = 'user',
  Admin = 'admin',
  Moderator = 'moderator'
}

export enum ProjectType {
  Prosthetics = 'prosthetics',
  FamilySupport = 'family_support',
  LegalAid = 'legal_aid',
  AiPsychology = 'ai_psychology',
  CivilianRetraining = 'civilian_retraining',
  MilitaryRetraining = 'military_retraining'
}

export enum ApplicationStatus {
  Draft = 'draft',
  Submitted = 'submitted',
  InQueue = 'in_queue',
  InProgress = 'in_progress',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export enum DocumentType {
  VolunteerCertificate = 'volunteer_certificate',
  MilitaryId = 'military_id',
  VeteranCertificate = 'veteran_certificate',
  DisabilityCertificate = 'disability_certificate',
  DeathCertificate = 'death_certificate',
  MarriageCertificate = 'marriage_certificate',
  BirthCertificate = 'birth_certificate',
  DisplacementCertificate = 'displacement_certificate',
  Passport = 'passport',
  Other = 'other'
}

export enum NotificationStatus {
  Unread = 'unread',
  Read = 'read',
  Archived = 'archived'
}

export enum NotificationType {
  VerificationApproved = 'verification_approved',
  VerificationRejected = 'verification_rejected',
  ApplicationStatusChanged = 'application_status_changed',
  NewProjectAvailable = 'new_project_available',
  DocumentRequired = 'document_required',
  SystemMessage = 'system_message'
}

export enum UkraineRegion {
  KyivCity = 'kyiv_city',
  KyivRegion = 'kyiv_region',
  KharkivRegion = 'kharkiv_region',
  OdesaRegion = 'odesa_region',
  DniproRegion = 'dnipro_region',
  DonetskRegion = 'donetsk_region',
  ZaporizhzhiaRegion = 'zaporizhzhia_region',
  LvivRegion = 'lviv_region',
  PoltavaRegion = 'poltava_region',
  ChernihivRegion = 'chernihiv_region',
  CherkasyRegion = 'cherkasy_region',
  KhmelnytskyiRegion = 'khmelnytskyi_region',
  ZhytomyrRegion = 'zhytomyr_region',
  RivneRegion = 'rivne_region',
  VolynRegion = 'volyn_region',
  TernopilRegion = 'ternopil_region',
  IvanoFrankivskRegion = 'ivano_frankivsk_region',
  ChernivtsiRegion = 'chernivtsi_region',
  TranscarpathiaRegion = 'transcarpathia_region',
  SumyRegion = 'sumy_region',
  KirovohradRegion = 'kirovohrad_region',
  MykolaivRegion = 'mykolaiv_region',
  KhersonRegion = 'kherson_region',
  LuhanskRegion = 'luhansk_region',
  Crimea = 'crimea',
  Abroad = 'abroad'
}

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