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
          icon="fas fa-user-shield"
        />

        <AFormInput
          v-model="formData.emergency_contact_phone"
          :id="'register-emergency-contact-phone'"
          label="Emergency Contact Phone"
          type="tel"
          :required="true"
          icon="fas fa-phone-alt"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { UserProfile } from '~/types/user';
import AFormInput from '~/components/atoms/a-form-input';
import AFormTextarea from '~/components/atoms/a-form-textarea';

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