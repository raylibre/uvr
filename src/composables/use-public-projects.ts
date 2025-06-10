import { reactive, computed, onBeforeUnmount } from 'vue';
import AsyncSource from 'async-source';
import type { PublicProject, PublicProjectsResponse } from '~/interfaces/project.interface';
import { fetchPublicProjects, fetchFeaturedProjects } from '~/services/api/projects-api-service';
import { getSharedAsyncSource, removeSharedAsyncSource } from '~/services/async-source-service';
import { handleApiError } from '~/services/notification-service';

export function usePublicProjects(limit?: number, offset?: number, featured?: boolean) {
  // Create shared AsyncSource for public projects data with parameters
  const sourceKey = `publicProjects_${limit || 'all'}_${offset || 0}_${featured || 'any'}`;
  
  const publicProjectsSource = getSharedAsyncSource(
    sourceKey,
    () => fetchPublicProjects(limit, offset, featured),
    handleApiError
  );

  const featuredProjectsSource = reactive(new AsyncSource(fetchFeaturedProjects, handleApiError));

  // Computed properties for accessing data
  const publicProjectsData = computed(() => publicProjectsSource.data as PublicProjectsResponse | null);
  const projects = computed(() => publicProjectsData.value?.data.projects || []);
  const meta = computed(() => publicProjectsData.value?.data.meta || null);
  const featuredProjects = computed(() => featuredProjectsSource.data || projects.value.filter(project => project.is_featured));
  
  // Loading states
  const isLoading = computed(() => publicProjectsSource.isLoading);
  const isFeaturedLoading = computed(() => featuredProjectsSource.isLoading);
  const error = computed(() => publicProjectsSource.error);

  // Methods to fetch data
  function loadPublicProjects(): void {
    publicProjectsSource.push(handlePublicProjectsSuccess);
  }

  function loadFeaturedProjects(): void {
    featuredProjectsSource.push(handleFeaturedProjectsSuccess);
  }

  // Success handlers
  function handlePublicProjectsSuccess(data: PublicProjectsResponse) {
    console.log('Public projects loaded successfully:', data.data.meta.total, 'projects');
  }

  function handleFeaturedProjectsSuccess(data: PublicProject[]) {
    console.log('Featured projects loaded successfully:', data.length, 'projects');
  }

  // Utility methods
  function getProjectBySlug(slug: string): PublicProject | undefined {
    return projects.value.find(project => project.slug === slug);
  }

  function getProjectById(id: number): PublicProject | undefined {
    return projects.value.find(project => project.id === id);
  }

  function getProjectsByType(type: string): PublicProject[] {
    return projects.value.filter(project => project.project_type === type);
  }

  // Cleanup shared AsyncSource on unmount
  onBeforeUnmount(() => {
    removeSharedAsyncSource(sourceKey, () => fetchPublicProjects(limit, offset, featured));
  });

  return {
    // Data
    projects,
    meta,
    featuredProjects,
    publicProjectsData,
    
    // Loading states
    isLoading,
    isFeaturedLoading,
    error,
    
    // Methods
    loadPublicProjects,
    loadFeaturedProjects,
    getProjectBySlug,
    getProjectById,
    getProjectsByType,
    
    // Legacy method for backward compatibility
    fetchPublicProjects: loadPublicProjects
  };
} 