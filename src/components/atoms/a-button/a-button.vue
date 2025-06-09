<template>
  <button
    :type="type"
    class="a-button"
    :class="[
      `variant-${variant}`,
      `size-${size}`,
      { 'is-loading': loading }
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <AIcon
      v-if="loading"
      name="fas fa-spinner fa-spin"
      class="icon icon--loading"
    />
    <AIcon
      v-else-if="icon"
      :name="icon"
      class="icon"
    />
    <span class="button-content">
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AIcon from '~/components/atoms/a-icon';

export default defineComponent({
  name: 'AButton',

  components: {
    AIcon
  },

  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'outline', 'text'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
    },
    type: {
      type: String as () => 'button' | 'submit' | 'reset',
      default: 'button'
    },
    icon: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click']
});
</script>

<style lang="scss" scoped>
.a-button {
  // Base styles
  .button-content {
    @apply inline-block;
  }

  .icon {
    @apply mr-2;

    &--loading {
      @apply animate-spin;
    }
  }

  // Core button styles
  @apply inline-flex items-center justify-center rounded-md font-medium transition-colors
         focus:outline-none focus:ring-2 focus:ring-offset-2;

  // Variants
  &.variant-primary {
    @apply bg-primary text-white hover:bg-primary-dark
           focus:ring-primary disabled:bg-primary-light;
  }

  &.variant-secondary {
    @apply bg-gray-600 text-white hover:bg-gray-700
           focus:ring-gray-500 disabled:bg-gray-400;
  }

  &.variant-outline {
    @apply border border-gray-300 bg-white text-gray-700
           hover:bg-gray-50 focus:ring-primary disabled:bg-gray-100;
  }

  &.variant-text {
    @apply text-primary hover:text-primary-dark focus:ring-primary
           disabled:text-gray-400 bg-transparent;
  }

  // Sizes
  &.size-sm {
    @apply px-3 py-1.5 text-sm;
  }

  &.size-md {
    @apply px-4 py-2 text-base;
  }

  &.size-lg {
    @apply px-6 py-3 text-lg;
  }

  // States
  &.is-loading {
    @apply cursor-not-allowed;
  }
}
</style>