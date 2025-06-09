import { reactive, watch } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

// Step-specific form interfaces
interface StepOneForm {
  first_name: string;
  last_name: string;
  patronymic?: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

interface StepTwoForm {
  date_of_birth: string;
  region: string;
  city: string;
  category: string;
  bio?: string;
}

interface StepThreeForm {
  address: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
}

interface StepFourForm {
  notifications_enabled: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
}

interface StepFiveForm {
  terms: boolean;
}

// Combined form data interface
interface AllFormData extends StepOneForm, StepTwoForm, StepThreeForm, StepFourForm, StepFiveForm {}

// Validation schemas for each step
const stepOneSchema = yup.object({
  first_name: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
  last_name: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
  patronymic: yup.string().optional(),
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
  phone: yup.string().required('Phone number is required').matches(/^[+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  password_confirmation: yup.string()
    .required('Password confirmation is required')
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    })
});

const stepTwoSchema = yup.object({
  date_of_birth: yup.string().required('Date of birth is required'),
  region: yup.string().required('Region is required'),
  city: yup.string().required('City is required'),
  category: yup.string().required('Category is required'),
  bio: yup.string().optional()
});

const stepThreeSchema = yup.object({
  address: yup.string().required('Address is required').min(10, 'Please provide a complete address'),
  emergency_contact_name: yup.string().required('Emergency contact name is required').min(2, 'Name must be at least 2 characters'),
  emergency_contact_phone: yup.string().required('Emergency contact phone is required').matches(/^[+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
});

const stepFourSchema = yup.object({
  notifications_enabled: yup.boolean().default(true),
  email_notifications: yup.boolean().default(false),
  sms_notifications: yup.boolean().default(false)
});

const stepFiveSchema = yup.object({
  terms: yup.boolean().required().oneOf([true], 'You must accept the terms and conditions')
});

// Global persistent data storage - this maintains data across navigation
const globalPersistentData = reactive<Partial<AllFormData>>({
  // Step 1 defaults
  first_name: '',
  last_name: '',
  patronymic: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  
  // Step 2 defaults
  date_of_birth: '',
  region: '',
  city: '',
  category: '',
  bio: '',
  
  // Step 3 defaults
  address: '',
  emergency_contact_name: '',
  emergency_contact_phone: '',
  
  // Step 4 defaults
  notifications_enabled: true,
  email_notifications: false,
  sms_notifications: false,
  
  // Step 5 defaults
  terms: false
});

// Helper function to get initial values for a step from persistent data
const getStepInitialValues = (step: number): Record<string, unknown> => {
  const stepFields = {
    1: ['first_name', 'last_name', 'patronymic', 'email', 'phone', 'password', 'password_confirmation'],
    2: ['date_of_birth', 'region', 'city', 'category', 'bio'],
    3: ['address', 'emergency_contact_name', 'emergency_contact_phone'],
    4: ['notifications_enabled', 'email_notifications', 'sms_notifications'],
    5: ['terms']
  };

  const fields = stepFields[step as keyof typeof stepFields] || [];
  const initialValues: Record<string, unknown> = {};
  
  fields.forEach(field => {
    initialValues[field] = globalPersistentData[field as keyof typeof globalPersistentData];
  });
  
  return initialValues;
};

// Global shared form state - created once and reused across all components
const globalFormState = reactive({
  step1: useForm<StepOneForm>({ 
    validationSchema: stepOneSchema,
    validateOnMount: false,
    initialValues: getStepInitialValues(1) as unknown as StepOneForm
  }),
  step2: useForm<StepTwoForm>({ 
    validationSchema: stepTwoSchema,
    validateOnMount: false,
    initialValues: getStepInitialValues(2) as unknown as StepTwoForm
  }),
  step3: useForm<StepThreeForm>({ 
    validationSchema: stepThreeSchema,
    validateOnMount: false,
    initialValues: getStepInitialValues(3) as unknown as StepThreeForm
  }),
  step4: useForm<StepFourForm>({ 
    validationSchema: stepFourSchema,
    validateOnMount: false,
    initialValues: getStepInitialValues(4) as unknown as StepFourForm
  }),
  step5: useForm<StepFiveForm>({ 
    validationSchema: stepFiveSchema,
    validateOnMount: false,
    initialValues: getStepInitialValues(5) as unknown as StepFiveForm
  })
});

// Watch for changes in form values and sync to persistent storage
const setupFormWatchers = () => {
  // Watch step 1 form values
  watch(() => globalFormState.step1.values, (newValues) => {
    Object.assign(globalPersistentData, newValues);
  }, { deep: true });

  // Watch step 2 form values
  watch(() => globalFormState.step2.values, (newValues) => {
    Object.assign(globalPersistentData, newValues);
  }, { deep: true });

  // Watch step 3 form values
  watch(() => globalFormState.step3.values, (newValues) => {
    Object.assign(globalPersistentData, newValues);
  }, { deep: true });

  // Watch step 4 form values
  watch(() => globalFormState.step4.values, (newValues) => {
    Object.assign(globalPersistentData, newValues);
  }, { deep: true });

  // Watch step 5 form values
  watch(() => globalFormState.step5.values, (newValues) => {
    Object.assign(globalPersistentData, newValues);
  }, { deep: true });
};

// Setup watchers immediately
setupFormWatchers();

export const useRegistrationValidation = () => {
  // Helper functions that operate on the global state
  const getStepForm = (step: number) => {
    const stepKey = `step${step}` as keyof typeof globalFormState;
    return globalFormState[stepKey];
  };

  const validateStep = async (step: number): Promise<boolean> => {
    const form = getStepForm(step);
    const result = await form.validate();
    return result.valid;
  };

  const getFormValues = () => {
    return { ...globalPersistentData };
  };

  const getStepValues = (step: number) => {
    const form = getStepForm(step);
    return form.values;
  };

  const setStepValues = (step: number, values: Record<string, unknown>): void => {
    const form = getStepForm(step);
    form.setValues(values as never);
    // Also update persistent data
    Object.assign(globalPersistentData, values);
  };

  // Sync current form values to persistent storage (call this before navigation)
  const syncCurrentStepToPersistentData = (step: number): void => {
    const form = getStepForm(step);
    Object.assign(globalPersistentData, form.values);
  };

  // Sync persistent data to form (call this after navigation)
  const syncPersistentDataToCurrentStep = (step: number): void => {
    const form = getStepForm(step);
    const stepInitialValues = getStepInitialValues(step);
    
    // Use setValues with silent option to prevent validation triggering
    form.setValues(stepInitialValues as never, false);
  };

  // Validate step and return validation result (for sidebar status)
  const validateStepForCompletion = async (step: number): Promise<boolean> => {
    const form = getStepForm(step);
    
    // First sync current values to persistent storage
    syncCurrentStepToPersistentData(step);
    
    // Get the validation schema for this step
    const schemas = {
      1: stepOneSchema,
      2: stepTwoSchema, 
      3: stepThreeSchema,
      4: stepFourSchema,
      5: stepFiveSchema
    };
    
    const schema = schemas[step as keyof typeof schemas];
    if (!schema) return false;
    
    try {
      // Validate the current form values directly with yup schema
      await schema.validate(form.values, { abortEarly: false });
      return true;
    } catch (error) {
      return false;
    }
  };

  const resetStep = (step: number): void => {
    const form = getStepForm(step);
    form.resetForm();
    
    // Also clear persistent data for this step
    const stepFields = {
      1: ['first_name', 'last_name', 'patronymic', 'email', 'phone', 'password', 'password_confirmation'],
      2: ['date_of_birth', 'region', 'city', 'category', 'bio'],
      3: ['address', 'emergency_contact_name', 'emergency_contact_phone'],
      4: ['notifications_enabled', 'email_notifications', 'sms_notifications'],
      5: ['terms']
    };
    
    const fields = stepFields[step as keyof typeof stepFields] || [];
    fields.forEach(field => {
      if (field === 'notifications_enabled') {
        (globalPersistentData as any)[field] = true;
      } else if (field === 'terms' || field === 'email_notifications' || field === 'sms_notifications') {
        (globalPersistentData as any)[field] = false;
      } else {
        (globalPersistentData as any)[field] = '';
      }
    });
  };

  const resetAllForms = (): void => {
    Object.values(globalFormState).forEach(form => {
      form.resetForm();
    });
    
    // Reset persistent data to defaults
    Object.assign(globalPersistentData, {
      first_name: '',
      last_name: '',
      patronymic: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      date_of_birth: '',
      region: '',
      city: '',
      category: '',
      bio: '',
      address: '',
      emergency_contact_name: '',
      emergency_contact_phone: '',
      notifications_enabled: true,
      email_notifications: false,
      sms_notifications: false,
      terms: false
    });
  };

  const getStepErrors = (step: number) => {
    const form = getStepForm(step);
    return form.errors;
  };

  const isStepValid = (step: number): boolean => {
    const form = getStepForm(step);
    return form.meta.valid;
  };

  // Debug helper to verify global state (development only)
  const debugGlobalState = () => {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('🌍 Global Form State Debug:', {
        persistent_data: globalPersistentData,
        step1_values: globalFormState.step1.values,
        step2_values: globalFormState.step2.values,
        step3_values: globalFormState.step3.values,
        step4_values: globalFormState.step4.values,
        step5_values: globalFormState.step5.values,
        step1_errors: globalFormState.step1.errors,
        step3_errors: globalFormState.step3.errors,
        instance_id: Math.random().toString(36).substr(2, 9) // To verify it's the same instance
      });
    }
  };

  return {
    // Return the global shared state
    formState: globalFormState,
    persistentData: globalPersistentData,
    getStepForm,
    validateStep,
    validateStepForCompletion,
    getFormValues,
    getStepValues,
    setStepValues,
    syncCurrentStepToPersistentData,
    syncPersistentDataToCurrentStep,
    resetStep,
    resetAllForms,
    getStepErrors,
    isStepValid,
    debugGlobalState
  };
}; 