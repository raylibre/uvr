export interface Program {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Representative {
  id: number;
  name: string;
  position: string;
  image: string | null;
  bio?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  short_description: string;
  featured_image_url: string;
  category: 'general' | 'project_related';
  published_at: string;
  author_name: string;
  views_count: number;
  related_project_id: number | null;
  related_project_title: string | null;
}

export interface NewsListResponse {
  news: NewsItem[];
  pagination: {
    limit: number;
    offset: number;
    has_more: boolean;
    total_returned: number;
  };
  filters: {
    category: string | null;
  };
}

export interface HomePageData {
  programs: Program[];
  representatives: Representative[];
  newsItems: NewsItem[];
} 