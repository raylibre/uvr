<template>
  <div class="a-textarea">
    <label
      v-if="label"
      :for="id"
      class="label"
    >
      {{ label }}
      <span v-if="required" class="label__required">*</span>
    </label>
    
    <textarea
      :id="id"
      :value="modelValue"
      class="textarea"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :rows="rows"
      v-bind="$attrs"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    
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
  name: 'ATextarea',

  inheritAttrs: false,

  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 4
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
.a-textarea {
  .label {
    @apply block text-sm font-medium text-gray-700 mb-1;

    &__required {
      @apply text-red-500;
    }
  }

  .textarea {
    @apply block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm;
  }

  .error {
    @apply mt-1 text-sm text-red-600;
  }
}
</style> 