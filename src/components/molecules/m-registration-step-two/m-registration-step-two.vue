<template>
  <div class="m-registration-step-two">
    <h2 class="title">Demographics</h2>
    <p class="description">Tell us more about yourself to help us better understand your needs.</p>

    <div class="form">
      <AFormDatepicker
        :id="'register-date-of-birth'"
        v-model="dateOfBirth.value.value"
        label="Date of Birth"
        :required="true"
        icon="fas fa-calendar"
        :error="dateOfBirth.errorMessage.value"
        @blur="dateOfBirth.validate"
      />

      <div class="form-grid">
        <AFormSelect
          :id="'register-region'"
          v-model="region.value.value"
          label="Region"
          :options="[...REGIONS]"
          :required="true"
          icon="fas fa-map-marker-alt"
          :error="region.errorMessage.value"
          @blur="region.validate"
          @update:model-value="handleRegionChange"
        />

        <AFormSelect
          :id="'register-city'"
          v-model="city.value.value"
          label="City"
          :options="[...availableCities]"
          :required="true"
          icon="fas fa-city"
          :disabled="!region.value.value"
          :error="city.errorMessage.value"
          @blur="city.validate"
        />
      </div>

      <AFormSelect
        :id="'register-category'"
        v-model="category.value.value"
        label="Category"
        :options="[...USER_CATEGORIES]"
        :required="true"
        icon="fas fa-users"
        :error="category.errorMessage.value"
        @blur="category.validate"
      />

      <AFormTextarea
        :id="'register-bio'"
        v-model="bio.value.value"
        label="Bio (Optional)"
        :placeholder="'Tell us about yourself and your motivation...'"
        :rows="4"
        :error="bio.errorMessage.value"
        @blur="bio.validate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useField } from 'vee-validate';
import { USER_CATEGORIES, REGIONS, CITIES } from '~/constants/registration-constants';
import AFormSelect from '~/components/atoms/a-form-select';
import AFormTextarea from '~/components/atoms/a-form-textarea';
import AFormDatepicker from '~/components/atoms/a-form-datepicker';
import { useRegistrationValidation } from '~/composables/use-registration-validation';

export default defineComponent({
  name: 'MRegistrationStepTwo',

  components: {
    AFormSelect,
    AFormTextarea,
    AFormDatepicker
  },

  setup() {
    const { getStepForm } = useRegistrationValidation();
    const stepForm = getStepForm(2);

    // Create fields using useField with the step form context
    const dateOfBirth = useField('date_of_birth', undefined, {
      form: stepForm,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const region = useField('region', undefined, {
      form: stepForm,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const city = useField('city', undefined, {
      form: stepForm,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const category = useField('category', undefined, {
      form: stepForm,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const bio = useField('bio', undefined, {
      form: stepForm,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    // Computed for available cities based on selected region
    const availableCities = computed(() => {
      if (!region.value.value) return [];
      return CITIES[region.value.value as keyof typeof CITIES] || [];
    });

    const handleRegionChange = () => {
      // Clear city when region changes
      city.value.value = '';
    };

    // Expose validation method for external triggering
    const validateAll = async () => {
      const results = await Promise.all([
        dateOfBirth.validate(),
        region.validate(),
        city.validate(),
        category.validate(),
        bio.validate()
      ]);
      return results.every(result => result.valid);
    };

    return {
      dateOfBirth,
      region,
      city,
      category,
      bio,
      USER_CATEGORIES,
      REGIONS,
      availableCities,
      handleRegionChange,
      validateAll
    };
  }
});
</script>

<style lang="scss" scoped>
.m-registration-step-two {
  @apply max-w-2xl mx-auto;

  .title {
    @apply text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6;
  }

  .description {
    @apply text-sm sm:text-base text-gray-600 mb-6 sm:mb-8;
  }

  .form {
    @apply space-y-4 sm:space-y-6;
  }

  .form-grid {
    // Mobile: Single column, Tablet+: Two columns
    @apply grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6;
  }
}
</style>