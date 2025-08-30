<template>
  <div class="p-news">
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">Новини</h1>
        <p class="hero-subtitle">
          Слідкуйте за останніми подіями та досягненнями нашої організації
        </p>
      </div>
    </section>
    <div class="container mx-auto px-4 py-8">
      <!-- News Filter -->
      <MNewsFilter
        :selected-category="selectedCategory"
        :total-count="totalReturned"
        @filter-change="handleFilterChange"
      />

      <!-- News Content -->
      <div v-loading="isLoading && newsItems.length === 0" class="news-content">
        <!-- News Grid -->
        <div v-if="newsItems.length > 0" class="news-grid">
          <article
            v-for="newsItem in newsItems"
            :key="newsItem.id"
            class="news-card"
            @click="handleNewsClick(newsItem.id)"
          >
            <img
              :src="newsItem.featured_image_url"
              :alt="newsItem.title"
              class="news-image"
              @error="handleImageError"
            />
            <div class="news-content">
              <div class="news-category">
                <span 
                  class="category-badge"
                  :class="getCategoryClass(newsItem.category)"
                >
                  {{ getCategoryLabel(newsItem.category) }}
                </span>
                <span v-if="newsItem.related_project_title" class="project-link">
                  {{ newsItem.related_project_title }}
                </span>
              </div>
              <h2 class="news-title">{{ newsItem.title }}</h2>
              <p class="news-excerpt">{{ newsItem.short_description }}</p>
              <div class="news-meta">
                <time class="news-date">{{ formatDate(newsItem.published_at) }}</time>
                <span class="news-author">{{ newsItem.author_name }}</span>
              </div>
              <div v-if="newsItem.views_count > 0" class="news-views">
                👁 {{ newsItem.views_count }}
              </div>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div v-else-if="!isLoading" class="empty-state">
          <div class="empty-icon">📰</div>
          <h3>Новин не знайдено</h3>
          <p>Спробуйте змінити фільтр або повернутися пізніше</p>
        </div>
      </div>

      <!-- Load More Button -->
      <MLoadMoreButton
        v-if="newsItems.length > 0"
        :has-more="hasMore"
        :is-loading="isLoading"
        @load-more="loadMoreNews"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNewsStore } from '~/composables/use-news-store';
import MNewsFilter from '~/components/molecules/m-news-filter';
import MLoadMoreButton from '~/components/molecules/m-load-more-button';
import { DEFAULT_IMAGES } from '~/constants/ui-constants';
import { NEWS_CATEGORY_LABELS, NEWS_CATEGORY_CLASSES, NewsCategory } from '~/constants/news-constants';

export default defineComponent({
  name: 'PNews',

  components: {
    MNewsFilter,
    MLoadMoreButton
  },

  setup() {
    const router = useRouter();
    const { 
      newsItems, 
      selectedCategory, 
      hasMore, 
      totalReturned, 
      isLoading, 
      fetchNews, 
      loadMoreNews, 
      filterByCategory 
    } = useNewsStore();

    onMounted(() => {
      fetchNews(true);
    });

    const handleFilterChange = (category: 'general' | 'project_related' | null) => {
      filterByCategory(category);
    };

    const handleNewsClick = (id: number) => {
      router.push(`/news/${id}`);
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const getCategoryLabel = (category: string) => {
      return NEWS_CATEGORY_LABELS[category as NewsCategory] || category;
    };

    const getCategoryClass = (category: string) => {
      return NEWS_CATEGORY_CLASSES[category as NewsCategory] || 'category-default';
    };

    const handleImageError = (event: Event) => {
      const target = event.target as HTMLImageElement;
      
      // Prevent infinite loop - only set fallback if not already set
      if (!target.dataset.fallbackAttempted) {
        target.dataset.fallbackAttempted = 'true';
        target.src = DEFAULT_IMAGES.NEWS_PLACEHOLDER;
        
        // Remove the error listener to prevent further attempts
        target.removeEventListener('error', handleImageError);
      }
    };

    return {
      newsItems,
      selectedCategory,
      hasMore,
      totalReturned,
      isLoading,
      loadMoreNews,
      handleFilterChange,
      handleNewsClick,
      formatDate,
      getCategoryLabel,
      getCategoryClass,
      handleImageError
    };
  }
});
</script>

<style lang="scss" scoped>
.p-news {
  @apply min-h-screen bg-gray-50;

  .hero-section {
    @apply py-20 bg-gradient-to-br from-primary-light to-primary-dark text-white;

    .container {
      @apply max-w-6xl mx-auto px-4 text-center;
    }

    .hero-title {
      @apply text-4xl md:text-5xl lg:text-6xl font-bold mb-6;
    }

    .hero-subtitle {
      @apply text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto;
    }
  }

  .news-content {
    @apply min-h-60 relative;
  }

  .news-grid {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8;
  }

  .news-card {
    @apply bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg;

    .news-image {
      @apply w-full h-48 object-cover;
    }

    .news-content {
      @apply p-6;

      .news-category {
        @apply flex items-center gap-2 mb-3;

        .category-badge {
          @apply px-2 py-1 text-xs font-semibold rounded-full;

          &.category-general {
            @apply bg-blue-100 text-blue-800;
          }

          &.category-project {
            @apply bg-yellow-100 text-yellow-800;
          }
        }

        .project-link {
          @apply text-xs text-gray-500 italic;
        }
      }

      .news-title {
        @apply text-xl font-semibold mb-3 text-gray-900 line-clamp-2;
      }

      .news-excerpt {
        @apply text-gray-600 mb-4 line-clamp-3;
      }

      .news-meta {
        @apply flex justify-between items-center text-sm text-gray-500 mb-2;

        .news-date {
          @apply font-medium;
        }

        .news-author {
          @apply italic;
        }
      }

      .news-views {
        @apply text-xs text-gray-400;
      }
    }
  }

  .empty-state {
    @apply text-center py-16;

    .empty-icon {
      @apply text-6xl mb-4;
    }

    h3 {
      @apply text-xl font-semibold text-gray-700 mb-2;
    }

    p {
      @apply text-gray-500;
    }
  }

  // Responsive adjustments
  @media (max-width: 640px) {
    .hero-section {
      @apply py-12;

      .hero-title {
        @apply text-3xl;
      }

      .hero-subtitle {
        @apply text-lg;
      }
    }
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 