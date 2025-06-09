<template>
  <div class="m-registration-step-two">
    <h2 class="title">Demographics</h2>
    <p class="description">Tell us more about yourself to help us better understand your needs.</p>

    <form @submit.prevent class="form">
      <AFormInput
        v-model="formData.date_of_birth"
        :id="'register-date-of-birth'"
        label="Date of Birth"
        type="date"
        :required="true"
        icon="fas fa-calendar"
      />

      <div class="form-grid">
        <AFormSelect
          v-model="formData.region"
          :id="'register-region'"
          label="Region"
          :options="REGIONS"
          :required="true"
          icon="fas fa-map-marker-alt"
          @update:modelValue="handleRegionChange"
        />

        <AFormSelect
          v-model="formData.city"
          :id="'register-city'"
          label="City"
          :options="availableCities"
          :required="true"
          icon="fas fa-city"
          :disabled="!formData.region"
        />
      </div>

      <AFormSelect
        v-model="formData.category"
        :id="'register-category'"
        label="Category"
        :options="USER_CATEGORIES"
        :required="true"
        icon="fas fa-users"
      />

      <AFormTextarea
        v-model="formData.bio"
        :id="'register-bio'"
        label="Bio (Optional)"
        :placeholder="'Tell us about yourself and your motivation...'"
        :rows="4"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { UserProfile } from '~/types/user';
import { USER_CATEGORIES, REGIONS, CITIES } from '~/constants/registration-constants';
import AFormInput from '~/components/atoms/a-form-input';
import AFormSelect from '~/components/atoms/a-form-select';
import AFormTextarea from '~/components/atoms/a-form-textarea';

export default defineComponent({
  name: 'MRegistrationStepTwo',

  components: {
    AFormInput,
    AFormSelect,
    AFormTextarea
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

    const availableCities = computed(() => {
      if (!formData.value.region) return [];
      return CITIES[formData.value.region as keyof typeof CITIES] || [];
    });

    const handleRegionChange = () => {
      formData.value.city = '';
    };

    return {
      formData,
      USER_CATEGORIES,
      REGIONS,
      availableCities,
      handleRegionChange
    };
  }
});
</script>

<style lang="scss" scoped>
.m-registration-step-two {
  @apply max-w-2xl mx-auto;

  .title {
    @apply text-2xl font-semibold text-gray-900 mb-6;
  }

  .description {
    @apply text-gray-600 mb-8;
  }

  .form {
    @apply space-y-6;
  }

  .form-grid {
    @apply grid grid-cols-2 gap-6;
  }
}
</style> 