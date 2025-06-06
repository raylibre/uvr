<template>
  <div class="a-radio-group" data-at="radio-group">
    <label v-if="label" class="label">
      {{ label }}
      <span v-if="required" class="label__required">*</span>
    </label>

    <div
      class="options"
      :class="{
        'is-inline': inline
      }"
    >
      <div
        v-for="option in options"
        :key="option.value"
        class="option"
        :class="{
          'is-inline': inline
        }"
      >
        <label
          class="option__label"
          :class="{
            'is-disabled': disabled
          }"
        >
          <div class="option__input-wrapper">
            <input
              type="radio"
              :name="name"
              :value="option.value"
              :checked="modelValue === option.value"
              :disabled="disabled || option.disabled"
              class="option__input"
              :class="{
                'has-error': error
              }"
              @change="$emit('update:modelValue', option.value)"
            />
          </div>
          <div class="option__content">
            <span
              class="option__title"
              :class="{
                'is-disabled': disabled || option.disabled
              }"
            >
              {{ option.label }}
            </span>
            <p
              v-if="option.description"
              class="option__description"
              :class="{
                'is-disabled': disabled || option.disabled
              }"
            >
              {{ option.description }}
            </p>
          </div>
        </label>
      </div>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface RadioOption {
  value: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
}

export default defineComponent({
  name: 'ARadioGroup',

  props: {
    modelValue: {
      type: [String, Number],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    options: {
      type: Array as PropType<RadioOption[]>,
      required: true
    },
    label: {
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
    inline: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue']
});
</script>

<style lang="scss" scoped>
.a-radio-group {
  .label {
    @apply block text-sm font-medium text-gray-700 mb-2;

    &__required {
      @apply text-red-500;
    }
  }

  .options {
    @apply space-y-4;

    &.is-inline {
      @apply flex flex-wrap gap-4 space-y-0;
    }
  }

  .option {
    &.is-inline {
      @apply flex-1 min-w-[150px];
    }

    &__label {
      @apply relative flex items-start cursor-pointer;

      &.is-disabled {
        @apply cursor-not-allowed opacity-50;
      }
    }

    &__input-wrapper {
      @apply flex h-5 items-center;
    }

    &__input {
      @apply h-4 w-4 border-gray-300 text-primary focus:ring-primary disabled:cursor-not-allowed;

      &.has-error {
        @apply border-red-300 text-red-600 focus:ring-red-500;
      }
    }

    &__content {
      @apply ml-3 text-sm;
    }

    &__title {
      @apply font-medium text-gray-900;

      &.is-disabled {
        @apply text-gray-500;
      }
    }

    &__description {
      @apply text-gray-500;

      &.is-disabled {
        @apply text-gray-400;
      }
    }
  }

  .error {
    @apply mt-1 text-sm text-red-600;
  }
}
</style> 