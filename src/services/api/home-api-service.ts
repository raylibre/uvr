import apiClient from './api-client';
import type { HomePageData } from '~/interfaces/home';
import { getTeamMembers } from './team-api-service';
import { getPublicProjects } from './projects-api-service';
import { transformTeamMembersToRepresentatives } from '~/utils/team-utils';
import { transformPublicProjectsToPrograms, getFeaturedPublicProjects } from '~/utils/projects-utils';
import { API_V1_HOME_DATA } from '~/constants/url-constants';

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
    const [teamMembers, publicProjectsResponse] = await Promise.all([
      getTeamMembers(),
      getPublicProjects()
    ]);
    
    const representatives = transformTeamMembersToRepresentatives(teamMembers);
    
    // Get featured projects or all projects if no featured ones
    const featuredProjects = getFeaturedPublicProjects(publicProjectsResponse.data.projects);
    const projectsToShow = featuredProjects.length > 0 ? featuredProjects : publicProjectsResponse.data.projects.slice(0, 4);
    const programs = transformPublicProjectsToPrograms(projectsToShow);

    return {
      programs,
      representatives,
      newsItems: getNewsItems()
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
 * Currently returns mock data - replace with real API call
 */
export async function fetchNewsItems(): Promise<any[]> {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.get('/api/v1/news');
    // return response.data;
    
    // Mock data for now
    return getNewsItems();
  } catch (error) {
    console.error('Error fetching news items:', error);
    throw error;
  }
}

/**
 * Get mock news items (to be replaced with API call)
 */
function getNewsItems() {
  return [
    {
      id: 1,
      title: 'New Rehabilitation Center Opening',
      excerpt: 'We are excited to announce the opening of our new rehabilitation center in Kyiv',
      date: '2024-03-15',
      image: '/src/assets/images/news/news1.jpg'
    },
    {
      id: 2,
      title: 'Job Fair for Veterans',
      excerpt: 'Join us for our monthly job fair connecting veterans with potential employers',
      date: '2024-03-10',
      image: '/src/assets/images/news/news2.jpg'
    },
    {
      id: 3,
      title: 'Family Support Program Launch',
      excerpt: 'New program launched to provide comprehensive support for veterans\' families',
      date: '2024-03-05',
      image: '/src/assets/images/news/news3.jpg'
    }
  ];
}

// Legacy function for backward compatibility - remove after refactoring all usages
export async function getHomePageData(): Promise<HomePageData> {
  return fetchHomePageData();
} 