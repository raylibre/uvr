<template>
  <VeeForm
    v-slot="{ errors, meta }"
    class="m-form"
    :validation-schema="schema"
    @submit="handleSubmit"
  >
    <div :class="['space-y-6', { 'opacity-70 pointer-events-none': meta.pending }]">
      <slot :errors="errors" />
    </div>
  </VeeForm>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { Form as VeeForm } from 'vee-validate';
import type { ObjectSchema } from 'yup';
import { useTimeoutFn } from '@vueuse/core';

export default defineComponent({
  name: 'MForm',

  components: {
    VeeForm
  },

  props: {
    schema: {
      type: Object as PropType<ObjectSchema<Record<string, any>>>,
      required: true
    },
    submitDelay: {
      type: Number,
      default: 400
    }
  },

  emits: ['submit'],

  setup(props, { emit }) {
    const { start: startTimeout } = useTimeoutFn(() => {}, props.submitDelay);

    const handleSubmit = async (values: Record<string, unknown>, actions: { resetForm: () => void; setErrors: (errors: Record<string, string>) => void }) => {
      try {
        emit('submit', values);
        await startTimeout();
        actions.resetForm();
      } catch (error) {
        console.error('Form submission error:', error);
        actions.setErrors({ submit: 'An error occurred while submitting the form' });
      }
    };

    return {
      handleSubmit
    };
  }
});
</script>