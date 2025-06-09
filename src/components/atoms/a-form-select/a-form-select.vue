<template>
  <div class="a-form-select" data-at="form-select">
    <label v-if="label" :for="id" class="label">
      {{ label }}
      <span v-if="required" class="label__required">*</span>
    </label>

    <div class="select-wrapper">
      <div v-if="icon" class="select-icon">
        <i :class="[icon, 'select-icon__icon']"/>
      </div>

      <select
        :id="id"
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        class="select"
        :class="{
          'has-icon': icon,
          'has-error': error,
          'is-disabled': disabled
        }"
        v-bind="$attrs"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        @blur="$emit('blur', $event)"
      >
        <option
v-if="placeholder"
value=""
disabled
selected>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>

      <div class="select-arrow">
        <i class="select-arrow__icon fas fa-chevron-down"/>
      </div>
    </div>

    <p v-if="error" :id="`${id}-error`" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export default defineComponent({
  name: 'AFormSelect',

  inheritAttrs: false,

  props: {
    modelValue: {
      type: [String, Number],
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
    options: {
      type: Array as PropType<SelectOption[]>,
      required: true
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
.a-form-select {
  .label {
    @apply block text-sm font-medium text-gray-700 mb-1;

    &__required {
      @apply text-red-500;
    }
  }

  .select-wrapper {
    @apply relative rounded-md shadow-sm;
  }

  .select-icon {
    @apply absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none;

    &__icon {
      @apply text-gray-400 w-5 h-5;
    }
  }

  .select {
    @apply block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm appearance-none pl-4;

    &.has-icon {
      @apply pl-10;
    }

    &.has-error {
      @apply border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500;
    }

    &.is-disabled {
      @apply bg-gray-50 text-gray-500 cursor-not-allowed;
    }
  }

  .select-arrow {
    @apply absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none;

    &__icon {
      @apply text-gray-400 w-4 h-4;
    }
  }

  .error {
    @apply mt-1 text-sm text-red-600;
  }
}
</style> 