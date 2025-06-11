<template>
  <div class="m-registration-step-five" data-at="registration-step-five">
    <h2 class="title">Review Your Information</h2>
    <p class="description">Please review your registration details before submitting.</p>

    <div class="sections">
      <!-- Personal Information -->
      <div class="section">
        <h3 class="section__title">
          <i class="section__icon fas fa-user"/>
          Personal Information
        </h3>
        <dl class="info-grid">
          <div class="info-item">
            <dt class="info-item__label">First Name</dt>
            <dd class="info-item__value">{{ formData.first_name }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">Last Name</dt>
            <dd class="info-item__value">{{ formData.last_name }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">Email</dt>
            <dd class="info-item__value">{{ formData.email }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">Phone</dt>
            <dd class="info-item__value">{{ formData.phone }}</dd>
          </div>
          <div v-if="formData.patronymic" class="info-item">
            <dt class="info-item__label">Patronymic</dt>
            <dd class="info-item__value">{{ formData.patronymic }}</dd>
          </div>
        </dl>
      </div>

      <!-- Demographics -->
      <div class="section">
        <h3 class="section__title">
          <i class="section__icon fas fa-info-circle"/>
          Demographics
        </h3>
        <dl class="info-grid">
          <div class="info-item">
            <dt class="info-item__label">Date of Birth</dt>
            <dd class="info-item__value">{{ formatDate(formData.date_of_birth ?? '') }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">Category</dt>
            <dd class="info-item__value">{{ getCategoryLabel(formData.category ?? '') }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">Region</dt>
            <dd class="info-item__value">{{ getRegionLabel(formData.region ?? '') }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">City</dt>
            <dd class="info-item__value">{{ getCityLabel(formData.region ?? '', formData.city ?? '') }}</dd>
          </div>
          <div v-if="formData.bio" class="info-item info-item--full">
            <dt class="info-item__label">Bio</dt>
            <dd class="info-item__value">{{ formData.bio }}</dd>
          </div>
        </dl>
      </div>

      <!-- Emergency Contact -->
      <div class="section">
        <h3 class="section__title">
          <i class="section__icon fas fa-phone-alt"/>
          Emergency Contact
        </h3>
        <dl class="info-grid">
          <div class="info-item info-item--full">
            <dt class="info-item__label">Address</dt>
            <dd class="info-item__value">{{ formData.address }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">Contact Name</dt>
            <dd class="info-item__value">{{ formData.emergency_contact_name }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">Contact Phone</dt>
            <dd class="info-item__value">{{ formData.emergency_contact_phone }}</dd>
          </div>
        </dl>
      </div>

      <!-- Notification Preferences -->
      <div class="section">
        <h3 class="section__title">
          <i class="section__icon fas fa-bell"/>
          Notification Preferences
        </h3>
        <dl class="notification-list">
          <div class="notification-item">
            <dt class="notification-item__label">Notifications Enabled</dt>
            <dd class="notification-item__value">
              <i
:class="[
                formData.notifications_enabled ? 'fas fa-check' : 'fas fa-times'
              ]"/>
            </dd>
          </div>
          <div class="notification-item">
            <dt class="notification-item__label">Email Notifications</dt>
            <dd class="notification-item__value">
              <i
:class="[
                'fas',
                formData.email_notifications ? 'fa-check' : 'fa-times'
              ]"/>
            </dd>
          </div>
          <div class="notification-item">
            <dt class="notification-item__label">SMS Notifications</dt>
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
              :error="terms.errorMessage.value"
              @blur="terms.validate"
            />
          </div>
          <div class="terms__content">
            <label for="register-terms" class="terms__label">
              I confirm that all the information provided is accurate and I agree to the
              <a href="#" class="terms__link">Terms of Service</a>
              and
              <a href="#" class="terms__link">Privacy Policy</a>
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

export default defineComponent({
  name: 'MRegistrationStepFive',

  components: {
    ACheckbox
  },

  setup() {
    const { getStepForm } = useRegistrationValidation();
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
      return USER_CATEGORIES.find(c => c.value === category)?.label || category;
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
      formData,
      terms,
      validateAll,
      formatDate,
      getCategoryLabel,
      getRegionLabel,
      getCityLabel
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