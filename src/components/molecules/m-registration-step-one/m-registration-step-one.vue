<template>
  <div class="m-registration-step-one">
    <h2 class="title">Personal Details</h2>
    <p class="description">Please provide your personal information to create your account.</p>

    <form @submit.prevent class="form">
      <div class="form-grid">
        <AFormInput
          v-model="formData.first_name"
          :id="'register-first-name'"
          label="First Name"
          type="text"
          :required="true"
          :error="errors.first_name"
          icon="fas fa-user"
        />

        <AFormInput
          v-model="formData.last_name"
          :id="'register-last-name'"
          label="Last Name"
          type="text"
          :required="true"
          :error="errors.last_name"
          icon="fas fa-user"
        />
      </div>

      <AFormInput
        v-model="formData.patronymic"
        :id="'register-patronymic'"
        label="Patronymic (Optional)"
        type="text"
        :error="errors.patronymic"
        icon="fas fa-user"
      />

      <AFormInput
        v-model="formData.email"
        :id="'register-email'"
        label="Email Address"
        type="email"
        :required="true"
        :error="errors.email"
        icon="fas fa-envelope"
      />

      <AFormInput
        v-model="formData.phone"
        :id="'register-phone'"
        label="Phone Number"
        type="tel"
        :required="true"
        :error="errors.phone"
        icon="fas fa-phone"
      />

      <div class="form-grid">
        <AFormInput
          v-model="formData.password"
          :id="'register-password'"
          label="Password"
          type="password"
          :required="true"
          :error="errors.password"
          icon="fas fa-lock"
        />

        <AFormInput
          v-model="formData.password_confirmation"
          :id="'register-password-confirmation'"
          label="Confirm Password"
          type="password"
          :required="true"
          :error="errors.password_confirmation"
          icon="fas fa-lock"
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

const validationSchema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  patronymic: yup.string(),
  email: yup.string().required('Email is required').email('Invalid email format'),
  phone: yup.string()
    .required('Phone number is required')
    .matches(/^\+?[\d\s-]{10,}$/, 'Invalid phone number format'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  password_confirmation: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match')
});

export default defineComponent({
  name: 'MRegistrationStepOne',

  components: {
    AFormInput
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

    const { value: first_name } = useField('first_name');
    const { value: last_name } = useField('last_name');
    const { value: patronymic } = useField('patronymic');
    const { value: email } = useField('email');
    const { value: phone } = useField('phone');
    const { value: password } = useField('password');
    const { value: password_confirmation } = useField('password_confirmation');

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
      first_name,
      last_name,
      patronymic,
      email,
      phone,
      password,
      password_confirmation
    };
  }
});
</script>

<style lang="scss" scoped>
.m-registration-step-one {
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