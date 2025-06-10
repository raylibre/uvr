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
    @apply flex gap-4 border-b border-gray-200 mb-4;
  }

  .filter-tab {
    @apply px-6 py-3 text-gray-600 border-b-2 border-transparent transition-colors duration-200 hover:text-blue-600 hover:border-blue-600;

    &.active {
      @apply text-blue-600 border-blue-600 font-semibold;
    }
  }

  .results-count {
    @apply text-sm text-gray-500;
  }
}
</style> 