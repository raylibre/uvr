export interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
  client: string;
  duration: string;
  status: 'Completed' | 'In Progress' | 'Planned';
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
}

export interface ProjectsListProps {
  projects: Project[];
  onViewDetails: (id: number) => void;
} 