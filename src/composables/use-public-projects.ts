import { ref, computed } from 'vue';
import type { PublicProject, PublicProjectsResponse } from '~/interfaces/project.interface';
import { getPublicProjects } from '~/services/api/projects-api-service';

const publicProjectsData = ref<PublicProjectsResponse | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

export function usePublicProjects() {
  const projects = computed(() => publicProjectsData.value?.data.projects || []);
  const meta = computed(() => publicProjectsData.value?.data.meta || null);
  const featuredProjects = computed(() => projects.value.filter(project => project.is_featured));
  
  async function fetchPublicProjects(): Promise<void> {
    if (isLoading.value) return;
    
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await getPublicProjects();
      publicProjectsData.value = response;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch public projects';
      console.error('Error fetching public projects:', err);
    } finally {
      isLoading.value = false;
    }
  }

  function getProjectBySlug(slug: string): PublicProject | undefined {
    return projects.value.find(project => project.slug === slug);
  }

  function getProjectById(id: number): PublicProject | undefined {
    return projects.value.find(project => project.id === id);
  }

  function getProjectsByType(type: string): PublicProject[] {
    return projects.value.filter(project => project.project_type === type);
  }

  return {
    projects,
    meta,
    featuredProjects,
    isLoading,
    error,
    fetchPublicProjects,
    getProjectBySlug,
    getProjectById,
    getProjectsByType
  };
} 