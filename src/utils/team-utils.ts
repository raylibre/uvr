import type { TeamMember } from '~/interfaces/team';
import type { Representative } from '~/interfaces/home';

/**
 * Transform a team member to a representative
 */
export function transformTeamMemberToRepresentative(teamMember: TeamMember): Representative {
  return {
    id: teamMember.id,
    name: teamMember.full_name,
    position: teamMember.member_position,
    image: teamMember.photo_url,
    bio: teamMember.bio
  };
}

/**
 * Transform team members array to representatives array
 */
export function transformTeamMembersToRepresentatives(teamMembers: TeamMember[]): Representative[] {
  return teamMembers.map(transformTeamMemberToRepresentative);
}

/**
 * Simple hash function for browser environments
 */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

/**
 * Generate a cache key hash for a team member image
 * Uses a combination of id, full_name, and member_position for uniqueness
 */
export function generateImageCacheKey(teamMember: TeamMember): string {
  const dataString = `${teamMember.id}-${teamMember.full_name}-${teamMember.member_position}`;
  return simpleHash(dataString);
}

/**
 * Get cached image URL or return original
 */
export function getCachedImageUrl(photoUrl: string | null): string | null {
  if (!photoUrl) return null;
  
  // Check if service worker is available and image is cached
  if ('serviceWorker' in navigator && 'caches' in window) {
    return photoUrl; // Service worker will handle caching
  }
  
  return photoUrl;
} 