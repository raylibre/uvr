<template>
  <div class="m-registration-step-three" data-at="registration-step-three">
    <h2 class="title">Emergency Contact Information</h2>
    <p class="description">Please provide your address and emergency contact details.</p>

    <form @submit.prevent class="form">
      <AFormTextarea
        v-model="formData.address"
        :id="'register-address'"
        label="Full Address"
        :placeholder="'Enter your complete address...'"
        :required="true"
        :error="errors.address"
        :rows="3"
        icon="fas fa-home"
      />

      <div class="form-grid">
        <AFormInput
          v-model="formData.emergency_contact_name"
          :id="'register-emergency-contact-name'"
          label="Emergency Contact Name"
          type="text"
          :required="true"
          :error="errors.emergency_contact_name"
          icon="fas fa-user-shield"
        />

        <AFormInput
          v-model="formData.emergency_contact_phone"
          :id="'register-emergency-contact-phone'"
          label="Emergency Contact Phone"
          type="tel"
          :required="true"
          :error="errors.emergency_contact_phone"
          icon="fas fa-phone-alt"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import type { UserProfile } from '~/types/user';
import AFormInput from '~/components/atoms/a-form-input';
import AFormTextarea from '~/components/atoms/a-form-textarea';

const validationSchema = yup.object({
  address: yup.string()
    .required('Address is required')
    .min(10, 'Please provide a complete address'),
  emergency_contact_name: yup.string()
    .required('Emergency contact name is required')
    .min(2, 'Please enter a valid name'),
  emergency_contact_phone: yup.string()
    .required('Emergency contact phone is required')
    .matches(/^\+?[\d\s-]{10,}$/, 'Please enter a valid phone number')
});

export default defineComponent({
  name: 'MRegistrationStepThree',

  components: {
    AFormInput,
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

    const { value: address } = useField('address');
    const { value: emergency_contact_name } = useField('emergency_contact_name');
    const { value: emergency_contact_phone } = useField('emergency_contact_phone');

    const formData = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    });

    const validate = handleSubmit(async (values) => {
      emit('update:modelValue', values);
      return values;
    });

    return {
      formData,
      validate,
      errors: validationErrors,
      address,
      emergency_contact_name,
      emergency_contact_phone
    };
  }
});
</script>

<style lang="scss" scoped>
.m-registration-step-three {
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