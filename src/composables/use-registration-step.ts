import { ref, reactive } from 'vue';
import type { UserProfile } from '~/types/user';

export interface ValidationRule {
  validate: (value: any, formData?: Partial<UserProfile>) => boolean | Promise<boolean>;
  message: string;
}

export interface FieldValidation {
  [key: string]: ValidationRule[];
}
// TODO: review use
export const useRegistrationStep = (stepFields: (keyof UserProfile)[], validationRules: FieldValidation) => {
  const errors = reactive<Record<string, string>>({});
  const isValidating = ref(false);

  const validateField = async (field: keyof UserProfile, value: any, formData: Partial<UserProfile>): Promise<boolean> => {
    const fieldRules = validationRules[field];
    if (!fieldRules) return true;

    for (const rule of fieldRules) {
      try {
        const isValid = await rule.validate(value, formData);
        if (!isValid) {
          errors[field] = rule.message;
          return false;
        }
      } catch (error) {
        errors[field] = 'Validation error occurred';
        return false;
      }
    }

    delete errors[field];
    return true;
  };

  const validate = async (formData: Partial<UserProfile>): Promise<boolean> => {
    isValidating.value = true;
    let isValid = true;

    try {
      for (const field of stepFields) {
        if (!(await validateField(field, formData[field], formData))) {
          isValid = false;
        }
      }
    } finally {
      isValidating.value = false;
    }

    return isValid;
  };

  const clearErrors = () => {
    Object.keys(errors).forEach(key => delete errors[key]);
  };

  return {
    errors,
    isValidating,
    validate,
    validateField,
    clearErrors
  };
}; 