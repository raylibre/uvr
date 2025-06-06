<template>
  <nav class="m-pagination">
    <!-- Mobile view -->
    <div class="mobile-nav">
      <button
        :disabled="currentPage === 1"
        class="nav-button nav-button--prev"
        :class="{ 'is-disabled': currentPage === 1 }"
        @click="$emit('update:currentPage', currentPage - 1)"
      >
        Previous
      </button>
      <button
        :disabled="currentPage === totalPages"
        class="nav-button nav-button--next"
        :class="{ 'is-disabled': currentPage === totalPages }"
        @click="$emit('update:currentPage', currentPage + 1)"
      >
        Next
      </button>
    </div>

    <!-- Desktop view -->
    <div class="desktop-nav">
      <div class="info">
        <p class="info__text">
          Showing
          <span class="info__number">{{ startItem }}</span>
          to
          <span class="info__number">{{ endItem }}</span>
          of
          <span class="info__number">{{ totalItems }}</span>
          results
        </p>
      </div>
      <div class="pages">
        <div class="pages__list">
          <button
            :disabled="currentPage === 1"
            class="nav-button nav-button--prev"
            :class="{ 'is-disabled': currentPage === 1 }"
            @click="$emit('update:currentPage', currentPage - 1)"
          >
            Previous
          </button>
          
          <template v-for="page in displayedPages" :key="page">
            <button
              v-if="page !== '...'"
              class="page-button"
              :class="{ 'is-active': currentPage === page }"
              @click="$emit('update:currentPage', page)"
            >
              {{ page }}
            </button>
            <span
              v-else
              class="page-ellipsis"
            >
              ...
            </span>
          </template>

          <button
            :disabled="currentPage === totalPages"
            class="nav-button nav-button--next"
            :class="{ 'is-disabled': currentPage === totalPages }"
            @click="$emit('update:currentPage', currentPage + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'MPagination',

  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    totalItems: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    }
  },

  emits: ['update:currentPage'],

  setup(props) {
    const startItem = computed(() => ((props.currentPage - 1) * props.perPage) + 1);
    const endItem = computed(() => Math.min(props.currentPage * props.perPage, props.totalItems));

    const displayedPages = computed(() => {
      const pages: (number | string)[] = [];
      const maxDisplayed = 7;

      if (props.totalPages <= maxDisplayed) {
        return Array.from({ length: props.totalPages }, (_, i) => i + 1);
      }

      pages.push(1);
      
      if (props.currentPage > 3) {
        pages.push('...');
      }

      for (let i = Math.max(2, props.currentPage - 1); i <= Math.min(props.totalPages - 1, props.currentPage + 1); i++) {
        pages.push(i);
      }

      if (props.currentPage < props.totalPages - 2) {
        pages.push('...');
      }

      pages.push(props.totalPages);

      return pages;
    });

    return {
      startItem,
      endItem,
      displayedPages
    };
  }
});
</script>

<style lang="scss" scoped>
.m-pagination {
  @apply flex items-center justify-between border-t border-gray-200 px-4 sm:px-0;

  // Mobile navigation
  .mobile-nav {
    @apply flex flex-1 justify-between sm:hidden;
  }

  // Desktop navigation
  .desktop-nav {
    @apply hidden sm:flex sm:flex-1 sm:items-center sm:justify-between;
  }

  // Info section
  .info {
    &__text {
      @apply text-sm text-gray-700;
    }

    &__number {
      @apply font-medium;
    }
  }

  // Pages section
  .pages {
    &__list {
      @apply isolate inline-flex -space-x-px rounded-md shadow-sm;
    }
  }

  // Navigation buttons
  .nav-button {
    @apply relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700
           bg-white hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1
           focus:ring-primary focus:border-primary;

    &--prev {
      @apply rounded-l-md;
    }

    &--next {
      @apply rounded-r-md;
    }

    &.is-disabled {
      @apply opacity-50 cursor-not-allowed;
    }
  }

  // Page buttons
  .page-button {
    @apply relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700
           bg-white hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1
           focus:ring-primary focus:border-primary;

    &.is-active {
      @apply z-10 bg-primary text-white hover:bg-primary-dark focus:z-20;
    }
  }

  // Ellipsis
  .page-ellipsis {
    @apply relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700
           bg-white cursor-default;
  }
}
</style> 