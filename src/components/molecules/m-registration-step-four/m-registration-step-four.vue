<template>
  <div class="m-registration-step-four" data-at="registration-step-four">
    <h2 class="title">Notification Preferences</h2>
    <p class="description">Choose how you would like to receive updates and notifications.</p>

    <form @submit.prevent class="form">
      <div class="settings-card">
        <div class="settings-item">
          <div class="settings-item__content">
            <h3 class="settings-item__title">Enable Notifications</h3>
            <p class="settings-item__description">Receive important updates about your account and our services</p>
          </div>
          <ASwitchToggle
            v-model="formData.notifications_enabled"
            :id="'register-notifications-enabled'"
            data-at="notifications-main-toggle"
          />
        </div>

        <div class="settings-group">
          <div 
            class="settings-item"
            :class="{ 'is-disabled': !formData.notifications_enabled }"
          >
            <div class="settings-item__content">
              <h4 class="settings-item__subtitle">Email Notifications</h4>
              <p class="settings-item__description">Receive updates via email</p>
            </div>
            <ASwitchToggle
              v-model="formData.email_notifications"
              :id="'register-email-notifications'"
              :disabled="!formData.notifications_enabled"
              data-at="notifications-email-toggle"
            />
          </div>

          <div 
            class="settings-item"
            :class="{ 'is-disabled': !formData.notifications_enabled }"
          >
            <div class="settings-item__content">
              <h4 class="settings-item__subtitle">SMS Notifications</h4>
              <p class="settings-item__description">Receive updates via SMS</p>
            </div>
            <ASwitchToggle
              v-model="formData.sms_notifications"
              :id="'register-sms-notifications'"
              :disabled="!formData.notifications_enabled"
              data-at="notifications-sms-toggle"
            />
          </div>
        </div>
      </div>

      <div class="info-box">
        <p class="info-box__content">
          <i class="info-box__icon fas fa-info-circle"></i>
          You can change these preferences at any time in your account settings.
        </p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import type { UserProfile } from '~/types/user';
import ASwitchToggle from '~/components/atoms/a-switch-toggle';

export default defineComponent({
  name: 'MRegistrationStepFour',

  components: {
    ASwitchToggle
  },

  props: {
    modelValue: {
      type: Object as () => Partial<UserProfile>,
      required: true
    }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const formData = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    });

    // Reset sub-toggles when main toggle is disabled
    watch(() => formData.value.notifications_enabled, (enabled) => {
      if (!enabled) {
        formData.value.email_notifications = false;
        formData.value.sms_notifications = false;
      }
    });

    return {
      formData
    };
  }
});
</script>

<style lang="scss" scoped>
.m-registration-step-four {
  @apply max-w-2xl mx-auto;

  .title {
    @apply text-2xl font-semibold text-gray-900 mb-6;
  }

  .description {
    @apply text-gray-600 mb-8;
  }

  .form {
    @apply space-y-8;
  }

  .settings-card {
    @apply bg-white rounded-lg border border-gray-200 p-6 space-y-6;
  }

  .settings-group {
    @apply border-t border-gray-200 pt-6 space-y-6;
  }

  .settings-item {
    @apply flex items-center justify-between opacity-100;

    &.is-disabled {
      @apply opacity-50;
    }

    &__content {
      @apply flex-grow;
    }

    &__title {
      @apply text-lg font-medium text-gray-900;
    }

    &__subtitle {
      @apply text-base font-medium text-gray-900;
    }

    &__description {
      @apply text-sm text-gray-500;
    }
  }

  .info-box {
    @apply bg-gray-50 rounded-lg p-4;

    &__content {
      @apply text-sm text-gray-600;
    }

    &__icon {
      @apply mr-2 text-gray-400;
    }
  }
}
</style> 