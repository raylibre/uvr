<template>
  <section class="o-news-section">
    <h2>Останні новини</h2>
    <p class="section-description">Слідкуйте за нашими останніми подіями та ініціативами</p>
    <div class="news-grid">
      <article
        v-for="newsItem in newsItems"
        :key="newsItem.id"
        class="news-card"
        @click="$emit('news-click', newsItem.id)"
      >
        <img
          :src="newsItem.featured_image_url"
          :alt="newsItem.title"
          class="news-image"
        />
        <div class="news-content">
          <h3>{{ newsItem.title }}</h3>
          <p class="news-excerpt">{{ newsItem.short_description }}</p>
          <div class="news-meta">
            <time class="news-date">{{ formatDate(newsItem.published_at) }}</time>
            <span class="news-author">{{ newsItem.author_name }}</span>
          </div>
        </div>
      </article>
    </div>

    <!-- View All News Button -->
    <div class="view-all-container">
      <button
        class="view-all-btn"
        @click="$emit('view-all-news')"
      >
        Дивитися всі новини
        <svg class="arrow-icon" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
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

  emits: ['news-click', 'view-all-news'],

  setup() {
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('uk-UA', {
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
    @apply container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12;
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

      .news-meta {
        @apply flex justify-between items-center text-sm text-gray-500;

        .news-date {
          @apply font-medium;
        }

        .news-author {
          @apply italic;
        }
      }
    }
  }

  .view-all-container {
    @apply container mx-auto text-center;

    .view-all-btn {
      @apply inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold;

      .arrow-icon {
        @apply w-5 h-5 transition-transform duration-200;
      }

      &:hover .arrow-icon {
        @apply transform translate-x-1;
      }
    }
  }
}
</style>