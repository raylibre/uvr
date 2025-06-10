<template>
  <div class="p-news">
    <div class="container mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-title">Новини</h1>
        <p class="page-description">
          Слідкуйте за останніми подіями та досягненнями нашої організації
        </p>
      </div>

      <!-- News Filter -->
      <MNewsFilter
        :selected-category="selectedCategory"
        :total-count="totalReturned"
        @filter-change="handleFilterChange"
      />

      <!-- Loading State for Initial Load -->
      <div v-if="isLoading && newsItems.length === 0" class="loading-initial">
        <div class="loading-spinner">
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
        </div>
        <p>Завантаження новин...</p>
      </div>

      <!-- News Grid -->
      <div v-else-if="newsItems.length > 0" class="news-grid">
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
      // TODO: Navigate to news detail page when implemented
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
      return category === 'general' ? 'Загальні' : 'Проєкти';
    };

    const getCategoryClass = (category: string) => {
      return category === 'general' ? 'category-general' : 'category-project';
    };

    const handleImageError = (event: Event) => {
      const target = event.target as HTMLImageElement;
      
      // Prevent infinite loop - only set fallback if not already set
      if (!target.dataset.fallbackAttempted) {
        target.dataset.fallbackAttempted = 'true';
        target.src = '/assets/images/default-news-image.png';
        
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

  .page-header {
    @apply text-center mb-12;

    .page-title {
      @apply text-4xl md:text-5xl font-bold text-gray-900 mb-4;
    }

    .page-description {
      @apply text-lg text-gray-600 max-w-2xl mx-auto;
    }
  }

  .loading-initial {
    @apply flex flex-col items-center justify-center py-16 text-gray-500;

    .loading-spinner {
      @apply mb-4;

      .spinner {
        @apply w-8 h-8;
        animation: spin 1s linear infinite;

        .spinner-path {
          animation: dash 1.5s ease-in-out infinite;
        }
      }
    }
  }

  .news-grid {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8;
  }

  .news-card {
    @apply bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl;

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
            @apply bg-green-100 text-green-800;
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