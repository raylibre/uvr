<template>
  <section class="o-news-section">
    <h2>Latest News</h2>
    <p class="section-description">Stay updated with our latest activities and initiatives</p>
    <div class="news-grid">
      <article
        v-for="newsItem in newsItems"
        :key="newsItem.id"
        class="news-card"
        @click="$emit('news-click', newsItem.id)"
      >
        <img
          :src="newsItem.image"
          :alt="newsItem.title"
          class="news-image"
        />
        <div class="news-content">
          <h3>{{ newsItem.title }}</h3>
          <p class="news-excerpt">{{ newsItem.excerpt }}</p>
          <time class="news-date">{{ formatDate(newsItem.date) }}</time>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { NewsItem } from '~/interfaces/home';

export default defineComponent({
  name: 'ONewsSection',

  props: {
    newsItems: {
      type: Array as PropType<NewsItem[]>,
      required: true
    }
  },

  emits: ['news-click'],

  setup() {
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    return {
      formatDate
    };
  }
});
</script>

<style lang="scss" scoped>
.o-news-section {
  @apply py-16 bg-gray-50;

  h2 {
    @apply text-4xl font-bold text-center mb-4;
  }

  .section-description {
    @apply text-center text-gray-600 mb-12 max-w-2xl mx-auto;
  }

  .news-grid {
    @apply container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8;
  }

  .news-card {
    @apply bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:transform hover:scale-105;

    .news-image {
      @apply w-full h-48 object-cover;
    }

    .news-content {
      @apply p-6;

      h3 {
        @apply text-xl font-semibold mb-3;
      }

      .news-excerpt {
        @apply text-gray-600 mb-4;
      }

      .news-date {
        @apply text-sm text-gray-500;
      }
    }
  }
}
</style> 