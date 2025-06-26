<template>
  <div class="m-news-filter">
    <div class="filter-tabs">
      <button
        class="filter-tab"
        :class="{ active: selectedCategory === null }"
        @click="$emit('filter-change', null)"
      >
        Усі новини
      </button>
      <button
        class="filter-tab"
        :class="{ active: selectedCategory === 'general' }"
        @click="$emit('filter-change', 'general')"
      >
        Загальні
      </button>
      <button
        class="filter-tab"
        :class="{ active: selectedCategory === 'project_related' }"
        @click="$emit('filter-change', 'project_related')"
      >
        Проєкти
      </button>
    </div>
    <div v-if="totalCount > 0" class="results-count">
      Знайдено {{ totalCount }} {{ getNewsCountText(totalCount) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'MNewsFilter',

  props: {
    selectedCategory: {
      type: String as PropType<'general' | 'project_related' | null>,
      default: null
    },
    totalCount: {
      type: Number,
      default: 0
    }
  },

  emits: ['filter-change'],

  setup() {
    const getNewsCountText = (count: number) => {
      const lastDigit = count % 10;
      const lastTwoDigits = count % 100;
      
      if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return 'новин';
      }
      
      if (lastDigit === 1) {
        return 'новину';
      }
      
      if (lastDigit >= 2 && lastDigit <= 4) {
        return 'новини';
      }
      
      return 'новин';
    };

    return {
      getNewsCountText
    };
  }
});
</script>

<style lang="scss" scoped>
.m-news-filter {
  @apply mb-8;

  .filter-tabs {
    @apply flex gap-2 md:gap-3 mb-2;
  }

  .filter-tab {
    @apply inline-flex items-center px-3 md:px-2 py-2 md:py-1.5 text-sm font-medium text-gray-700 rounded-md transition-colors;
    @apply block w-full md:w-auto;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;

    &:hover,
    &.active {
      @apply bg-blue-50 text-blue-dark;
    }
  }

  .results-count {
    @apply text-sm text-gray-500;
  }
}
</style> 