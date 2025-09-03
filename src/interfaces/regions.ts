export interface RegionLeader {
  id?: string | number;
  name: string;
  position?: string;
  photoUrl?: string | null;
  bio?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  role?: string | null;
}

// DTOs come from functions/v1/region-details; the leadership array shape may vary.
export type RegionLeadershipDTO = any;
