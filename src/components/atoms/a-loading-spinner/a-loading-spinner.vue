<template>
  <div class="a-loading-spinner" :class="sizeClass">
    <div class="spinner"/>
    <p v-if="text" class="loading-text">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ALoadingSpinner',

  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => ['small', 'medium', 'large'].includes(value)
    },
    text: {
      type: String,
      default: ''
    }
  },

  setup(props) {
    const sizeClass = computed(() => {
      return `loading-${props.size}`;
    });

    return {
      sizeClass
    };
  }
});
</script>

<style lang="scss" scoped>
.a-loading-spinner {
  @apply flex flex-col items-center justify-center text-gray-500;

  .spinner {
    @apply animate-spin rounded-full border-2 border-gray-200;
    border-top-color: #FF6B2C; /* Primary color */
  }

  .loading-text {
    @apply mt-3 text-center;
  }

  &.loading-small {
    .spinner {
      @apply w-6 h-6;
    }

    .loading-text {
      @apply text-sm;
    }
  }

  &.loading-medium {
    .spinner {
      @apply w-12 h-12;
    }

    .loading-text {
      @apply text-base;
    }
  }

  &.loading-large {
    .spinner {
      @apply w-16 h-16;
    }

    .loading-text {
      @apply text-lg;
    }
  }
}
</style> 