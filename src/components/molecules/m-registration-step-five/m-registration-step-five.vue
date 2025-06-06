<template>
  <div class="m-registration-step-five" data-at="registration-step-five">
    <h2 class="title">Review Your Information</h2>
    <p class="description">Please review your registration details before submitting.</p>

    <div class="sections">
      <!-- Personal Information -->
      <div class="section">
        <h3 class="section__title">
          <i class="section__icon fas fa-user"></i>
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
          <i class="section__icon fas fa-info-circle"></i>
          Demographics
        </h3>
        <dl class="info-grid">
          <div class="info-item">
            <dt class="info-item__label">Date of Birth</dt>
            <dd class="info-item__value">{{ formatDate(formData.date_of_birth) }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">Category</dt>
            <dd class="info-item__value">{{ getCategoryLabel(formData.category) }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">Region</dt>
            <dd class="info-item__value">{{ getRegionLabel(formData.region) }}</dd>
          </div>
          <div class="info-item">
            <dt class="info-item__label">City</dt>
            <dd class="info-item__value">{{ getCityLabel(formData.region, formData.city) }}</dd>
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
          <i class="section__icon fas fa-phone-alt"></i>
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
          <i class="section__icon fas fa-bell"></i>
          Notification Preferences
        </h3>
        <dl class="notification-list">
          <div class="notification-item">
            <dt class="notification-item__label">Notifications Enabled</dt>
            <dd class="notification-item__value">
              <i :class="[
                formData.notifications_enabled ? 'fas fa-check' : 'fas fa-times'
              ]"></i>
            </dd>
          </div>
          <div class="notification-item">
            <dt class="notification-item__label">Email Notifications</dt>
            <dd class="notification-item__value">
              <i :class="[
                'fas',
                formData.email_notifications ? 'fa-check' : 'fa-times'
              ]"></i>
            </dd>
          </div>
          <div class="notification-item">
            <dt class="notification-item__label">SMS Notifications</dt>
            <dd class="notification-item__value">
              <i :class="[
                formData.sms_notifications ? 'fas fa-check' : 'fas fa-times'
              ]"></i>
            </dd>
          </div>
        </dl>
      </div>

      <!-- Terms Agreement -->
      <div class="section">
        <div class="terms">
          <div class="terms__checkbox">
            <ACheckbox
              v-model="termsAccepted"
              :id="'register-terms'"
              :error="errors.terms"
              data-at="registration-terms-checkbox"
            />
          </div>
          <div class="terms__content">
            <label for="register-terms" class="terms__label">
              I confirm that all the information provided is accurate and I agree to the
              <a href="#" class="terms__link">Terms of Service</a>
              and
              <a href="#" class="terms__link">Privacy Policy</a>
            </label>
            <p v-if="errors.terms" class="terms__error">{{ errors.terms }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import type { UserProfile, UserCategory } from '~/types/user';
import { USER_CATEGORIES, REGIONS, CITIES } from '~/constants/registration-constants';
import ACheckbox from '~/components/atoms/a-checkbox';

const validationSchema = yup.object({
  terms: yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions')
});

export default defineComponent({
  name: 'MRegistrationStepFive',

  components: {
    ACheckbox
  },

  props: {
    modelValue: {
      type: Object as () => Partial<UserProfile>,
      required: true
    },
    errors: {
      type: Object as () => Record<string, string>,
      required: true
    }
  },

  emits: ['update:modelValue', 'validate'],

  setup(props, { emit }) {
    const { handleSubmit, errors: validationErrors } = useForm({
      validationSchema
    });

    const termsAccepted = ref(false);

    const formData = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    });

    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const getCategoryLabel = (category: UserCategory) => {
      return USER_CATEGORIES.find(c => c.value === category)?.label || category;
    };

    const getRegionLabel = (region: string) => {
      return REGIONS.find(r => r.value === region)?.label || region;
    };

    const getCityLabel = (region: string, city: string) => {
      return CITIES[region as keyof typeof CITIES]?.find(c => c.value === city)?.label || city;
    };

    const validate = handleSubmit(async () => {
      if (!termsAccepted.value) {
        return Promise.reject({
          terms: 'You must accept the terms and conditions'
        });
      }
      return props.modelValue;
    });

    return {
      formData,
      termsAccepted,
      validate,
      errors: validationErrors,
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
    @apply text-2xl font-semibold text-gray-900 mb-6;
  }

  .description {
    @apply text-gray-600 mb-8;
  }

  .sections {
    @apply space-y-8;
  }

  .section {
    @apply bg-white rounded-lg border border-gray-200 p-6;

    &__title {
      @apply text-lg font-medium text-gray-900 mb-4 flex items-center;
    }

    &__icon {
      @apply mr-2 text-primary;
    }
  }

  .info-grid {
    @apply grid grid-cols-2 gap-4;
  }

  .info-item {
    &--full {
      @apply col-span-2;
    }

    &__label {
      @apply text-sm font-medium text-gray-500;
    }

    &__value {
      @apply mt-1 text-sm text-gray-900;
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
        @apply w-5 h-5;
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

    &__error {
      @apply mt-1 text-sm text-red-600;
    }
  }
}
</style> 