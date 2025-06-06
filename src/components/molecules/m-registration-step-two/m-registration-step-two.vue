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
        :error="errors.date_of_birth"
        icon="fas fa-calendar"
      />

      <div class="form-grid">
        <AFormSelect
          v-model="formData.region"
          :id="'register-region'"
          label="Region"
          :options="REGIONS"
          :required="true"
          :error="errors.region"
          icon="fas fa-map-marker-alt"
          @update:modelValue="handleRegionChange"
        />

        <AFormSelect
          v-model="formData.city"
          :id="'register-city'"
          label="City"
          :options="availableCities"
          :required="true"
          :error="errors.city"
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
        :error="errors.category"
        icon="fas fa-users"
      />

      <AFormTextarea
        v-model="formData.bio"
        :id="'register-bio'"
        label="Bio (Optional)"
        :placeholder="'Tell us about yourself and your motivation...'"
        :error="errors.bio"
        :rows="4"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import type { UserProfile } from '~/types/user';
import { USER_CATEGORIES, REGIONS, CITIES } from '~/constants/registration-constants';
import AFormInput from '~/components/atoms/a-form-input';
import AFormSelect from '~/components/atoms/a-form-select';
import AFormTextarea from '~/components/atoms/a-form-textarea';

const validationSchema = yup.object({
  date_of_birth: yup.string()
    .required('Date of birth is required')
    .test('age', 'You must be between 18 and 100 years old', (value) => {
      if (!value) return false;
      const age = Math.floor(
        (Date.now() - new Date(value).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
      );
      return age >= 18 && age <= 100;
    }),
  region: yup.string().required('Region is required'),
  city: yup.string().required('City is required'),
  category: yup.string().required('Category is required'),
  bio: yup.string().max(500, 'Bio must not exceed 500 characters')
});

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
    },
    errors: {
      type: Object as () => Record<string, string>,
      required: true
    }
  },

  emits: ['update:modelValue', 'validate'],

  setup(props, { emit }) {
    const { handleSubmit, errors: validationErrors } = useForm({
      validationSchema,
      initialValues: props.modelValue
    });

    const { value: date_of_birth } = useField('date_of_birth');
    const { value: region } = useField('region');
    const { value: city } = useField('city');
    const { value: category } = useField('category');
    const { value: bio } = useField('bio');

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

    const validate = handleSubmit(async (values) => {
      emit('update:modelValue', values);
      return values;
    });

    return {
      formData,
      validate,
      errors: validationErrors,
      date_of_birth,
      region,
      city,
      category,
      bio,
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