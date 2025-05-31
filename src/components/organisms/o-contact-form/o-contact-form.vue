<template>
  <MForm
    :schema="validationSchema"
    @submit="handleSubmit"
    v-slot="{ errors }"
  >
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <MFormField
        name="name"
        id="contact-name"
        :label="t('form.labels.name')"
        :placeholder="t('form.placeholders.name')"
        :rules="{ required: true, min: 2 }"
        :error="errors.name"
      />

      <MFormField
        name="email"
        id="contact-email"
        type="email"
        :label="t('form.labels.email')"
        :placeholder="t('form.placeholders.email')"
        :rules="{ required: true, email: true }"
        :error="errors.email"
      />
    </div>

    <MFormField
      name="subject"
      id="contact-subject"
      :label="t('form.labels.subject')"
      :placeholder="t('form.placeholders.subject')"
      :rules="{ required: true, min: 3 }"
      :error="errors.subject"
    />

    <MFormField
      name="message"
      id="contact-message"
      type="textarea"
      :label="t('form.labels.message')"
      :placeholder="t('form.placeholders.message')"
      :rules="{ required: true, min: 10 }"
      :error="errors.message"
      :rows="6"
    />

    <div class="flex items-center justify-between">
      <label class="flex items-center">
        <Field
          name="subscribe"
          type="checkbox"
          v-slot="{ field }"
        >
          <input
            v-bind="field"
            type="checkbox"
            class="form-checkbox"
          />
        </Field>
        <span class="ml-2 text-sm text-gray-600">
          {{ t('form.labels.subscribe') }}
        </span>
      </label>

      <AButton
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