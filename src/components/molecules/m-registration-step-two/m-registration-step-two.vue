<template>
  <div class="m-registration-step-two">
    <h2 class="title">Demographics</h2>
    <p class="description">Tell us about yourself.</p>

    <div class="form">
      <AFormDatepicker
        :id="'register-date-of-birth'"
        :model-value="dateOfBirth.value.value as string"
        label="Date of Birth"
        :required="true"
        icon="fas fa-calendar"
        :error="dateOfBirth.errorMessage.value"
        @update:model-value="dateOfBirth.setValue"
        @blur="dateOfBirth.validate"
      />

      <div class="form-grid">
        <AFormSelect
          :id="'register-region'"
          :model-value="region.value.value as string"
          label="Region"
          :required="true"
          icon="fas fa-map-marker-alt"
          :options="regionOptions"
          :error="region.errorMessage.value"
          @update:model-value="handleRegionChange"
          @blur="region.validate"
        />

        <AFormSelect
          :id="'register-city'"
          :model-value="city.value.value as string"
          label="City"
          :required="true"
          icon="fas fa-city"
          :options="cityOptions"
          :disabled="!region.value.value"
          :error="city.errorMessage.value"
          @update:model-value="city.setValue"
          @blur="city.validate"
        />
      </div>

      <AFormSelect
        :id="'register-category'"
        :model-value="category.value.value as string"
        label="Category"
        :required="true"
        icon="fas fa-tags"
        :options="categoryOptions"
        :error="category.errorMessage.value"
        @update:model-value="category.setValue"
        @blur="category.validate"
      />

      <AFormTextarea
        :id="'register-bio'"
        :model-value="bio.value.value as string"
        label="Bio (Optional)"
        placeholder="Tell us a bit about yourself..."
        :rows="4"
        icon="fas fa-user-edit"
        :error="bio.errorMessage.value"
        @update:model-value="bio.setValue"
        @blur="bio.validate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useField } from 'vee-validate';
import AFormDatepicker from '~/components/atoms/a-form-datepicker';
import AFormSelect from '~/components/atoms/a-form-select';
import AFormTextarea from '~/components/atoms/a-form-textarea';
import { USER_CATEGORIES, REGIONS, CITIES } from '~/constants/registration-constants';

export default defineComponent({
  name: 'MRegistrationStepTwo',

  components: {
    AFormDatepicker,
    AFormSelect,
    AFormTextarea
  },

  setup() {
    // Create fields using useField
    const dateOfBirth = useField('date_of_birth', undefined, {
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const region = useField('region', undefined, {
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const city = useField('city', undefined, {
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const category = useField('category', undefined, {
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const bio = useField('bio', undefined, {
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    // Options for selects
    const regionOptions = [...REGIONS];
    const categoryOptions = [...USER_CATEGORIES];

    // Dynamic city options based on selected region
    const cityOptions = computed(() => {
      const selectedRegion = region.value.value as string;
      return selectedRegion ? [...(CITIES[selectedRegion as keyof typeof CITIES] || [])] : [];
    });

    // Handle region change - reset city when region changes
    const handleRegionChange = (newRegion: string) => {
      region.setValue(newRegion);
      if (city.value.value && region.value.value !== newRegion) {
        city.setValue(''); // Reset city when region changes
      }
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
      regionOptions,
      cityOptions,
      categoryOptions,
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