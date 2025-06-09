import type { HomePageData } from '~/interfaces/home';
import { getTeamMembers } from './team-api-service';
import { getPublicProjects } from './projects-api-service';
import { transformTeamMembersToRepresentatives } from '~/utils/team-utils';
import { transformPublicProjectsToPrograms, getFeaturedPublicProjects } from '~/utils/projects-utils';

export async function getHomePageData(): Promise<HomePageData> {
  try {
    // Fetch real team data and public projects
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
      newsItems: [
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
      ]
    };
  } catch (error) {
    console.error('Error loading home page data:', error);
    // Fallback to mock data if API fails
    return getFallbackHomePageData();
  }
}

function getFallbackHomePageData(): HomePageData {
  return {
    programs: [
      {
        id: 1,
        title: 'Medical Support',
        description: 'Access to medical care and rehabilitation services',
        image: '/src/assets/images/programs/program1.jpg'
      },
      {
        id: 2,
        title: 'Mental Health',
        description: 'Professional psychological support and counseling',
        image: '/src/assets/images/programs/program2.jpg'
      },
      {
        id: 3,
        title: 'Career Development',
        description: 'Job training and employment assistance',
        image: '/src/assets/images/programs/program3.jpg'
      },
      {
        id: 4,
        title: 'Family Support',
        description: 'Resources and assistance for veterans\' families',
        image: '/src/assets/images/programs/program4.jpg'
      }
    ],
    representatives: [
      {
        id: 1,
        name: 'Oleksandr Petrenko',
        position: 'Executive Director',
        image: '/src/assets/images/representatives/rep1.jpg'
      },
      {
        id: 2,
        name: 'Maria Kovalenko',
        position: 'Medical Program Director',
        image: '/src/assets/images/representatives/rep2.jpg'
      },
      {
        id: 3,
        name: 'Ivan Sydorenko',
        position: 'Veteran Relations',
        image: '/src/assets/images/representatives/rep3.jpg'
      },
      {
        id: 4,
        name: 'Natalia Melnyk',
        position: 'Community Outreach',
        image: '/src/assets/images/representatives/rep4.jpg'
      }
    ],
    newsItems: [
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
    ]
  };
} 