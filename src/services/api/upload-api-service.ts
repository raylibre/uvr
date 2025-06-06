import { AxiosResponse } from 'axios';
import apiClient from './api-client';

interface UploadResponse {
  id: string;
  url: string;
  filename: string;
}

export class UploadApiService {
  private static readonly BASE_PATH = '/api/upload-documents';

  /**
   * Upload multiple documents
   * @param files - Array of files to upload
   * @param categoryId - Category ID the documents belong to
   */
  static async uploadDocuments(files: File[], categoryId: string): Promise<UploadResponse[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('documents', file));
    formData.append('categoryId', categoryId);

    const response: AxiosResponse<UploadResponse[]> = await apiClient.post(
      this.BASE_PATH,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  }
} 