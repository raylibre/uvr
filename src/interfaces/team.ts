export interface TeamMember {
  id: number;
  full_name: string;
  member_position: string;
  bio: string;
  photo_url: string | null;
  email: string;
  phone: string | null;
  sort_order: number;
}

export interface TeamApiResponse {
  success: boolean;
  data: TeamMember[];
  meta: {
    total: number;
  };
} 