<template>
  <section id="contact" class="bg-gray-50 py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-h2 font-heading font-bold text-gray-900 mb-4">
            {{ t('home.contact.title') }}
          </h2>
          <p class="text-xl text-gray-600">
            {{ t('home.contact.description') }}
          </p>
        </div>

        <OContactForm @submit="onSubmit" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ContactFormData } from '~/types/form';
import OContactForm from '~/components/organisms/o-contact-form/o-contact-form.vue';

export default defineComponent({
  name: 'OContactSection',

  components: {
    OContactForm
  },

  emits: ['submit'],

  setup(_, { emit }) {
    const { t } = useI18n();

    const onSubmit = (formData: ContactFormData) => {
      emit('submit', formData);
    };

    return {
      t,
      onSubmit
    };
  }
});
</script> 