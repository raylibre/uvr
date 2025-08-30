import { computed } from 'vue';
import { useEventBus } from './use-event-bus';
import { useUserStore } from './use-user-store';
import { useRegistrationData } from './use-registration-data';
import { useTranslation } from './use-translation';
import { EVENTS } from '~/constants/event-bus-constants';
import type { UserProfile } from '~/types/user.d';

export const useRegistrationForm = () => {
  const { T_KEYS } = useTranslation();
  const { register } = useUserStore();
  const { BUS } = useEventBus();
  const {
    formData,
    currentStep,
    isLoading,
    steps,
    validateCurrentStep,
    nextStep,
    previousStep,
    goToStep,
    resetForm,
    isStepValid,
    getCurrentStepForm,
    canNavigateToStep
  } = useRegistrationData();

  const totalSteps = computed(() => steps.length);

  const submitButtonText = computed(() => {
    return currentStep.value < totalSteps.value ? T_KEYS.COMMON.BUTTONS.CONTINUE : T_KEYS.AUTH.REGISTER.COMPLETE_REGISTRATION;
  });

  const canGoToNextStep = computed(() => {
    return currentStep.value < totalSteps.value;
  });

  const canGoToPreviousStep = computed(() => {
    return currentStep.value > 1;
  });

  const handleSubmit = async (): Promise<boolean> => {
    try {
      isLoading.value = true;

      // Validate all steps before submitting
      let allStepsValid = true;
      for (let i = 1; i <= totalSteps.value; i++) {
        if (!isStepValid(i)) {
          allStepsValid = false;
          break;
        }
      }

      if (!allStepsValid) {
        BUS.emit(EVENTS.FAILED_REGISTER, { error: 'Please complete all required fields in all steps' });
        return false;
      }

      // Get the final form data
      const registrationData = formData.value as Required<UserProfile>;
      await register(registrationData);

      BUS.emit(EVENTS.SUCCESS_REGISTER, {});
      resetForm();
      return true;
    } catch (error) {
      if (error instanceof Error) {
        BUS.emit(EVENTS.FAILED_REGISTER, { error: error.message });
      }
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const handleNextStep = async (): Promise<boolean> => {
    if (canGoToNextStep.value) {
      return await nextStep();
    }
    return false;
  };

  const handlePreviousStep = () => {
    if (canGoToPreviousStep.value) {
      previousStep();
    }
  };

  const handleStepClick = (stepId: number) => {
    goToStep(stepId);
  };

  const handleFormSubmit = async (): Promise<boolean> => {
    if (canGoToNextStep.value) {
      return await handleNextStep();
    } else {
      return await handleSubmit();
    }
  };

  return {
    // State
    formData,
    currentStep,
    isLoading,
    steps,
    totalSteps,

    // Computed
    submitButtonText,
    canGoToNextStep,
    canGoToPreviousStep,

    // Validation
    validateCurrentStep,
    getCurrentStepForm,
    isStepValid,

    // Actions
    handleSubmit,
    handleNextStep,
    handlePreviousStep,
    handleStepClick,
    handleFormSubmit,
    resetForm,
    goToStep,
    previousStep,
    canNavigateToStep
  };
};