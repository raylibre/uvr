<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <a-input
        v-model="form.name"
        id="name"
        label="Name"
        placeholder="Enter your name"
        required
        :error="errors.name"
      />

      <a-input
        v-model="form.email"
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        required
        :error="errors.email"
      />
    </div>

    <a-input
      v-model="form.subject"
      id="subject"
      label="Subject"
      placeholder="Enter message subject"
      required
      :error="errors.subject"
    />

    <a-textarea
      v-model="form.message"
      id="message"
      label="Message"
      placeholder="Enter your message"
      required
      :error="errors.message"
      rows="6"
    />

    <div class="flex items-center justify-between">
      <label class="flex items-center">
        <input
          type="checkbox"
          v-model="form.subscribe"
          class="form-checkbox"
        />
        <span class="ml-2 text-sm text-gray-600">
          Subscribe to our newsletter
        </span>
      </label>

      <a-button
        type="submit"
        variant="primary"
        :disabled="isSubmitting"
      >
        <template #icon-left v-if="isSubmitting">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </template>
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </a-button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import AInput from '~/components/atoms/a-input/a-input.vue';
import ATextarea from '~/components/atoms/a-textarea/a-textarea.vue';
import AButton from '~/components/atoms/a-button/a-button.vue';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  subscribe: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default defineComponent({
  name: 'MContactForm',

  components: {
    AInput,
    ATextarea,
    AButton
  },

  emits: ['submit'],

  setup(_, { emit }) {
    const form = reactive<FormData>({
      name: '',
      email: '',
      subject: '',
      message: '',
      subscribe: false
    });

    const errors = reactive<FormErrors>({});
    const isSubmitting = ref(false);

    const validateForm = (): boolean => {
      errors.name = !form.name ? 'Name is required' : '';
      errors.email = !form.email ? 'Email is required' : '';
      errors.subject = !form.subject ? 'Subject is required' : '';
      errors.message = !form.message ? 'Message is required' : '';

      return !Object.values(errors).some(error => error);
    };

    const handleSubmit = async () => {
      if (!validateForm()) return;

      isSubmitting.value = true;
      
      try {
        await emit('submit', { ...form });
        // Reset form after successful submission
        Object.assign(form, {
          name: '',
          email: '',
          subject: '',
          message: '',
          subscribe: false
        });
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      form,
      errors,
      isSubmitting,
      handleSubmit
    };
  }
});
</script> 