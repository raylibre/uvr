import type { ObjectSchema } from 'yup';

export interface FormFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rules?: string | object | Function;
  rows?: number;
  id: string;
}

export interface FormProps {
  schema: ObjectSchema<any>;
  submitDelay?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  subscribe: boolean;
} 