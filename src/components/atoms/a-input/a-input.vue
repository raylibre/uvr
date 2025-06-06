<template>
  <div class="a-input">
    <label
      v-if="label"
      :for="id"
      class="label"
    >
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>
    
    <div class="wrapper">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        class="field"
        :class="{ 'field--error': error }"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        v-bind="$attrs"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <div class="icon">
        <slot name="icon-right" />
      </div>
    </div>
    
    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AInput',

  inheritAttrs: false,

  props: {
    modelValue: {
      type: [String, Number],
      default: ''
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
    error: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    }
  },

  emits: ['update:modelValue']
});
</script>

<style lang="scss" scoped>
.a-input {
  // Base component styles
  @apply w-full;

  // Label styles
  .label {
    @apply block mb-2 text-sm font-medium text-gray-700;
  }

  .required-mark {
    @apply text-red-500;
  }

  // Input wrapper styles
  .wrapper {
    @apply relative;
  }

  // Input field styles
  .field {
    @apply block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md
           shadow-sm placeholder-gray-400
           focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
           disabled:bg-gray-100 disabled:text-gray-500;

    &--error {
      @apply border-red-500 focus:ring-red-500 focus:border-red-500;
    }
  }

  // Icon styles
  .icon {
    @apply absolute inset-y-0 right-0 flex items-center pr-3;
  }

  // Error message styles
  .error {
    @apply mt-1 text-sm text-red-600;
  }
}
</style> 