<template>
  <div class="m-load-more-button">
    <AButton
      v-if="hasMore"
      class="load-more-btn"
      variant="primary"
      :loading="isLoading"
      :disabled="isLoading"
      @click="$emit('load-more')"
    >
      <span>Завантажити ще</span>
    </AButton>
    <div v-else-if="showNoMoreMessage" class="no-more-message">
      Усі новини завантажено
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AButton from '~/components/atoms/a-button';

export default defineComponent({
  name: 'MLoadMoreButton',
  components: { AButton },

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
    @apply px-8 py-3 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200;

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