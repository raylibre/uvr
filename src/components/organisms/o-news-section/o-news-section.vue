<template>
  <section class="o-news-section">
    <div class="container mx-auto px-4 py-16">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">Останні новини</h2>
        <p class="section-description">Слідкуйте за нашими останніми подіями та ініціативами</p>
      </div>

      <!-- News Content -->
      <div class="news-content">
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
            <div class="news-content-inner">
              <h3 class="news-title">{{ newsItem.title }}</h3>
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
          <AButton
            variant="outline"
            size="lg"
            icon="fas fa-arrow-right"
            @click="$emit('view-all-news')"
          >
            Дивитися всі новини
          </AButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { NewsItem } from '~/interfaces/home';
import AButton from '~/components/atoms/a-button';

export default defineComponent({
  name: 'ONewsSection',

  components: {
    AButton
  },

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
  @apply bg-gray-50;

  .section-header {
    @apply text-center mb-12;

    .section-title {
      @apply text-4xl font-bold text-gray-900 mb-4;
    }

    .section-description {
      @apply text-xl text-gray-600 max-w-3xl mx-auto;
    }
  }

  .news-content {
    @apply space-y-8;

    .news-grid {
      @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8;
    }

    .news-card {
      @apply bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105;

      .news-image {
        @apply w-full h-48 object-cover;
      }

      .news-content-inner {
        @apply p-6;

        .news-title {
          @apply text-xl font-semibold text-gray-900 mb-3;
        }

        .news-excerpt {
          @apply text-gray-700 leading-relaxed mb-4;
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
      @apply text-center;
    }
  }
}
</style>