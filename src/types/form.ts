import type { ObjectSchema } from 'yup';

export interface FormFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rules?: ValidationRule;
  rows?: number;
  id: string;
}

export interface FormProps {
  schema: ObjectSchema<Record<string, unknown>>;
  submitDelay?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  subscribe: boolean;
}

export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  email?: boolean;
  pattern?: RegExp;
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
}

export interface FormErrors {
  [key: string]: string;
} 