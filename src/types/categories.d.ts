export interface Category {
  id: string;
  name: string;
  description: string;
  requiredDocuments: RequiredDocument[];
}

export interface RequiredDocument {
  type: string;
  maxSize: number; // in bytes
  allowedTypes: string[]; // e.g., ['image/jpeg', 'application/pdf']
} 