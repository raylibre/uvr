import type { PublicProject } from '~/interfaces/project.interface';
import type { Program } from '~/interfaces/home';

export function transformPublicProjectsToPrograms(publicProjects: PublicProject[]): Program[] {
  return publicProjects.map(project => ({
    id: project.id,
    title: project.title,
    description: project.short_description,
    image: project.featured_image_url || '/src/assets/images/programs/default-program.jpg'
  }));
}

export function getFeaturedPublicProjects(publicProjects: PublicProject[]): PublicProject[] {
  return publicProjects.filter(project => project.is_featured);
} 