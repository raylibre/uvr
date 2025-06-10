import apiClient from './api-client';
import type { 
  PublicProjectsResponse, 
  ProgramDetailResponse, 
  JoinProgramRequest, 
  JoinProgramResponse,
  UserParticipation,
  ProgramDetail,
  UserProjectStatusResponse
} from '~/interfaces/project.interface';
import { FUNCTIONS_V1_PUBLIC_PROJECTS, FUNCTIONS_V1_PROJECT_BY_SLUG, FUNCTIONS_V1_USER_PROJECT_STATUS } from '~/constants/url-constants';
import { 
  generateMockParticipation,
  shouldHaveParticipation 
} from '~/constants/mock/mock-data-constants';
import { ParticipationStatus } from '~/constants/status-constants';

/**
 * Fetch public projects from API with optional pagination
 * This function is used with AsyncSource for proper loading states and error handling
 */
export async function fetchPublicProjects(limit?: number, offset?: number, featured?: boolean): Promise<PublicProjectsResponse> {
  const params = new URLSearchParams();
  
  if (limit !== undefined) {
    params.append('limit', limit.toString());
  }
  
  if (offset !== undefined) {
    params.append('offset', offset.toString());
  }
  
  if (featured !== undefined) {
    params.append('featured', featured.toString());
  }
  
  const queryString = params.toString();
  const url = queryString ? `${FUNCTIONS_V1_PUBLIC_PROJECTS}?${queryString}` : FUNCTIONS_V1_PUBLIC_PROJECTS;
  
  const response = await apiClient.get<PublicProjectsResponse>(url);
  return response.data;
}

/**
 * Fetch program detail by slug using actual API
 * This function is used with AsyncSource for proper loading states and error handling
 */
export async function fetchProgramDetail(slug: string): Promise<ProgramDetail> {
  const response = await apiClient.get<ProgramDetail>(`${FUNCTIONS_V1_PROJECT_BY_SLUG}?slug=${slug}`);
  return response.data;
}

/**
 * Fetch user project status using actual API
 * This function is used with AsyncSource for proper loading states and error handling
 */
export async function fetchUserProjectStatus(projectId: number): Promise<UserProjectStatusResponse> {
  const response = await apiClient.get<UserProjectStatusResponse>(`${FUNCTIONS_V1_USER_PROJECT_STATUS}?project_id=${projectId}`);
  return response.data;
}

/**
 * Join a program
 * This function is used with AsyncSource for proper loading states and error handling
 */
export async function submitProgramJoin(request: JoinProgramRequest): Promise<JoinProgramResponse> {
  // TODO: Replace with actual API call when backend is ready
  // const response = await apiClient.post<JoinProgramResponse>(`${API_V1_PROJECTS}/join`, request);
  // return response.data;
  
  // For now, using mock response as requested
  return getMockJoinResponse(request);
}

/**
 * Legacy function for backward compatibility - fetch user program participation status
 * This function is used with AsyncSource for proper loading states and error handling
 */
export async function fetchUserProgramStatus(programId: number): Promise<UserParticipation | null> {
  // TODO: Replace with actual API call when backend is ready
  // const response = await apiClient.get<{participation: UserParticipation | null}>(`${API_V1_USER_PROJECTS}/${programId}`);
  // return response.data.participation;
  
  // For now, using mock data as requested
  return getMockUserParticipation(programId);
}

/**
 * Fetch user's programs
 * This function is used with AsyncSource for proper loading states and error handling
 */
export async function fetchUserProjects(): Promise<any[]> {
  // TODO: Replace with actual API call when backend is ready
  // const response = await apiClient.get(API_V1_USER_PROJECTS);
  // return response.data;
  
  // Mock data for now
  return [];
}

/**
 * Fetch featured projects
 * This function is used with AsyncSource for proper loading states and error handling
 */
export async function fetchFeaturedProjects(): Promise<any[]> {
  const response = await fetchPublicProjects();
  return response.data.projects.filter(project => project.is_featured);
}

// Legacy functions for backward compatibility - remove after refactoring all usages
export async function getPublicProjects(): Promise<PublicProjectsResponse> {
  return fetchPublicProjects();
}

export async function getProgramDetail(slug: string): Promise<ProgramDetailResponse> {
  // TODO: Update to use actual API structure when ready
  // For now, adapting the new API response to the old interface
  const program = await fetchProgramDetail(slug);
  return {
    success: true,
    data: {
      program,
      user_participation: null // This will be fetched separately using fetchUserProjectStatus
    }
  };
}

export async function joinProgram(request: JoinProgramRequest): Promise<JoinProgramResponse> {
  return submitProgramJoin(request);
}

export async function getUserProgramStatus(programId: number): Promise<UserParticipation | null> {
  return fetchUserProgramStatus(programId);
}

// Mock data functions (to be replaced with real API calls)
function getMockJoinResponse(request: JoinProgramRequest): Promise<JoinProgramResponse> {
  // Simulate API processing delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const participation = generateMockParticipation(request.project_id, ParticipationStatus.PENDING);
      participation.notes = 'Заявка подана успішно. Очікуйте розгляду протягом 3-5 робочих днів.';

      resolve({
        success: true,
        data: {
          participation
        },
        message: 'Ваша заявка успішно подана! Ми розглянемо її протягом 3-5 робочих днів та зв\'яжемося з вами.'
      });
    }, 1000);
  });
}

function getMockUserParticipation(programId: number): UserParticipation | null {
  if (shouldHaveParticipation()) {
    return generateMockParticipation(programId);
  }
  return null;
} 