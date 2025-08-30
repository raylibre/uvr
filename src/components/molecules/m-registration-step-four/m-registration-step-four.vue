<template>
  <div class="m-registration-step-four" data-at="registration-step-four">
    <h2 class="title">{{ t(T_KEYS.AUTH.REGISTER.STEPS.STEP4.TITLE) }}</h2>
    <p class="description">{{ t(T_KEYS.AUTH.REGISTER.STEPS.STEP4.DESCRIPTION) }}</p>

    <div class="form">
      <div class="settings-card">
        <div class="settings-item">
          <div class="settings-item__content">
            <h3 class="settings-item__title">{{ t(T_KEYS.AUTH.REGISTER.NOTIFICATIONS.ENABLE_NOTIFICATIONS) }}</h3>
            <p class="settings-item__description">{{ t(T_KEYS.AUTH.REGISTER.NOTIFICATIONS.ENABLE_DESCRIPTION) }}</p>
          </div>
          <ASwitchToggle
            :id="'register-notifications-enabled'"
            v-model="notificationsEnabled.value.value as boolean"
            data-at="notifications-main-toggle"
            :error="notificationsEnabled.errorMessage.value"
          />
        </div>

        <div class="settings-group">
          <div 
            class="settings-item"
            :class="{ 'is-disabled': !notificationsEnabled.value.value }"
          >
            <div class="settings-item__content">
              <h4 class="settings-item__subtitle">{{ t(T_KEYS.AUTH.REGISTER.NOTIFICATIONS.EMAIL_NOTIFICATIONS) }}</h4>
              <p class="settings-item__description">{{ t(T_KEYS.AUTH.REGISTER.NOTIFICATIONS.EMAIL_DESCRIPTION) }}</p>
            </div>
            <ASwitchToggle
              :id="'register-email-notifications'"
              v-model="emailNotifications.value.value as boolean"
              :disabled="!notificationsEnabled.value.value"
              data-at="notifications-email-toggle"
              :error="emailNotifications.errorMessage.value"
            />
          </div>

          <div 
            class="settings-item"
            :class="{ 'is-disabled': !notificationsEnabled.value.value }"
          >
            <div class="settings-item__content">
              <h4 class="settings-item__subtitle">{{ t(T_KEYS.AUTH.REGISTER.NOTIFICATIONS.SMS_NOTIFICATIONS) }}</h4>
              <p class="settings-item__description">{{ t(T_KEYS.AUTH.REGISTER.NOTIFICATIONS.SMS_DESCRIPTION) }}</p>
            </div>
            <ASwitchToggle
              :id="'register-sms-notifications'"
              v-model="smsNotifications.value.value as boolean"
              :disabled="!notificationsEnabled.value.value"
              data-at="notifications-sms-toggle"
              :error="smsNotifications.errorMessage.value"
            />
          </div>
        </div>
      </div>

      <div class="info-box">
        <p class="info-box__content">
          <i class="info-box__icon fas fa-info-circle"/>
          {{ t(T_KEYS.AUTH.REGISTER.NOTIFICATIONS.CHANGE_SETTINGS) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useField } from 'vee-validate';
import ASwitchToggle from '~/components/atoms/a-switch-toggle';
import { useRegistrationValidation } from '~/composables/use-registration-validation';
import { useTranslation } from '~/composables/use-translation';

export default defineComponent({
  name: 'MRegistrationStepFour',

  components: {
    ASwitchToggle
  },

  setup() {
    const { t, T_KEYS } = useTranslation();
    const { getStepForm } = useRegistrationValidation();
    const stepForm = getStepForm(4);

    // Create fields using useField with the step form context
    const notificationsEnabled = useField('notifications_enabled', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const emailNotifications = useField('email_notifications', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const smsNotifications = useField('sms_notifications', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    // Reset sub-toggles when main toggle is disabled
    watch(() => notificationsEnabled.value.value, (enabled) => {
      if (!enabled) {
        emailNotifications.value.value = false;
        smsNotifications.value.value = false;
      }
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
      t,
      T_KEYS,
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

  .settings-card {
    @apply bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-4 sm:space-y-6;
  }

  .settings-group {
    @apply border-t border-gray-200 pt-4 sm:pt-6 space-y-4 sm:space-y-6;
  }

  .settings-item {
    @apply flex items-start sm:items-center justify-between opacity-100;
    @apply flex-col sm:flex-row gap-3 sm:gap-0;

    &.is-disabled {
      @apply opacity-50;
    }

    &__content {
      @apply flex-grow;
    }

    &__title {
      @apply text-base sm:text-lg font-medium text-gray-900;
    }

    &__subtitle {
      @apply text-sm sm:text-base font-medium text-gray-900;
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