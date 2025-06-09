<template>
  <div class="a-form-input">
    <label
      v-if="label"
      :for="id"
      class="form-label"
    >
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>

    <div class="input-wrapper">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        class="form-control"
        :class="{ 'has-error': !!error }"
        v-bind="$attrs"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <AIcon
        v-if="icon"
        :name="icon"
        class="input-icon"
      />
    </div>

    <p
      v-if="error"
      class="error-message"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AIcon from '~/components/atoms/a-icon';

export default defineComponent({
  name: 'AFormInput',

  components: {
    AIcon
  },

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
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    required: {
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

  emits: ['update:modelValue']
});
</script>

<style lang="scss" scoped>
.a-form-input {
  @apply w-full;

  .form-label {
    @apply block text-sm font-medium text-gray-700 mb-1;

    .required-mark {
      @apply text-red-500 ml-1;
    }
  }

  .input-wrapper {
    @apply relative;

    .form-control {
      @apply w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
             focus:ring-primary focus:border-primary
             disabled:bg-gray-100 disabled:cursor-not-allowed;

      &.has-error {
        @apply border-red-500 focus:ring-red-500 focus:border-red-500;
      }
    }

    .input-icon {
      @apply absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400;
    }
  }

  .error-message {
    @apply mt-1 text-sm text-red-500;
  }
}
</style> 