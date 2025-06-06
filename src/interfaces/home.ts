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
  image: string;
}

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

export interface HomePageData {
  programs: Program[];
  representatives: Representative[];
  newsItems: NewsItem[];
} 