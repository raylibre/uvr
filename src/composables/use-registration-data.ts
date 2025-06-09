import { ref, reactive } from 'vue';
import type { UserProfile, RegistrationStep } from '~/types/user';
import { REGISTRATION_STEPS } from '~/constants/registration-constants';

export const useRegistrationData = () => {
  const formData = reactive<Partial<UserProfile>>({
    notifications_enabled: true,
    email_notifications: true,
    sms_notifications: true
  });

  const currentStep = ref(1);
  const isLoading = ref(false);
  const steps = reactive<RegistrationStep[]>([...REGISTRATION_STEPS]);

  const setStepData = (stepData: Partial<UserProfile>) => {
    Object.assign(formData, stepData);
  };

  const resetForm = () => {
    Object.assign(formData, {
      notifications_enabled: true,
      email_notifications: true,
      sms_notifications: true
    });
    currentStep.value = 1;
    steps.forEach((step: RegistrationStep) => step.isCompleted = false);
  };

  const getFormData = (): Partial<UserProfile> => {
    return { ...formData };
  };

  return {
    formData,
    currentStep,
    isLoading,
    steps,
    setStepData,
    resetForm,
    getFormData
  };
}; 