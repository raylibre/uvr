<template>
  <div class="p-news-article">
    <!-- Article Content with Loading Directive -->
    <div
      v-if="article || isLoading"
      class="article-container"
    >
      <div class="container mx-auto px-4 py-8">
        <!-- Navigation -->
        <div v-if="false" class="navigation-section">
          <AButton 
            variant="outline" 
            icon="fas fa-arrow-left"
            @click="goBack"
          >
            Повернутися до новин
          </AButton>
        </div>

        <!-- Main Article Section -->
        <section
          v-loading="isLoading"
          class="article-main-section"
        >
          <template v-if="article">
          <!-- Article Category -->
          <div class="article-category">
            <span 
              class="category-badge"
              :class="getCategoryClass(article.category)"
            >
              {{ getCategoryLabel(article.category) }}
            </span>
            <span v-if="article.related_project_title" class="project-link">
              {{ article.related_project_title }}
            </span>
          </div>

          <!-- Article Title -->
          <h1 class="article-title">{{ article.title }}</h1>
          
          <!-- Article Meta -->
          <div class="article-meta">
            <time class="article-date">{{ formatDate(article.published_at) }}</time>
            <span class="article-author">{{ article.author_name }}</span>
            <span v-if="article.views_count > 0" class="article-views">
              👁 {{ article.views_count }}
            </span>
          </div>

          <!-- Featured Image -->
          <img
            :src="article.featured_image_url"
            :alt="article.title"
            class="article-image"
            @error="handleImageError"
          />

          <!-- Article Content -->
          <div class="article-text" v-html="formatContent(article.full_content || article.short_description)" />
          </template>
        </section>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="not-found-container">
      <div class="not-found-icon">📰</div>
      <h2>Статтю не знайдено</h2>
      <p>Можливо, стаття була видалена або переміщена</p>
      <AButton 
        variant="primary" 
        icon="fas fa-arrow-left"
        @click="goBack"
      >
        Повернутися до новин
      </AButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNewsArticleStore } from '~/composables/use-news-article-store';
import { ROUTE_NAMES } from '~/constants/router-constants';
import { DEFAULT_IMAGES } from '~/constants/ui-constants';
import { NEWS_CATEGORY_LABELS, NEWS_CATEGORY_CLASSES, NewsCategory } from '~/constants/news-constants';
import AButton from '~/components/atoms/a-button';

export default defineComponent({
  name: 'PNewsArticle',

  components: {
    AButton
  },

  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },

  setup(props) {
    const router = useRouter();
    const { 
      article, 
      isLoading, 
      fetchArticle 
    } = useNewsArticleStore();

    function onInit() {
      const articleId = Number(props.id);
      if (isNaN(articleId)) {
        router.push({ name: ROUTE_NAMES.NEWS });
        return;
      }
      
      fetchArticle(articleId);
    }

    function goBack() {
      router.push({ name: ROUTE_NAMES.NEWS });
    }

    function formatDate(dateString: string) {
      return new Date(dateString).toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    function getCategoryLabel(category: string) {
      return NEWS_CATEGORY_LABELS[category as NewsCategory] || category;
    }

    function getCategoryClass(category: string) {
      return NEWS_CATEGORY_CLASSES[category as NewsCategory] || 'category-default';
    }

    function formatContent(content: string) {
      // Basic HTML formatting for content
      return content.replace(/\n/g, '<br>');
    }

    function handleImageError(event: Event) {
      const target = event.target as HTMLImageElement;
      
      // Prevent infinite loop - only set fallback if not already set
      if (!target.dataset.fallbackAttempted) {
        target.dataset.fallbackAttempted = 'true';
        target.src = DEFAULT_IMAGES.NEWS_PLACEHOLDER;
        
        // Remove the error listener to prevent further attempts
        target.removeEventListener('error', handleImageError);
      }
    }

    onMounted(() => {
      onInit();
    });

    return {
      article,
      isLoading,
      goBack,
      formatDate,
      getCategoryLabel,
      getCategoryClass,
      formatContent,
      handleImageError
    };
  }
});
</script>

<style lang="scss" scoped>
.p-news-article {
  @apply min-h-screen bg-gray-50;

  .not-found-container {
    @apply flex flex-col items-center justify-center py-16 px-4 text-center;

    .not-found-icon {
      @apply text-6xl mb-4;
    }

    h2 {
      @apply text-2xl font-semibold text-gray-700 mb-4;
    }

    p {
      @apply text-gray-500 mb-6;
    }
  }

  .article-container {

    .container {
      @apply max-w-4xl;
    }

    .navigation-section {
      @apply mb-6;
    }

    .article-main-section {
      @apply relative;
      @apply bg-white rounded-lg shadow-sm p-8;
      min-height: 400px;

      .article-category {
        @apply flex items-center gap-2 mb-4;

        .category-badge {
          @apply px-3 py-1 text-sm font-semibold rounded-full;

          &.category-general {
            @apply bg-blue-100 text-blue-800;
          }

          &.category-project {
            @apply bg-yellow-100 text-yellow-800;
          }
        }

        .project-link {
          @apply text-sm text-gray-500 italic;
        }
      }

      .article-title {
        @apply text-3xl md:text-4xl font-bold text-gray-900 mb-6;
        line-height: 1.2;
      }

      .article-meta {
        @apply flex flex-wrap items-center gap-4 text-gray-500 pb-6 mb-6 border-b border-gray-100;

        .article-date {
          @apply font-medium text-lg text-gray-700;
        }

        .article-author {
          @apply italic;
        }

        .article-views {
          @apply text-sm bg-gray-50 px-3 py-1 rounded-full;
        }
      }

      .article-image {
        @apply w-full rounded-lg mb-8;
        max-height: 500px;
        object-fit: cover;
      }

      .article-text {
        @apply text-lg leading-relaxed text-gray-700;
        
        // Style for HTML content
        :deep(p) {
          @apply mb-6;
        }

        :deep(h1) {
          @apply text-2xl font-bold mb-6 mt-8 text-gray-900;
        }

        :deep(h2) {
          @apply text-xl font-semibold mb-4 mt-6 text-gray-900;
        }

        :deep(h3) {
          @apply text-lg font-medium mb-3 mt-4 text-gray-900;
        }

        :deep(ul), :deep(ol) {
          @apply mb-6 pl-6;
        }

        :deep(li) {
          @apply mb-2;
        }

        :deep(blockquote) {
          @apply border-l-4 border-blue-500 pl-6 py-4 italic text-gray-600 my-6 bg-blue-50 rounded-r-lg;
        }

        :deep(strong) {
          @apply font-semibold text-gray-900;
        }

        :deep(em) {
          @apply italic;
        }

        :deep(a) {
          @apply text-blue-600 hover:text-blue-800 underline;
        }
      }
    }
  }
}
</style> 