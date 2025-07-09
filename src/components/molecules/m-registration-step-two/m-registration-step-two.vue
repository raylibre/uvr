<template>
  <div class="m-registration-step-two">
    <h2 class="title">Demographics</h2>
    <p class="description">Tell us more about yourself to help us better understand your needs.</p>

    <div class="form">
      <AFormDatepicker
        :id="'register-date-of-birth'"
        v-model="dateOfBirth.value.value as string"
        label="Date of Birth"
        :required="true"
        icon="fas fa-calendar"
        :error="dateOfBirth.errorMessage.value"
        @blur="dateOfBirth.validate"
      />

      <div class="form-grid">
        <AFormSelect
          :id="'register-region'"
          v-model="region.value.value as string"
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
          v-model="city.value.value as string"
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
        :id="'marital-category'"
        v-model="marital.value.value as string"
        label="Marital"
        :options="userMaritalList"
        :required="true"
        icon="fas fa-users"
        :error="marital.errorMessage.value"
        @blur="marital.validate"
      />

      <div class="minor-children-section">
        <div class="checkbox-container">
          <ACheckbox
            :id="'register-has-minor-children'"
            v-model="hasMinorChildren.value.value as boolean"
            :label="t(T_KEYS.FORM.LABELS.HAS_MINOR_CHILDREN)"
            data-at="has-minor-children-checkbox"
            :error="hasMinorChildren.errorMessage.value"
            @blur="hasMinorChildren.validate"
          />
        </div>

        <div v-if="hasMinorChildren.value.value" class="children-count-container">
          <AFormInput
            :id="'register-minor-children-count'"
            v-model="minorChildrenCount.value.value as string"
            :label="t(T_KEYS.FORM.LABELS.MINOR_CHILDREN_COUNT)"
            type="number"
            icon="fas fa-child"
            :error="minorChildrenCount.errorMessage.value"
            @blur="minorChildrenCount.validate"
            min="1"
            max="20"
          />
        </div>
      </div>

      <AFormSelect
        :id="'register-category'"
        v-model="category.value.value as string"
        label="Category"
        :options="userCategoriesList"
        :required="true"
        icon="fas fa-users"
        :error="category.errorMessage.value"
        @blur="category.validate"
      />

      <AFormSelect
        :id="'register-activity-type'"
        v-model="activityType.value.value as string"
        label="Activity Type"
        :options="userActivityTypesList"
        :required="true"
        icon="fas fa-running"
        :error="activityType.errorMessage.value"
        @blur="activityType.validate"
      />

      <AFormTextarea
        :id="'register-bio'"
        v-model="bio.value.value as string"
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
import { defineComponent, computed, watch } from 'vue';
import { useField } from 'vee-validate';
import {
  CITIES,
  REGIONS,
  USER_CATEGORIES,
  MARITAL_CATEGORIES,
  ACTIVITY_TYPES
} from '~/constants/registration-constants';
import AFormSelect from '~/components/atoms/a-form-select';
import AFormTextarea from '~/components/atoms/a-form-textarea';
import AFormDatepicker from '~/components/atoms/a-form-datepicker';
import AFormInput from '~/components/atoms/a-form-input';
import ACheckbox from '~/components/atoms/a-checkbox';
import { useRegistrationValidation } from '~/composables/use-registration-validation';
import { useTranslation } from '~/composables/use-translation.ts';
import { T_KEYS } from '~/constants/translation-keys';

export default defineComponent({
  name: 'MRegistrationStepTwo',

  components: {
    AFormSelect,
    AFormTextarea,
    AFormDatepicker,
    AFormInput,
    ACheckbox
  },

  setup() {
    const { getStepForm } = useRegistrationValidation();
    const { t } = useTranslation();
    const stepForm = getStepForm(2);

    // Create fields using useField with the step form context
    const dateOfBirth = useField('date_of_birth', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const region = useField('region', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const city = useField('city', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const category = useField('category', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const marital = useField('marital', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const activityType = useField('activity_type', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const bio = useField('bio', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const hasMinorChildren = useField('has_minor_children', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const minorChildrenCount = useField('minor_children_count', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    // Reset minor_children_count when has_minor_children is unchecked
    watch(() => hasMinorChildren.value.value, (hasChildren) => {
      if (!hasChildren && minorChildrenCount.value.value) {
        minorChildrenCount.value.value = undefined;
      }
    });

    // Computed for available cities based on selected region
    const availableCities = computed(() => {
      if (!region.value.value) return [];
      return CITIES[region.value.value as keyof typeof CITIES] || [];
    });
    const userCategoriesList = computed(() => {
      return USER_CATEGORIES.map(item => {
        return {
          ...item,
          label: t(item.label)
        }
      });
    });
    const userMaritalList = computed(() => {
      return MARITAL_CATEGORIES.map(item => {
        return {
          ...item,
          label: t(item.label)
        }
      });
    });

    const userActivityTypesList = computed(() => {
      return ACTIVITY_TYPES.map(item => {
        return {
          ...item,
          label: t(item.label)
        }
      });
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
        marital.validate(),
        activityType.validate(),
        bio.validate(),
        hasMinorChildren.validate(),
        // Only validate minor_children_count if has_minor_children is checked
        ...(hasMinorChildren.value.value ? [minorChildrenCount.validate()] : [])
      ]);
      return results.every(result => result.valid);
    };

    return {
      dateOfBirth,
      region,
      city,
      category,
      bio,
      marital,
      activityType,
      hasMinorChildren,
      minorChildrenCount,
      userMaritalList,
      userCategoriesList,
      userActivityTypesList,
      REGIONS,
      availableCities,
      handleRegionChange,
      validateAll,
      t,
      T_KEYS
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

  .minor-children-section {
    @apply mt-4 sm:mt-6 space-y-4;
  }

  .checkbox-container {
    @apply bg-gray-50 rounded-lg p-4;
  }

  .children-count-container {
    @apply mt-4 max-w-xs;
  }
}
</style>
