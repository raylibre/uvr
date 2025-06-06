<template>
  <div class="m-form-field">
    <label
      v-if="label"
      :for="id"
      class="label"
    >
      {{ label }}
      <span v-if="required" class="label__required">*</span>
    </label>
    
    <div class="field-wrapper">
      <Field
        :id="id"
        v-slot="{ field, errorMessage, meta }"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :rules="rules"
      >
        <component
          :is="fieldComponent"
          v-bind="{
            ...field,
            ...$attrs
          }"
          class="field"
          :class="{
            'has-error': errorMessage,
            'is-valid': meta.valid && meta.touched
          }"
          :placeholder="placeholder"
          :rows="rows"
          :disabled="disabled"
        />
      </Field>

      <ErrorMessage
        v-slot="{ message }"
        :name="name"
      >
        <p class="error">{{ message }}</p>
      </ErrorMessage>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Field, ErrorMessage } from 'vee-validate';
import { useElementSize } from '@vueuse/core';

export default defineComponent({
  name: 'MFormField',

  components: {
    Field,
    ErrorMessage
  },

  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [String, Object, Function],
      default: ''
    },
    rows: {
      type: Number,
      default: 4
    },
    id: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const fieldComponent = computed(() => props.type === 'textarea' ? 'textarea' : 'input');
    
    // Example of using VueUse for responsive textarea
    const { width } = useElementSize(document.body);
    const dynamicRows = computed(() => width.value < 640 ? Math.max(3, props.rows - 1) : props.rows);

    return {
      fieldComponent,
      dynamicRows
    };
  }
});
</script>

<style lang="scss" scoped>
.m-form-field {
  .label {
    @apply block text-sm font-medium text-gray-700 mb-1;

    &__required {
      @apply text-red-500;
    }
  }

  .field-wrapper {
    @apply relative;
  }

  .field {
    @apply block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm;

    &.has-error {
      @apply border-red-500 focus:border-red-500 focus:ring-red-500;
    }

    &.is-valid {
      @apply border-green-500 focus:border-green-500 focus:ring-green-500;
    }
  }

  .error {
    @apply mt-1 text-sm text-red-600;
  }
}
</style> 