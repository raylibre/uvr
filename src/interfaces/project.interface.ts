export interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
  client: string;
  duration: string;
  status: 'Completed' | 'In Progress' | 'Planned';
}

// New interface matching the public projects API response
export interface PublicProject {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  project_type: string;
  featured_image_url: string | null;
  total_helped: number;
  current_participants: number;
  success_stories_count: number;
  total_budget: number | null;
  is_featured: boolean;
  created_at: string;
}

// Updated interface matching actual API response for detailed program view
export interface ProgramDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  project_type: string;
  allowed_categories: string[];
  is_active: boolean;
  is_featured: boolean;
  has_queue: boolean;
  max_participants: number | null;
  current_participants: number;
  registration_start: string | null;
  registration_end: string | null;
  project_start: string | null;
  project_end: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  total_helped: number;
  total_budget: number | null;
  success_stories_count: number;
  created_at: string;
  coordinator_name: string | null;
  images_count: number;
  applications_count: number;
  requirements: string[];
  benefits: string[];
  duration_months: number | null;
  application_deadline: string | null;
  gallery_images: string[];
  location: string | null;
  tags: string[];
}

// User project status interfaces based on actual API response
export interface UserProjectStatus {
  project_id: number;
  user_id: string;
  status: 'can_apply' | 'already_applied' | 'application_pending' | 'application_approved' | 'application_rejected' | 'category_not_allowed' | 'user_not_verified';
  can_apply: boolean;
  reason: string;
  application_id: number | null;
  queue_position: number | null;
  checked_at: string;
}

export interface UserProjectStatusResponse {
  success: boolean;
  data: UserProjectStatus;
}

// Legacy interface for backward compatibility
export interface UserParticipation {
  id: number;
  user_id: number;
  project_id: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'withdrawn';
  applied_at: string;
  approved_at: string | null;
  completed_at: string | null;
  notes: string | null;
}

export interface JoinProgramRequest {
  project_id: number;
  application_message: string;
}

export interface JoinProgramResponse {
  success: boolean;
  data: {
    participation: UserParticipation;
  };
  message: string;
}

export interface ProgramDetailResponse {
  success: boolean;
  data: {
    program: ProgramDetail;
    user_participation: UserParticipation | null;
  };
}

export interface PublicProjectsResponse {
  success: boolean;
  data: {
    projects: PublicProject[];
    meta: {
      total: number;
      limit: number;
      offset: number;
      has_more: boolean;
      featured_count: number;
      types: string[];
    };
  };
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
}

export interface ProjectsListProps {
  projects: Project[];
  onViewDetails: (id: number) => void;
} 