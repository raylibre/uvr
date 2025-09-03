import apiClient from './api-client';
import {
  FUNCTIONS_V1_REGION_CONTACTS,
  FUNCTIONS_V1_REGION_DETAILS,
  FUNCTIONS_V1_REGION_NEWS,
  FUNCTIONS_V1_REGION_OTG,
  FUNCTIONS_V1_LEADERSHIP_APPLICATION
} from '~/constants/url-constants';

export interface RegionDetailsResponse {
  success: boolean;
  data: {
    region: {
      id: string;
      name_en: string;
      name_ua: string;
      description?: string;
      contacts?: any;
      created_at?: string;
      updated_at?: string;
    };
    leadership: Array<any>;
    statistics: any;
    meta?: any;
  };
}

export async function getRegionDetails(regionId: string): Promise<RegionDetailsResponse> {
  const response = await apiClient.get(FUNCTIONS_V1_REGION_DETAILS, {
    params: { region_id: regionId }
  });
  return response.data as RegionDetailsResponse;
}

export async function getRegionContacts(regionId: string): Promise<any> {
  const response = await apiClient.get(FUNCTIONS_V1_REGION_CONTACTS, {
    params: { region_id: regionId }
  });
  return response.data;
}

export async function getRegionNews(regionId: string, limit = 5, offset = 0): Promise<any> {
  const response = await apiClient.get(FUNCTIONS_V1_REGION_NEWS, {
    params: { region_id: regionId, limit, offset }
  });
  return response.data;
}

export async function getRegionOtg(regionId: string): Promise<any> {
  const response = await apiClient.get(FUNCTIONS_V1_REGION_OTG, {
    params: { region_id: regionId }
  });
  return response.data;
}

export interface LeadershipApplicationPayload {
  region_id: string;
  user_id: string;
  desired_role: string;
  experience: string;
  motivation_letter: string;
}

export async function submitLeadershipApplication(payload: LeadershipApplicationPayload): Promise<any> {
  const response = await apiClient.post(FUNCTIONS_V1_LEADERSHIP_APPLICATION, payload);
  return response.data;
}
