<template>
  <OModal v-model="isOpen" class="o-register-modal">
    <div class="layout">
      <!-- Left sidebar with steps -->
      <div class="sidebar">
        <div class="header">
          <img src="../../../assets/images/logo.svg" alt="Logo" class="header__logo" />
          <h1 class="header__title">New Account</h1>
        </div>

        <nav class="nav">
          <button
            v-for="step in steps"
            :key="step.id"
            class="step"
            :class="{
              'is-active': currentStep === step.id,
              'is-completed': step.isCompleted
            }"
            @click="goToStep(step.id)"
          >
            <div class="step__content">
              <div class="step__icon">
                <i :class="step.icon"></i>
              </div>
              <div class="step__info">
                <p class="step__title" :class="{
                  'is-active': currentStep === step.id,
                  'is-completed': step.isCompleted,
                  'is-inactive': !step.isCompleted && currentStep !== step.id
                }">
                  {{ step.title }}
                </p>
                <p class="step__description">{{ step.description }}</p>
              </div>
            </div>
          </button>
        </nav>
      </div>

      <!-- Right side content -->
      <div class="content">
        <div class="form">
          <component
            :is="currentStepComponent"
            v-model="formData"
            :errors="errors"
            @validate="validateStep"
            @update:model-value="updateFormData"
          />
        </div>

        <!-- Navigation buttons -->
        <div class="actions">
          <AButton
            v-if="currentStep > 1"
            variant="outline"
            @click="previousStep"
          >
            Back
          </AButton>
          <div class="actions__spacer"></div>
          <AButton
            v-if="currentStep < totalSteps"
            variant="primary"
            :loading="isLoading"
            @click="nextStep"
          >
            Continue
          </AButton>
          <AButton
            v-else
            variant="primary"
            :loading="isLoading"
            @click="handleSubmit"
          >
            Complete Registration
          </AButton>
        </div>
      </div>
    </div>
  </OModal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from 'vue';
import { useEventBus } from '~/composables/use-event-bus';
import { useAuthStore } from '~/composables/use-auth-store';
import { EVENTS } from '~/constants/event-bus-constants';
import { REGISTRATION_STEPS } from '~/constants/registration-constants';
import type { UserProfile, RegistrationStep } from '~/types/user';
import OModal from '~/components/organisms/o-modal';
import AButton from '~/components/atoms/a-button';
import MRegistrationStepOne from '~/components/molecules/m-registration-step-one';
import MRegistrationStepTwo from '~/components/molecules/m-registration-step-two';
import MRegistrationStepThree from '~/components/molecules/m-registration-step-three';
import MRegistrationStepFour from '~/components/molecules/m-registration-step-four';
import MRegistrationStepFive from '~/components/molecules/m-registration-step-five';

export default defineComponent({
  name: 'ORegisterModal',
  components: {
    OModal,
    AButton,
    MRegistrationStepOne,
    MRegistrationStepTwo,
    MRegistrationStepThree,
    MRegistrationStepFour,
    MRegistrationStepFive
  },

  setup() {
    const { register } = useAuthStore();
    const { setBusListener, BUS } = useEventBus();
    const isOpen = ref(false);
    const isLoading = ref(false);
    const currentStep = ref(1);
    const steps = reactive<RegistrationStep[]>(REGISTRATION_STEPS);
    const errors = reactive<Record<string, string>>({});

    const formData = reactive<Partial<UserProfile>>({
      notifications_enabled: true,
      email_notifications: true,
      sms_notifications: true
    });

    const currentStepComponent = computed(() => {
      const components = {
        1: 'MRegistrationStepOne',
        2: 'MRegistrationStepTwo',
        3: 'MRegistrationStepThree',
        4: 'MRegistrationStepFour',
        5: 'MRegistrationStepFive'
      };
      return components[currentStep.value as keyof typeof components];
    });

    const totalSteps = computed(() => steps.length);

    const updateFormData = (newData: Partial<UserProfile>) => {
      Object.assign(formData, newData);
    };

    const validateStep = async (): Promise<boolean> => {
      try {
        await getCurrentStepComponent.value?.validate();
        steps[currentStep.value - 1].isCompleted = true;
        return true;
      } catch (validationErrors) {
        Object.assign(errors, validationErrors);
        return false;
      }
    };

    const goToStep = async (stepId: number) => {
      if (stepId < currentStep.value || steps[stepId - 1].isCompleted) {
        currentStep.value = stepId;
      }
    };

    const nextStep = async () => {
      if (await validateStep()) {
        if (currentStep.value < totalSteps.value) {
          currentStep.value++;
        }
      }
    };

    const previousStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    };

    const handleSubmit = async () => {
      if (await validateStep()) {
        try {
          isLoading.value = true;
          await register(formData as Required<UserProfile>);
          BUS.emit(EVENTS.SUCCESS_REGISTER);
          handleClose();
        } catch (error) {
          if (error instanceof Error) {
            BUS.emit(EVENTS.FAILED_REGISTER, { error: error.message });
          }
        } finally {
          isLoading.value = false;
        }
      }
    };

    const handleClose = () => {
      isOpen.value = false;
      currentStep.value = 1;
      Object.assign(formData, {
        notifications_enabled: true,
        email_notifications: true,
        sms_notifications: true
      });
      steps.forEach(step => step.isCompleted = false);
      Object.assign(errors, {});
      document.body.style.overflow = '';
    };

    // Set up event listeners
    setBusListener(EVENTS.OPEN_REGISTER_MODAL, () => {
      isOpen.value = true;
    });

    setBusListener(EVENTS.HIDE_REGISTER_MODAL, handleClose);

    // Add watch effect for body overflow
    watch(isOpen, (value) => {
      if (value) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    return {
      isOpen,
      isLoading,
      currentStep,
      steps,
      formData,
      errors,
      currentStepComponent,
      totalSteps,
      goToStep,
      nextStep,
      previousStep,
      handleSubmit,
      handleClose,
      updateFormData,
      validateStep
    };
  }
});
</script>

<style lang="scss">
.o-register-modal {
  :deep(.content) {
    @apply w-screen h-screen max-w-none m-0 rounded-none bg-white p-0;
  }

  .layout {
    @apply flex h-screen;
  }

  .sidebar {
    @apply w-96 bg-gray-50 border-r border-gray-200 p-8 overflow-y-auto;
  }

  .header {
    @apply mb-8;

    &__logo {
      @apply h-12 w-auto mb-4;
    }

    &__title {
      @apply text-2xl font-bold text-gray-900;
    }
  }

  .nav {
    @apply space-y-4;
  }

  .step {
    @apply w-full text-left px-4 py-3 rounded-lg transition-colors;

    &.is-active {
      @apply bg-white shadow-sm;
    }

    &.is-completed {
      @apply hover:bg-gray-100;
    }

    &__content {
      @apply flex items-start;
    }

    &__icon {
      @apply flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3;
      @apply bg-gray-100 text-gray-500;

      .is-active & {
        @apply bg-primary text-white;
      }

      .is-completed & {
        @apply bg-green-100 text-green-500;
      }
    }

    &__info {
      @apply flex-1;
    }

    &__title {
      @apply font-medium;

      &.is-active {
        @apply text-primary;
      }

      &.is-completed {
        @apply text-green-600;
      }

      &.is-inactive {
        @apply text-gray-500;
      }
    }

    &__description {
      @apply text-sm text-gray-500;
    }
  }

  .content {
    @apply flex-1 flex flex-col;
  }

  .form {
    @apply flex-1 p-8 overflow-y-auto;
  }

  .actions {
    @apply flex items-center justify-between p-6 bg-gray-50 border-t border-gray-200;

    &__spacer {
      @apply flex-1;
    }
  }
}
</style> 
