<template>
  <div class="m-registration-step-five" data-at="registration-step-five">
    <h2 class="title">{{ t(T_KEYS.AUTH.REGISTER.STEPS.STEP5.TITLE) }}</h2>
    <p class="description">{{ t(T_KEYS.AUTH.REGISTER.STEPS.STEP5.DESCRIPTION) }}</p>

    <div class="sections">
      <!-- Personal Information -->
      <div class="section">
        <h3 class="section__title">
          <i class="section__icon fas fa-user"/>
          {{ t(T_KEYS.AUTH.REGISTER.REVIEW.PERSONAL_INFO) }}
        </h3>
        <dl class="info-grid">
          <div class="info-item">
            <dt class="info-item__label">{{ t(T_KEYS.FORM.LABELS.FIRST_NAME) }}</dt>
            <dd class="info-item__value">{{ formData.first_name }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">{{ t(T_KEYS.FORM.LABELS.LAST_NAME) }}</dt>
            <dd class="info-item__value">{{ formData.last_name }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">{{ t(T_KEYS.FORM.LABELS.EMAIL_ADDRESS) }}</dt>
            <dd class="info-item__value">{{ formData.email }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">{{ t(T_KEYS.FORM.LABELS.PHONE_NUMBER) }}</dt>
            <dd class="info-item__value">{{ formData.phone }}</dd>
          </div>
          <div v-if="formData.patronymic" class="info-item">
            <dt class="info-item__label">{{ t(T_KEYS.FORM.LABELS.PATRONYMIC) }}</dt>
            <dd class="info-item__value">{{ formData.patronymic }}</dd>
          </div>
        </dl>
      </div>

      <!-- Demographics -->
      <div class="section">
        <h3 class="section__title">
          <i class="section__icon fas fa-info-circle"/>
          {{ t(T_KEYS.AUTH.REGISTER.REVIEW.DEMOGRAPHICS) }}
        </h3>
        <dl class="info-grid">
          <div class="info-item">
            <dt class="info-item__label">{{ t(T_KEYS.FORM.LABELS.DATE_OF_BIRTH) }}</dt>
            <dd class="info-item__value">{{ formatDate(formData.date_of_birth ?? '') }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">{{ t(T_KEYS.FORM.LABELS.CATEGORY) }}</dt>
            <dd class="info-item__value">{{ getCategoryLabel(formData.category ?? '') }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">{{ t(T_KEYS.FORM.LABELS.REGION) }}</dt>
            <dd class="info-item__value">{{ getRegionLabel(formData.region ?? '') }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">{{ t(T_KEYS.FORM.LABELS.CITY) }}</dt>
            <dd class="info-item__value">{{ getCityLabel(formData.region ?? '', formData.city ?? '') }}</dd>
          </div>
          <div v-if="formData.bio" class="info-item info-item--full">
            <dt class="info-item__label">{{ t(T_KEYS.FORM.LABELS.BIO) }}</dt>
            <dd class="info-item__value">{{ formData.bio }}</dd>
          </div>
        </dl>
      </div>

      <!-- Emergency Contact -->
      <div class="section">
        <h3 class="section__title">
          <i class="section__icon fas fa-phone-alt"/>
          {{ t(T_KEYS.AUTH.REGISTER.REVIEW.EMERGENCY_CONTACT) }}
        </h3>
        <dl class="info-grid">
          <div class="info-item info-item--full">
            <dt class="info-item__label">{{ t(T_KEYS.AUTH.REGISTER.REVIEW.ADDRESS) }}</dt>
            <dd class="info-item__value">{{ formData.address }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">{{ t(T_KEYS.AUTH.REGISTER.REVIEW.CONTACT_NAME) }}</dt>
            <dd class="info-item__value">{{ formData.emergency_contact_name }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">{{ t(T_KEYS.AUTH.REGISTER.REVIEW.CONTACT_PHONE) }}</dt>
            <dd class="info-item__value">{{ formData.emergency_contact_phone }}</dd>
          </div>
        </dl>
      </div>

      <!-- Notification Preferences -->
      <div class="section">
        <h3 class="section__title">
          <i class="section__icon fas fa-bell"/>
          {{ t(T_KEYS.AUTH.REGISTER.REVIEW.NOTIFICATION_PREFERENCES) }}
        </h3>
        <dl class="notification-list">
          <div class="notification-item">
            <dt class="notification-item__label">{{ t(T_KEYS.AUTH.REGISTER.NOTIFICATIONS.NOTIFICATIONS_ENABLED) }}</dt>
            <dd class="notification-item__value">
              <i
:class="[
                formData.notifications_enabled ? 'fas fa-check' : 'fas fa-times'
              ]"/>
            </dd>
          </div>
          <div class="notification-item">
            <dt class="notification-item__label">{{ t(T_KEYS.AUTH.REGISTER.NOTIFICATIONS.EMAIL_NOTIFICATIONS) }}</dt>
            <dd class="notification-item__value">
              <i
:class="[
                'fas',
                formData.email_notifications ? 'fa-check' : 'fa-times'
              ]"/>
            </dd>
          </div>
          <div class="notification-item">
            <dt class="notification-item__label">{{ t(T_KEYS.AUTH.REGISTER.NOTIFICATIONS.SMS_NOTIFICATIONS) }}</dt>
            <dd class="notification-item__value">
              <i
:class="[
                formData.sms_notifications ? 'fas fa-check' : 'fas fa-times'
              ]"/>
            </dd>
          </div>
        </dl>
      </div>

      <!-- Terms Agreement -->
      <div class="section">
        <div class="terms">
          <div class="terms__checkbox">
            <ACheckbox
              :id="'register-terms'"
              v-model="terms.value.value as boolean"
              data-at="registration-terms-checkbox"
              :error="terms.errorMessage.value ? translateValidationError(terms.errorMessage.value) : ''"
              @blur="terms.validate"
            />
          </div>
          <div class="terms__content">
            <label for="register-terms" class="terms__label">
              {{ t(T_KEYS.AUTH.REGISTER.TERMS.AGREE_TO) }}
              <a href="#" class="terms__link">{{ t(T_KEYS.AUTH.REGISTER.TERMS.TERMS_OF_SERVICE) }}</a>
              {{ t(T_KEYS.AUTH.REGISTER.TERMS.AND) }}
              <a href="#" class="terms__link">{{ t(T_KEYS.AUTH.REGISTER.TERMS.PRIVACY_POLICY) }}</a>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useField } from 'vee-validate';
import { USER_CATEGORIES, REGIONS, CITIES } from '~/constants/registration-constants';
import ACheckbox from '~/components/atoms/a-checkbox';
import { useRegistrationValidation } from '~/composables/use-registration-validation';
import { useRegistrationData } from '~/composables/use-registration-data';
import { useTranslation } from '~/composables/use-translation';

export default defineComponent({
  name: 'MRegistrationStepFive',

  components: {
    ACheckbox
  },

  setup() {
    const { t, T_KEYS } = useTranslation();
    const { getStepForm, translateValidationError } = useRegistrationValidation();
    const { formData } = useRegistrationData();
    const stepForm = getStepForm(5);

    // Create terms field using useField with the step form context
    const terms = useField('terms', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const formatDate = (date: string) => {
      if (!date) return '';
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const getCategoryLabel = (category: string) => {
      const key = USER_CATEGORIES.find(c => c.value === category)?.label || ''
      return t(key) || category;
    };

    const getRegionLabel = (region: string) => {
      return REGIONS.find(r => r.value === region)?.label || region;
    };

    const getCityLabel = (region: string, city: string) => {
      return CITIES[region as keyof typeof CITIES]?.find(c => c.value === city)?.label || city;
    };

    // Expose validation method for external triggering
    const validateAll = async () => {
      const results = await Promise.all([
        terms.validate()
      ]);
      return results.every(result => result.valid);
    };

    return {
      t,
      T_KEYS,
      formData,
      terms,
      validateAll,
      formatDate,
      getCategoryLabel,
      getRegionLabel,
      getCityLabel,
      translateValidationError
    };
  }
});
</script>

<style lang="scss" scoped>
.m-registration-step-five {
  @apply max-w-2xl mx-auto;

  .title {
    @apply text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6;
  }

  .description {
    @apply text-sm sm:text-base text-gray-600 mb-6 sm:mb-8;
  }

  .sections {
    @apply space-y-6 sm:space-y-8;
  }

  .section {
    @apply bg-white rounded-lg border border-gray-200 p-4 sm:p-6;

    &__title {
      @apply text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center;
    }

    &__icon {
      @apply mr-2 text-primary;
    }
  }

  .info-grid {
    @apply grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4;
  }

  .info-item {
    &--full {
      @apply col-span-1 sm:col-span-2;
    }

    &__label {
      @apply text-xs sm:text-sm font-medium text-gray-500;
    }

    &__value {
      @apply mt-1 text-sm sm:text-base text-gray-900;
    }
  }

  .notification-list {
    @apply space-y-2;
  }

  .notification-item {
    @apply flex items-center;

    &__label {
      @apply text-sm font-medium text-gray-500 flex-1;
    }

    &__value {
      @apply text-sm text-gray-900;

      i {
        @apply w-4 h-4 sm:w-5 sm:h-5;
      }
    }
  }

  .icon {
    &--check {
      @apply text-green-500;
    }

    &--times {
      @apply text-red-500;
    }
  }

  .terms {
    @apply flex items-start;

    &__checkbox {
      @apply flex h-5 items-center;
    }

    &__content {
      @apply ml-3;
    }

    &__label {
      @apply text-sm text-gray-700;
    }

    &__link {
      @apply text-primary hover:text-primary-dark;
    }
  }
}
</style>