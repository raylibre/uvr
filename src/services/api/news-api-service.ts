import apiClient from './api-client';
import type { NewsListResponse, NewsItem } from '~/interfaces/home';
import { FUNCTIONS_V1_NEWS_LIST, FUNCTIONS_V1_NEWS_ARTICLE } from '~/constants/url-constants';
import { NEWS_PAGINATION } from '~/constants/news-constants';

/**
 * Get news list with optional filters and pagination
 */
export async function getNewsList(params?: {
  limit?: number;
  offset?: number;
  category?: 'general' | 'project_related';
}): Promise<NewsListResponse> {
  try {
    const response = await apiClient.get(FUNCTIONS_V1_NEWS_LIST, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching news list:', error);
    throw error;
  }
}

/**
 * Get news for home page (limited to home page limit, no pagination)
 */
export async function getHomePageNews(): Promise<NewsItem[]> {
  try {
    const response = await getNewsList({ limit: NEWS_PAGINATION.HOME_PAGE_LIMIT, offset: 0 });
    return response.news;
  } catch (error) {
    console.error('Error fetching home page news:', error);
    throw error;
  }
}

/**
 * Get news article by ID
 */
export async function getNewsArticle(id: number): Promise<NewsItem> {
  try {
    const response = await apiClient.get(FUNCTIONS_V1_NEWS_ARTICLE, {
      params: { id }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news article:', error);
    throw error;
  }
} 