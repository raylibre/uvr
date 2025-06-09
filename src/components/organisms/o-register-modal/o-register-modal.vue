<template>
  <OModal
    v-model="isOpen"
    :fullScreen="true"
    class="o-register-modal"
  >
    <div class="layout">
      <!-- Left sidebar with steps -->
      <div class="sidebar">
        <div class="header">
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
            ref="currentStepRef"
            v-model="formData"
          />
        </div>

        <!-- Navigation buttons -->
        <div class="actions">
          <AButton
            variant="outline"
            class="action-button-back"
            @click="handleCancelButtonClick"
          >
            Cancel
          </AButton>
          <AButton
            v-if="currentStep > 1"
            variant="outline"
            class="action-button-back"
            @click="handleBackButtonClick"
          >
            Back
          </AButton>
          <AButton
            variant="primary"
            :loading="isLoading"
            class="action-button-submit"
            @click="handleSubmitButtonClick"
          >
            {{ submitButtonText }}
          </AButton>
        </div>
      </div>
    </div>
  </OModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useEventBus } from '~/composables/use-event-bus';
import { useRegistrationForm } from '~/composables/use-registration-form';
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
    OModal,
    AButton,
    MRegistrationStepOne,
    MRegistrationStepTwo,
    MRegistrationStepThree,
    MRegistrationStepFour,
    MRegistrationStepFive
  },

  setup() {
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
      nextStep,
      previousStep,
      resetForm
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
        nextStep();
      } else {
        await handleSubmit();
      }
    };

    const handleClose = () => {
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
      currentStep,
      currentStepRef,
      steps,
      formData,
      currentStepComponent,
      submitButtonText,
      isLoading,
      handleSubmitButtonClick,
      goToStep,
      handleCancelButtonClick,
      handleBackButtonClick,
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
    @apply flex h-full;
  }

  .sidebar {
    @apply w-96 bg-gray-50 p-8 overflow-y-auto;
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
    @apply flex items-center justify-end bg-gray-50 p-6;

    .action-button-back {
      @apply mr-6
    }
  }
}
</style> 
