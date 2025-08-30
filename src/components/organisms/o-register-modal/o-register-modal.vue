<template>
  <OModal
    v-model="isOpen"
    :full-screen="true"
    :prevent-close="true"
    class="o-register-modal"
    content-class="register-modal"
    @close="handleClose"
  >
    <div class="layout">
      <!-- Left sidebar with steps - Hidden on mobile/tablet, visible on desktop -->
      <div class="sidebar hidden lg:flex">
        <div class="header">
          <h1 class="header__title">{{ t(T_KEYS.AUTH.REGISTER.NEW_ACCOUNT) }}</h1>
        </div>

        <nav class="nav">
          <button
            v-for="step in steps"
            :key="step.id"
            class="step"
            :class="{
              'is-active': currentStep === step.id,
              'is-completed': step.isCompleted,
              'is-available': canNavigateToStep(step.id),
              'is-locked': !canNavigateToStep(step.id)
            }"
            :disabled="!canNavigateToStep(step.id)"
            @click="handleStepClick(step.id)"
          >
            <div class="step__content">
              <div class="step__icon">
                <i v-if="step.isCompleted" class="fas fa-check" />
                <i v-else-if="currentStep === step.id" :class="step.icon" />
                <i v-else-if="canNavigateToStep(step.id)" :class="step.icon" />
                <i v-else class="fas fa-lock" />
              </div>
              <div class="step__info">
                <p 
                  class="step__title" 
                  :class="{
                    'is-active': currentStep === step.id,
                    'is-completed': step.isCompleted,
                    'is-available': canNavigateToStep(step.id) && currentStep !== step.id,
                    'is-locked': !canNavigateToStep(step.id)
                  }"
                >
                  {{ t(step.title) }}
                </p>
                <p class="step__description">{{ t(step.description) }}</p>
              </div>
            </div>
          </button>
        </nav>
      </div>

      <!-- Right side content -->
      <div class="content">
        <!-- Mobile progress indicator - Show on mobile/tablet, hide on desktop -->
        <div class="mobile-progress lg:hidden">
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
            />
          </div>
          <p class="progress-text">
            {{ t(T_KEYS.AUTH.REGISTER.STEP_PROGRESS, { current: currentStep, total: totalSteps }) }}: {{ t(steps[currentStep - 1]?.title) }}
          </p>
        </div>

        <div class="form">
          <component
            :is="currentStepComponent"
            ref="currentStepRef"
          />
        </div>

        <!-- Navigation buttons -->
        <div class="actions">
          <AButton
            variant="outline"
            class="action-button-cancel"
            @click="handleCancelButtonClick"
          >
            {{ t(T_KEYS.COMMON.BUTTONS.CANCEL) }}
          </AButton>
          <AButton
            v-if="currentStep > 1"
            variant="outline"
            class="action-button-back"
            @click="handleBackButtonClick"
          >
            <i class="fas fa-arrow-left mr-2" />
            {{ t(T_KEYS.COMMON.BUTTONS.BACK) }}
          </AButton>
          <AButton
            variant="primary"
            :loading="isLoading"
            class="action-button-submit"
            @click="handleSubmitButtonClick"
          >
            {{ t(submitButtonText) }}
            <i v-if="currentStep < totalSteps" class="fas fa-arrow-right ml-2" />
            <i v-else class="fas fa-check ml-2" />
          </AButton>
        </div>
      </div>
    </div>
  </OModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { Form as VForm } from 'vee-validate';
import { useEventBus } from '~/composables/use-event-bus';
import { useRegistrationForm } from '~/composables/use-registration-form';
import { openConfirmationModal } from '~/composables/use-confirmation-modal';
import { useTranslation } from '~/composables/use-translation';
import { EVENTS } from '~/constants/event-bus-constants';
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
    VForm,
    OModal,
    AButton,
    MRegistrationStepOne,
    MRegistrationStepTwo,
    MRegistrationStepThree,
    MRegistrationStepFour,
    MRegistrationStepFive
  },

  setup() {
    const { t, T_KEYS } = useTranslation();
    const { setBusListener } = useEventBus();
    const {
      formData,
      currentStep,
      isLoading,
      steps,
      totalSteps,
      submitButtonText,
      handleSubmit,
      goToStep,
      previousStep,
      resetForm,
      handleNextStep,
      canNavigateToStep
    } = useRegistrationForm();

    const isOpen = ref(false);
    const currentStepRef = ref<InstanceType<typeof MRegistrationStepOne | typeof MRegistrationStepTwo | typeof MRegistrationStepThree | typeof MRegistrationStepFour | typeof MRegistrationStepFive> | null>(null);

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

    const handleSubmitButtonClick = async () => {
      if (currentStep.value < totalSteps.value) {
        const success = await handleNextStep();
        if (!success) {
          console.warn('Step validation failed');
        }
      } else {
        await handleSubmit();
      }
    };

    const hasUnsavedChanges = () => {
      // Check if any field in the form has been filled out
      const data = formData.value;

      // Check if any field has a value
      return Object.values(data).some(value => {
        if (typeof value === 'string') return value.trim() !== '';
        if (typeof value === 'boolean') return value === true;
        return value !== undefined && value !== null;
      });
    };

    const handleClose = async () => {
      // If there are unsaved changes, show confirmation modal
      if (hasUnsavedChanges()) {
        const confirmed = await openConfirmationModal({
          title: t(T_KEYS.AUTH.REGISTER.UNSAVED_CHANGES),
          text: t(T_KEYS.AUTH.REGISTER.UNSAVED_CHANGES_TEXT),
          confirmButtonText: t(T_KEYS.AUTH.REGISTER.YES_CLOSE),
          rejectButtonText: t(T_KEYS.COMMON.BUTTONS.CANCEL)
        });

        if (!confirmed) {
          return; // User canceled, don't close the modal
        }
      }

      isOpen.value = false;
      resetForm();
      document.body.style.overflow = '';
    };

    const handleCancelButtonClick = () => {
      handleClose();
    };

    const handleBackButtonClick = () => {
      previousStep();
    };

    const handleStepClick = (stepId: number) => {
      goToStep(stepId);
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
      t,
      T_KEYS,
      isOpen,
      currentStep,
      currentStepRef,
      steps,
      formData,
      currentStepComponent,
      submitButtonText,
      isLoading,
      totalSteps,
      handleClose,
      handleSubmitButtonClick,
      goToStep,
      handleCancelButtonClick,
      handleBackButtonClick,
      handleStepClick,
      canNavigateToStep
    };
  }
});
</script>

<style lang="scss">
.o-register-modal {
  :deep(.content) {
    @apply w-screen max-w-none m-0 rounded-none bg-white p-0;
    // Use viewport height units for better mobile support
    height: 100vh;
    height: 100dvh; // Use dynamic viewport height for mobile browsers
  }
  .register-modal {
    &.modal-content {
      @apply p-0;
    }
  }

  .layout {
    // Mobile/Tablet: Single column, Desktop: Side by side
    @apply flex flex-col lg:flex-row;
    // Ensure full height usage
    height: 100%;
    min-height: 100%;
  }

  .sidebar {
    // Desktop only: Vertical sidebar
    @apply w-80 xl:w-96 bg-gray-50 overflow-y-auto flex-col;
    @apply hidden lg:flex p-8;

    // Ensure sidebar doesn't interfere on mobile (it's hidden anyway)
    @apply flex-shrink-0;
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
    // Desktop: Vertical layout only
    @apply flex flex-col space-y-4;
  }

  .step {
    // Desktop: Full width
    @apply w-full text-left px-4 py-3 rounded-lg transition-all duration-200;

    &:not(:disabled) {
      @apply hover:bg-gray-100 cursor-pointer;
    }

    &:disabled {
      @apply cursor-not-allowed opacity-60;
    }

    &.is-active {
      @apply bg-white shadow-sm ring-2 ring-primary ring-opacity-20;
    }

    &.is-completed {
      @apply hover:bg-green-50;
    }

    &.is-available {
      @apply hover:bg-blue-50;
    }

    &.is-locked {
      @apply bg-gray-50;
    }

    &__content {
      @apply flex items-start;
    }

    &__icon {
      @apply flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-colors;
      @apply bg-gray-100 text-gray-500;

      .is-active & {
        @apply bg-primary text-white;
      }

      .is-completed & {
        @apply bg-yellow-dark text-white;
      }

      .is-available & {
        @apply bg-blue-100 text-primary-light;
      }

      .is-locked & {
        @apply bg-gray-200 text-gray-400;
      }
    }

    &__info {
      @apply flex-1;
    }

    &__title {
      @apply text-base font-medium transition-colors;

      &.is-active {
        @apply text-primary;
      }

      &.is-completed {
        @apply text-yellow;
      }

      &.is-available {
        @apply text-primary-light;
      }

      &.is-locked {
        @apply text-gray-400;
      }
    }

    &__description {
      @apply text-sm text-gray-500 transition-colors;

      .is-locked & {
        @apply text-gray-400;
      }
    }
  }

  .content {
    @apply flex-1 flex flex-col;
    // Ensure content area takes remaining space and handles overflow properly
    @apply min-h-0 lg:min-h-full;
  }

  .mobile-progress {
    @apply p-4 bg-white border-b border-gray-200;
    // Ensure progress bar is always visible and doesn't scroll
    @apply flex-shrink-0;

    .progress-bar {
      @apply w-full bg-gray-200 rounded-full h-2 mb-2;
    }

    .progress-fill {
      @apply bg-primary h-2 rounded-full transition-all duration-300;
    }

    .progress-text {
      @apply text-sm text-gray-600 text-center;
    }
  }

  .form {
    @apply flex-1 overflow-y-auto;
    @apply p-4 sm:p-6 lg:p-8;
    // Ensure form content scrolls properly within available space
    @apply min-h-0;

    // Add bottom padding on mobile to ensure content doesn't get hidden behind actions
    @apply pb-20 lg:pb-8;

    // Ensure smooth scrolling on mobile
    -webkit-overflow-scrolling: touch;
  }

  .actions {
    @apply flex items-center justify-end bg-gray-50;
    @apply p-4 sm:p-6;
    @apply gap-3;
    // Ensure actions are always visible at bottom
    @apply flex-shrink-0;

    // On mobile, ensure actions don't scroll away
    @apply sticky lg:relative bottom-0 lg:bottom-auto;
    @apply border-t lg:border-t-0 border-gray-200;
    @apply shadow-lg lg:shadow-none;

    // Mobile: Stack buttons vertically for better touch targets
    @apply flex-col sm:flex-row;

    .action-button-cancel {
      @apply w-full sm:w-auto order-1;
    }

    .action-button-back {
      @apply w-full sm:w-auto order-2;
    }

    .action-button-submit {
      @apply w-full sm:w-auto order-3;
    }

    // On mobile, reverse order so primary action is at top
    @media (max-width: 640px) {
      @apply flex-col-reverse;

      .action-button-submit {
        @apply mb-2;
      }
    }
  }

  // Additional mobile-specific improvements
  @media (max-width: 640px) {
    // Ensure no horizontal overflow on small screens
    :deep(.content) {
      overflow-x: hidden;
    }

    // Optimize for mobile browsers with address bars
    .layout {
      min-height: 100vh;
      min-height: 100dvh;
    }
  }
}
</style> 
