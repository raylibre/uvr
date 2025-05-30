<template>
  <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
    <!-- Mobile view -->
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        :disabled="currentPage === 1"
        @click="$emit('update:currentPage', currentPage - 1)"
        class="pagination-item rounded-md"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
      >
        Previous
      </button>
      <button
        :disabled="currentPage === totalPages"
        @click="$emit('update:currentPage', currentPage + 1)"
        class="pagination-item rounded-md"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
      >
        Next
      </button>
    </div>

    <!-- Desktop view -->
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ startItem }}</span>
          to
          <span class="font-medium">{{ endItem }}</span>
          of
          <span class="font-medium">{{ totalItems }}</span>
          results
        </p>
      </div>
      <div>
        <div class="isolate inline-flex -space-x-px rounded-md shadow-sm">
          <button
            :disabled="currentPage === 1"
            @click="$emit('update:currentPage', currentPage - 1)"
            class="pagination-item rounded-l-md"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          >
            Previous
          </button>
          
          <template v-for="page in displayedPages" :key="page">
            <button
              v-if="page !== '...'"
              @click="$emit('update:currentPage', page)"
              class="pagination-item"
              :class="{ 'pagination-item-active': currentPage === page }"
            >
              {{ page }}
            </button>
            <span
              v-else
              class="pagination-item cursor-default"
            >
              ...
            </span>
          </template>

          <button
            :disabled="currentPage === totalPages"
            @click="$emit('update:currentPage', currentPage + 1)"
            class="pagination-item rounded-r-md"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
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