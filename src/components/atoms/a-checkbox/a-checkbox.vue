<template>
  <div class="a-checkbox" data-at="checkbox">
    <div class="checkbox__container">
      <div class="checkbox__input-wrapper">
        <input
          :id="id"
          type="checkbox"
          :name="name"
          :checked="modelValue"
          :required="required"
          :disabled="disabled"
          :aria-describedby="error ? `${id}-error` : undefined"
          :class="[
            'checkbox__input',
            error ? 'checkbox__input--error' : '',
            disabled ? 'checkbox__input--disabled' : 'checkbox__input--interactive'
          ]"
          v-bind="$attrs"
          @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
          @blur="$emit('blur', $event)"
        />
      </div>
      <div class="checkbox__content">
        <label
          v-if="label"
          :for="id"
          class="checkbox__label"
          :class="{ 'checkbox__label--interactive': !disabled }"
        >
          {{ label }}
          <span v-if="required" class="checkbox__required">*</span>
        </label>
        <slot/>
        <p
          v-if="description"
          :id="`${id}-description`"
          class="checkbox__description"
        >
          {{ description }}
        </p>
      </div>
    </div>
    <p
      v-if="error"
      :id="`${id}-error`"
      class="checkbox__error"
    >
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ACheckbox',

  inheritAttrs: false,

  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    description: {
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
    }
  },

  emits: ['update:modelValue', 'blur']
});
</script>

<style lang="scss" scoped>
.a-checkbox {
  @apply w-full;

  .checkbox__container {
    @apply relative flex items-center;
  }

  .checkbox__input-wrapper {
    @apply flex h-5 items-center;
  }

  .checkbox__input {
    @apply h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary;

    &--error {
      @apply border-red-300 text-red-600 focus:ring-red-500;
    }

    &--disabled {
      @apply cursor-not-allowed bg-gray-100;
    }

    &--interactive {
      @apply cursor-pointer;
    }
  }

  .checkbox__content {
    @apply ml-3;
  }

  .checkbox__label {
    @apply text-sm font-medium text-gray-700;

    &--interactive {
      @apply cursor-pointer;
    }
  }

  .checkbox__required {
    @apply text-red-500;
  }

  .checkbox__description {
    @apply text-sm text-gray-500;
  }

  .checkbox__error {
    @apply mt-1 text-sm text-red-600;
  }
}
</style> 