import apiClient from './api-client';
import type { 
  PublicProjectsResponse, 
  ProgramDetailResponse, 
  JoinProgramRequest, 
  JoinProgramResponse,
  UserParticipation
} from '~/interfaces/project.interface';
import { FUNCTIONS_V1_PUBLIC_PROJECTS } from '~/constants/url-constants';
import { 
  MOCK_PROGRAMS, 
  generateMockParticipation, 
  shouldHaveParticipation 
} from '~/constants/mock/mock-data-constants';
import { ParticipationStatus } from '~/constants/status-constants';

/**
 * Fetch public projects from API
 * This function is used with AsyncSource for proper loading states and error handling
 */
export async function fetchPublicProjects(): Promise<PublicProjectsResponse> {
  const response = await apiClient.get<PublicProjectsResponse>(FUNCTIONS_V1_PUBLIC_PROJECTS);
  return response.data;
}

/**
 * Fetch program detail by slug
 * This function is used with AsyncSource for proper loading states and error handling
 */
export async function fetchProgramDetail(slug: string): Promise<ProgramDetailResponse> {
  // TODO: Replace with actual API call when backend is ready
  // const response = await apiClient.get<ProgramDetailResponse>(`${API_V1_PROJECTS}/${slug}`);
  // return response.data;
  
  // For now, using mock data as requested
  return getMockProgramDetail(slug);
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
 * Fetch user program participation status
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
  return fetchProgramDetail(slug);
}

export async function joinProgram(request: JoinProgramRequest): Promise<JoinProgramResponse> {
  return submitProgramJoin(request);
}

export async function getUserProgramStatus(programId: number): Promise<UserParticipation | null> {
  return fetchUserProgramStatus(programId);
}

// Mock data functions (to be replaced with real API calls)
function getMockProgramDetail(slug: string): ProgramDetailResponse {
  const program = MOCK_PROGRAMS[slug];
  if (!program) {
    throw new Error(`Program with slug "${slug}" not found`);
  }

  // Mock user participation (simulate different scenarios)
  const mockParticipation = Math.random() > 0.7 ? {
    id: 1,
    user_id: 123,
    project_id: program.id,
    status: ParticipationStatus.APPROVED,
    applied_at: '2025-06-01T10:00:00.000Z',
    approved_at: '2025-06-02T14:30:00.000Z',
    completed_at: null,
    notes: 'Заявка схвалена. Очікуйте на дзвінок координатора програми.'
  } : null;

  return {
    success: true,
    data: {
      program,
      user_participation: mockParticipation
    }
  };
}

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