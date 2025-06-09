import { AxiosResponse } from 'axios';
import apiClient from './api-client';
import type { Category } from '~/types/categories';

export class CategoriesApiService {
  private static readonly BASE_PATH = '/api/categories';

  /**
   * Get all available categories
   */
  static async getCategories(): Promise<Category[]> {
    const response: AxiosResponse<Category[]> = await apiClient.get(this.BASE_PATH);
    return response.data;
  }
} 