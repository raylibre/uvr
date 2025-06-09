<template>
  <div class="m-registration-step-four" data-at="registration-step-four">
    <h2 class="title">Notifications</h2>
    <p class="description">Set your notification preferences.</p>

    <div class="form">
      <div class="notification-section">
        <div class="notification-item">
          <ASwitchToggle
            :id="'register-notifications-enabled'"
            :model-value="notificationsEnabled.value.value as boolean"
            :error="notificationsEnabled.errorMessage.value"
            @update:model-value="notificationsEnabled.setValue"
            @blur="notificationsEnabled.validate"
          />
          <div class="notification-content">
            <label for="register-notifications-enabled" class="notification-label">
              Enable Notifications
            </label>
            <p class="notification-description">
              Receive important updates and announcements
            </p>
          </div>
        </div>

        <div class="notification-item" :class="{ disabled: !notificationsEnabled.value.value }">
          <ASwitchToggle
            :id="'register-email-notifications'"
            :model-value="emailNotifications.value.value as boolean"
            :disabled="!notificationsEnabled.value.value"
            :error="emailNotifications.errorMessage.value"
            @update:model-value="emailNotifications.setValue"
            @blur="emailNotifications.validate"
          />
          <div class="notification-content">
            <label for="register-email-notifications" class="notification-label">
              Email Notifications
            </label>
            <p class="notification-description">
              Receive notifications via email
            </p>
          </div>
        </div>

        <div class="notification-item" :class="{ disabled: !notificationsEnabled.value.value }">
          <ASwitchToggle
            :id="'register-sms-notifications'"
            :model-value="smsNotifications.value.value as boolean"
            :disabled="!notificationsEnabled.value.value"
            :error="smsNotifications.errorMessage.value"
            @update:model-value="smsNotifications.setValue"
            @blur="smsNotifications.validate"
          />
          <div class="notification-content">
            <label for="register-sms-notifications" class="notification-label">
              SMS Notifications
            </label>
            <p class="notification-description">
              Receive notifications via text message
            </p>
          </div>
        </div>
      </div>

      <div class="info-box">
        <p class="info-box__content">
          <i class="info-box__icon fas fa-info-circle"/>
          You can change these preferences at any time in your account settings.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useField } from 'vee-validate';
import ASwitchToggle from '~/components/atoms/a-switch-toggle';

export default defineComponent({
  name: 'MRegistrationStepFour',

  components: {
    ASwitchToggle
  },

  setup() {
    // Create fields using useField
    const notificationsEnabled = useField('notifications_enabled', undefined, {
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const emailNotifications = useField('email_notifications', undefined, {
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const smsNotifications = useField('sms_notifications', undefined, {
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    // Expose validation method for external triggering
    const validateAll = async () => {
      const results = await Promise.all([
        notificationsEnabled.validate(),
        emailNotifications.validate(),
        smsNotifications.validate()
      ]);
      return results.every(result => result.valid);
    };

    return {
      notificationsEnabled,
      emailNotifications,
      smsNotifications,
      validateAll
    };
  }
});
</script>

<style lang="scss" scoped>
.m-registration-step-four {
  @apply max-w-2xl mx-auto;

  .title {
    @apply text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6;
  }

  .description {
    @apply text-sm sm:text-base text-gray-600 mb-6 sm:mb-8;
  }

  .form {
    @apply space-y-6 sm:space-y-8;
  }

  .notification-section {
    @apply bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-4 sm:space-y-6;
  }

  .notification-item {
    @apply flex items-start sm:items-center justify-between opacity-100;
    @apply flex-col sm:flex-row gap-3 sm:gap-0;

    &.disabled {
      @apply opacity-50;
    }

    &__content {
      @apply flex-grow;
    }

    &__label {
      @apply text-base sm:text-lg font-medium text-gray-900;
    }

    &__description {
      @apply text-sm text-gray-500;
    }
  }

  .info-box {
    @apply bg-gray-50 rounded-lg p-3 sm:p-4;

    &__content {
      @apply text-sm text-gray-600;
    }

    &__icon {
      @apply mr-2 text-gray-400;
    }
  }
}
</style> 