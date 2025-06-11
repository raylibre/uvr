import type { HomePageData } from '~/interfaces/home';
import { getTeamMembers } from './team-api-service';
import { getPublicProjects } from './projects-api-service';
import { getHomePageNews } from './news-api-service';
import { transformTeamMembersToRepresentatives } from '~/utils/team-utils';
import { transformPublicProjectsToPrograms, getFeaturedPublicProjects } from '~/utils/projects-utils';

/**
 * Fetch home page data from API
 * This function is used with AsyncSource for proper loading states and error handling
 */
export async function fetchHomePageData(): Promise<HomePageData> {
  try {
    // Try to fetch from dedicated home API endpoint first
    // const response = await apiClient.get(API_V1_HOME_DATA);
    // return response.data;
    
    // Fallback to composing data from multiple endpoints
    const [teamMembers, newsItems] = await Promise.all([
      getTeamMembers(),
      getHomePageNews()
    ]);
    
    const representatives = transformTeamMembersToRepresentatives(teamMembers);

    return {
      representatives,
      newsItems
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    throw error;
  }
}

/**
 * Fetch featured programs from API
 */
export async function fetchFeaturedPrograms(): Promise<any[]> {
  try {
    const publicProjectsResponse = await getPublicProjects();
    const featuredProjects = getFeaturedPublicProjects(publicProjectsResponse.data.projects);
    const projectsToShow = featuredProjects.length > 0 ? featuredProjects : publicProjectsResponse.data.projects.slice(0, 4);
    return transformPublicProjectsToPrograms(projectsToShow);
  } catch (error) {
    console.error('Error fetching featured programs:', error);
    throw error;
  }
}

/**
 * Fetch representatives from API
 */
export async function fetchRepresentatives(): Promise<any[]> {
  try {
    const teamMembers = await getTeamMembers();
    return transformTeamMembersToRepresentatives(teamMembers);
  } catch (error) {
    console.error('Error fetching representatives:', error);
    throw error;
  }
}

/**
 * Fetch news items from API
 */
export async function fetchNewsItems(): Promise<any[]> {
  try {
    return await getHomePageNews();
  } catch (error) {
    console.error('Error fetching news items:', error);
    throw error;
  }
}

// Legacy function for backward compatibility - remove after refactoring all usages
export async function getHomePageData(): Promise<HomePageData> {
  return fetchHomePageData();
} 