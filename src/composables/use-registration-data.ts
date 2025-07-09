import { ref, reactive, computed } from 'vue';
import type { RegistrationStep } from '~/types/user';
import { REGISTRATION_STEPS } from '~/constants/registration-constants';
import { useRegistrationValidation } from './use-registration-validation';

// Global shared registration state - created once and reused across all components
const globalCurrentStep = ref(4);
const globalIsLoading = ref(false);
const globalSteps = reactive<RegistrationStep[]>([...REGISTRATION_STEPS]);

export const useRegistrationData = () => {
  // Initialize validation system (this will return the same global instance)
  const { 
    formState, 
    persistentData,
    getStepForm, 
    validateStep,
    validateStepForCompletion, 
    getFormValues, 
    resetAllForms, 
    setStepValues,
    syncPersistentDataToCurrentStep
  } = useRegistrationValidation();

  // Computed property to get form data from all steps
  const formData = computed(() => getFormValues());

  const validateCurrentStep = async (): Promise<boolean> => {
    try {
      return await validateStep(globalCurrentStep.value);
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  };

  // Helper to trigger validation for all fields in a step
  const triggerStepValidation = async (step: number) => {
    const form = getStepForm(step);
    // Trigger validation for all fields
    await form.validate();
  };

  const nextStep = async (): Promise<boolean> => {
    // Validate current step for completion (this will sync data too)
    const isValid = await validateStepForCompletion(globalCurrentStep.value);
    
    if (isValid && globalCurrentStep.value < globalSteps.length) {
      // Mark current step as completed
      globalSteps[globalCurrentStep.value - 1].isCompleted = true;
      globalCurrentStep.value++;
      
      // Sync persistent data to the new step form (without triggering validation)
      syncPersistentDataToCurrentStep(globalCurrentStep.value);
      
      return true;
    }
    
    // If validation failed, trigger validation with errors showing for user feedback
    if (!isValid) {
      await triggerStepValidation(globalCurrentStep.value);
    }
    
    return false;
  };

  const previousStep = () => {
    if (globalCurrentStep.value > 1) {
      // Validate and update completion status for current step before leaving
      validateStepForCompletion(globalCurrentStep.value).then(isValid => {
        globalSteps[globalCurrentStep.value - 1].isCompleted = isValid;
      });
      
      globalCurrentStep.value--;
      
      // Sync persistent data to the previous step form (without triggering validation)
      syncPersistentDataToCurrentStep(globalCurrentStep.value);
    }
  };

  const goToStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= globalSteps.length) {
      // Allow navigation to:
      // 1. Any previous step (stepNumber < currentStep)
      // 2. Current step (stepNumber === currentStep)
      // 3. Next step if current step is completed (stepNumber === currentStep + 1 && current completed)
      // 4. Any previously completed step (regardless of current position)
      if (stepNumber <= globalCurrentStep.value || 
          globalSteps[stepNumber - 1].isCompleted ||
          (stepNumber === globalCurrentStep.value + 1 && globalSteps[globalCurrentStep.value - 1].isCompleted)) {
        
        // Validate and update completion status for current step before leaving
        validateStepForCompletion(globalCurrentStep.value).then(isValid => {
          globalSteps[globalCurrentStep.value - 1].isCompleted = isValid;
        });
        
        globalCurrentStep.value = stepNumber;
        
        // Sync persistent data to the target step form (without triggering validation)
        syncPersistentDataToCurrentStep(stepNumber);
        
        return true;
      }
    }
    return false;
  };

  const canNavigateToStep = (stepNumber: number): boolean => {
    if (stepNumber < 1 || stepNumber > globalSteps.length) return false;
    
    // Can navigate to:
    // 1. Any previous step (stepNumber < currentStep)
    // 2. Current step (stepNumber === currentStep)
    // 3. Next step if current step is completed (stepNumber === currentStep + 1 && current completed)
    // 4. Any previously completed step (regardless of current position)
    if (stepNumber <= globalCurrentStep.value) return true;
    
    // Can navigate to next step if current step is completed
    if (stepNumber === globalCurrentStep.value + 1 && globalSteps[globalCurrentStep.value - 1].isCompleted) {
      return true;
    }
    
    // Can navigate to any previously completed step
    if (globalSteps[stepNumber - 1].isCompleted) {
      return true;
    }
    
    return false;
  };

  const getStepStatus = (stepNumber: number) => {
    if (stepNumber < 1 || stepNumber > globalSteps.length) return 'invalid';
    
    // If step is completed, it's always accessible
    if (globalSteps[stepNumber - 1].isCompleted) return 'completed';
    
    // Current step is active
    if (stepNumber === globalCurrentStep.value) return 'active';
    
    // Previous steps are available 
    if (stepNumber < globalCurrentStep.value) return 'available';
    
    // Next step is available if current step is completed
    if (stepNumber === globalCurrentStep.value + 1 && globalSteps[globalCurrentStep.value - 1].isCompleted) {
      return 'available';
    }
    
    // All other steps are locked
    return 'locked';
  };

  const resetForm = () => {
    resetAllForms();
    globalCurrentStep.value = 1;
    globalSteps.forEach((step: RegistrationStep) => step.isCompleted = false);
  };

  const getCurrentStepForm = () => {
    return getStepForm(globalCurrentStep.value);
  };

  const isStepValid = (stepNumber: number): boolean => {
    return globalSteps[stepNumber - 1].isCompleted;
  };

  return {
    // State - return global shared state
    formData,
    currentStep: globalCurrentStep,
    isLoading: globalIsLoading,
    steps: globalSteps,
    
    // Validation system
    formState,
    persistentData,
    getCurrentStepForm,
    
    // Actions
    validateCurrentStep,
    nextStep,
    previousStep,
    goToStep,
    resetForm,
    
    // Helpers
    isStepValid,
    getFormValues,
    setStepValues,
    canNavigateToStep,
    getStepStatus
  };
}; 