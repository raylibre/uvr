<template>
  <div class="a-form-textarea" data-at="form-textarea">
    <label v-if="label" :for="id" class="label">
      {{ label }}
      <span v-if="required" class="label__required">*</span>
    </label>

    <div class="textarea-wrapper">
      <div v-if="icon" class="textarea-icon">
        <i :class="[icon, 'textarea-icon__icon']"/>
      </div>

      <textarea
        :id="id"
        :value="modelValue"
        :rows="rows"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        class="textarea"
        :class="{
          'has-icon': icon,
          'has-error': error,
          'is-disabled': disabled
        }"
        v-bind="$attrs"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        @blur="$emit('blur', $event)"
      />
    </div>

    <p v-if="error" :id="`${id}-error`" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AFormTextarea',

  inheritAttrs: false,

  props: {
    modelValue: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 3
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
    icon: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue', 'blur']
});
</script>

<style lang="scss" scoped>
.a-form-textarea {
  .label {
    @apply block text-sm font-medium text-gray-700 mb-1;

    &__required {
      @apply text-red-500;
    }
  }

  .textarea-wrapper {
    @apply relative rounded-md shadow-sm;
  }

  .textarea-icon {
    @apply absolute top-3 left-3 pointer-events-none;

    &__icon {
      @apply text-gray-400 w-5 h-5;
    }

  }

  .textarea {
    @apply block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm pl-4;

    &.has-icon {
      @apply pl-10;
    }

    &.has-error {
      @apply border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500;
    }

    &.is-disabled {
      @apply bg-gray-50 text-gray-500 cursor-not-allowed;
    }
  }

  .error {
    @apply mt-1 text-sm text-red-600;
  }
}
</style> 