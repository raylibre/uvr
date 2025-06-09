import { computed } from 'vue';
import { useEventBus } from './use-event-bus';
import { useAuthStore } from './use-auth-store';
import { useRegistrationData } from './use-registration-data';
import { EVENTS, type EventType } from '~/constants/event-bus-constants';
import type { UserProfile } from '~/types/user.d';

export const useRegistrationForm = () => {
  const { register } = useAuthStore();
  const { BUS } = useEventBus();
  const {
    formData,
    currentStep,
    isLoading,
    steps,
    resetForm
  } = useRegistrationData();

  const totalSteps = computed(() => steps.length);

  const submitButtonText = computed(() => {
    return currentStep.value < totalSteps.value ? 'Continue' : 'Complete Registration';
  });

  const handleSubmit = async () => {
    try {
      isLoading.value = true;
      await register(formData as Required<UserProfile>);
      BUS.emit(EVENTS.SUCCESS_REGISTER as EventType);
      resetForm();
      return true;
    } catch (error) {
      if (error instanceof Error) {
        BUS.emit(EVENTS.FAILED_REGISTER as EventType, { error: error.message });
      }
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const goToStep = (stepId: number) => {
    if (stepId < currentStep.value || steps[stepId - 1].isCompleted) {
      currentStep.value = stepId;
    }
  };

  const nextStep = async () => {
    if (currentStep.value < totalSteps.value) {
      currentStep.value++;
    }
  };

  const previousStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  };

  return {
    formData,
    currentStep,
    isLoading,
    steps,
    totalSteps,
    submitButtonText,
    handleSubmit,
    goToStep,
    nextStep,
    previousStep,
    resetForm
  };
}; 