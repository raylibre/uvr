<template>
  <div class="m-load-more-button">
    <button
      v-if="hasMore"
      class="load-more-btn"
      :disabled="isLoading"
      @click="$emit('load-more')"
    >
      <span v-if="!isLoading">Завантажити ще</span>
      <span v-else class="loading-text">
        <svg class="spinner" viewBox="0 0 24 24">
          <circle 
            class="spinner-path" 
            cx="12" 
            cy="12" 
            r="10" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
            stroke-linecap="round"
            stroke-dasharray="60"
            stroke-dashoffset="60"
          />
        </svg>
        Завантаження...
      </span>
    </button>
    <div v-else-if="showNoMoreMessage" class="no-more-message">
      Усі новини завантажено
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MLoadMoreButton',

  props: {
    hasMore: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    showNoMoreMessage: {
      type: Boolean,
      default: true
    }
  },

  emits: ['load-more']
});
</script>

<style lang="scss" scoped>
.m-load-more-button {
  @apply flex justify-center items-center py-8;

  .load-more-btn {
    @apply px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200;

    .loading-text {
      @apply flex items-center gap-2;

      .spinner {
        @apply w-4 h-4;
        animation: spin 1s linear infinite;

        .spinner-path {
          animation: dash 1.5s ease-in-out infinite;
        }
      }
    }
  }

  .no-more-message {
    @apply text-gray-500 text-center;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style> 