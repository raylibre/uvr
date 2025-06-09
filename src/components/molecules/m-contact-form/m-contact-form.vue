<template>
  <form class="m-contact-form" @submit.prevent="handleSubmit">
    <div class="form-grid">
      <AInput
        id="name"
        v-model="form.name"
        label="Name"
        placeholder="Enter your name"
        required
        :error="errors.name"
      />

      <AInput
        id="email"
        v-model="form.email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        required
        :error="errors.email"
      />
    </div>

    <AInput
      id="subject"
      v-model="form.subject"
      label="Subject"
      placeholder="Enter message subject"
      required
      :error="errors.subject"
    />

    <ATextarea
      id="message"
      v-model="form.message"
      label="Message"
      placeholder="Enter your message"
      required
      :error="errors.message"
      :rows="6"
    />

    <div class="form-footer">
      <label class="subscribe">
        <input
          v-model="form.subscribe"
          type="checkbox"
          class="subscribe__checkbox"
        />
        <span class="subscribe__label">
          Subscribe to our newsletter
        </span>
      </label>

      <AButton
        type="submit"
        variant="primary"
        :disabled="isSubmitting"
      >
        <template v-if="isSubmitting" #icon-left>
          <svg
            class="loading-spinner"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="loading-spinner__track"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="loading-spinner__path"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </template>
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </AButton>
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

<style lang="scss" scoped>
.m-contact-form {
  @apply space-y-6;

  .form-grid {
    @apply grid grid-cols-1 gap-6 sm:grid-cols-2;
  }

  .form-footer {
    @apply flex items-center justify-between;
  }

  .subscribe {
    @apply flex items-center;

    &__checkbox {
      @apply form-checkbox;
    }

    &__label {
      @apply ml-2 text-sm text-gray-600;
    }
  }

  .loading-spinner {
    @apply animate-spin -ml-1 mr-2 h-4 w-4;

    &__track {
      @apply opacity-25;
    }

    &__path {
      @apply opacity-75;
    }
  }
}
</style>