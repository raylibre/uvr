export interface StepOneData {
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  name: string;
  surname: string;
  middleName: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  region: string;
  city: string;
  howHeard: string;
}

export interface DocumentUpload {
  id: string;
  url: string;
  filename: string;
  categoryId: string;
}

export interface StepTwoData {
  categories: string[];
  documents: DocumentUpload[];
  motivation: string;
  agreementTerms: boolean;
  agreementPrivacy: boolean;
  agreementNewsletter: boolean;
}

export interface RegistrationPayload extends StepOneData {
  categories: string[];
  documents: DocumentUpload[];
  motivation: string;
  agreements: {
    terms: boolean;
    privacy: boolean;
    newsletter: boolean;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
} 