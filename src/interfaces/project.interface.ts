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

// Extended interface for detailed program view
export interface ProgramDetail extends PublicProject {
  long_description: string;
  requirements: string[];
  benefits: string[];
  duration_months: number | null;
  contact_email: string | null;
  contact_phone: string | null;
  application_deadline: string | null;
  status: 'active' | 'paused' | 'completed' | 'draft';
  max_participants: number | null;
  gallery_images: string[];
  location: string | null;
  tags: string[];
}

// User participation interfaces
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