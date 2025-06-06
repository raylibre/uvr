<template>
  <MForm
    v-slot="{ errors }"
    class="o-contact-form"
    :schema="validationSchema"
    @submit="handleSubmit"
  >
    <div class="form-grid">
      <MFormField
        id="contact-name"
        name="name"
        :label="t('form.labels.name')"
        :placeholder="t('form.placeholders.name')"
        :rules="{ required: true, min: 2 }"
        :error="errors.name"
      />

      <MFormField
        id="contact-email"
        name="email"
        type="email"
        :label="t('form.labels.email')"
        :placeholder="t('form.placeholders.email')"
        :rules="{ required: true, email: true }"
        :error="errors.email"
      />
    </div>

    <MFormField
      id="contact-subject"
      name="subject"
      :label="t('form.labels.subject')"
      :placeholder="t('form.placeholders.subject')"
      :rules="{ required: true, min: 3 }"
      :error="errors.subject"
    />

    <MFormField
      id="contact-message"
      name="message"
      type="textarea"
      :label="t('form.labels.message')"
      :placeholder="t('form.placeholders.message')"
      :rules="{ required: true, min: 10 }"
      :error="errors.message"
      :rows="6"
    />

    <div class="form-footer">
      <label class="subscribe">
        <Field
          v-slot="{ field }"
          name="subscribe"
          type="checkbox"
        >
          <input
            v-bind="field"
            type="checkbox"
            class="subscribe__checkbox"
          />
        </Field>
        <span class="subscribe__label">
          {{ t('form.labels.subscribe') }}
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
        {{ isSubmitting ? t('common.buttons.sending') : t('common.buttons.send') }}
      </AButton>
    </div>
  </MForm>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { object, string, boolean } from 'yup';
import { Field } from 'vee-validate';
import { useTimeoutFn } from '@vueuse/core';
import type { ContactFormData } from '~/types/form';
import MForm from '~/components/molecules/m-form/m-form.vue';
import MFormField from '~/components/molecules/m-form-field/m-form-field.vue';
import AButton from '~/components/atoms/a-button/a-button.vue';

export default defineComponent({
  name: 'OContactForm',

  components: {
    MForm,
    MFormField,
    Field,
    AButton
  },

  emits: ['submit'],

  setup(_, { emit }) {
    const { t } = useI18n();
    const isSubmitting = ref(false);
    const { start: startTimeout } = useTimeoutFn(() => {
      isSubmitting.value = false;
    }, 1000);

    const validationSchema = object({
      name: string()
        .required(t('form.validation.required', { field: t('form.labels.name') }))
        .min(2, t('form.validation.minLength', { field: t('form.labels.name'), min: 2 })),
      email: string()
        .required(t('form.validation.required', { field: t('form.labels.email') }))
        .email(t('form.validation.email')),
      subject: string()
        .required(t('form.validation.required', { field: t('form.labels.subject') }))
        .min(3, t('form.validation.minLength', { field: t('form.labels.subject'), min: 3 })),
      message: string()
        .required(t('form.validation.required', { field: t('form.labels.message') }))
        .min(10, t('form.validation.minLength', { field: t('form.labels.message'), min: 10 })),
      subscribe: boolean()
    });

    const handleSubmit = async (values: ContactFormData) => {
      isSubmitting.value = true;
      try {
        emit('submit', values);
        await startTimeout();
      } catch (error) {
        console.error('Form submission error:', error);
      }
    };

    return {
      t,
      validationSchema,
      isSubmitting,
      handleSubmit
    };
  }
});
</script>

<style lang="scss" scoped>
.o-contact-form {
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