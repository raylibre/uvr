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
          icon="fas fa-user"
        />

        <AFormInput
          v-model="formData.last_name"
          :id="'register-last-name'"
          label="Last Name"
          type="text"
          :required="true"
          icon="fas fa-user"
        />
      </div>

      <AFormInput
        v-model="formData.patronymic"
        :id="'register-patronymic'"
        label="Patronymic (Optional)"
        type="text"
        icon="fas fa-user"
      />

      <AFormInput
        v-model="formData.email"
        :id="'register-email'"
        label="Email Address"
        type="email"
        :required="true"
        icon="fas fa-envelope"
      />

      <AFormInput
        v-model="formData.phone"
        :id="'register-phone'"
        label="Phone Number"
        type="tel"
        :required="true"
        icon="fas fa-phone"
      />

      <div class="form-grid">
        <AFormInput
          v-model="formData.password"
          :id="'register-password'"
          label="Password"
          type="password"
          :required="true"
          icon="fas fa-lock"
        />

        <AFormInput
          v-model="formData.password_confirmation"
          :id="'register-password-confirmation'"
          label="Confirm Password"
          type="password"
          :required="true"
          icon="fas fa-lock"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { UserProfile } from '~/types/user';
import AFormInput from '~/components/atoms/a-form-input';

export default defineComponent({
  name: 'MRegistrationStepOne',

  components: {
    AFormInput
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

    return {
      formData
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