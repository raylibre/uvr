import { AxiosResponse } from 'axios';
import apiClient from './api-client';
import type { TeamApiResponse, TeamMember } from '~/interfaces/team';
import { FUNCTIONS_V1_PUBLIC_API_TEAM } from '~/constants/url-constants';

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response: AxiosResponse<TeamApiResponse> = await apiClient.get(FUNCTIONS_V1_PUBLIC_API_TEAM);

    if (!response.data.success) {
      throw new Error('Failed to fetch team data');
    }

    // Sort by sort_order to maintain the intended display order
    return response.data.data.sort((a, b) => a.sort_order - b.sort_order);
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw new Error('Failed to load team members');
  }
} 