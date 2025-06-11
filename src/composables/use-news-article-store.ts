import { reactive, computed, ref } from 'vue';
import AsyncSource from 'async-source';
import type { NewsItem } from '~/interfaces/home';
import { getNewsArticle } from '~/services/api/news-api-service';
import { handleApiError } from '~/services/notification-service';

export function useNewsArticleStore() {
  // State
  const article = ref<NewsItem | null>(null);
  const currentArticleId = ref<number | null>(null);

  // AsyncSource for API calls
  const articleSource = reactive(new AsyncSource(
    async () => {
      if (!currentArticleId.value) {
        throw new Error('Неправильний ID статті');
      }
      return await getNewsArticle(currentArticleId.value);
    },
    handleApiError
  ));

  // Computed properties
  const isLoading = computed(() => articleSource.isLoading);

  // Methods
  function fetchArticle(id: number) {
    currentArticleId.value = id;
    article.value = null;
    
    articleSource.push(handleArticleSuccess);
  }

  function handleArticleSuccess(response: NewsItem) {
    article.value = response;
    console.log('Article loaded successfully', response);
  }

  return {
    // State
    article,
    
    // Loading states
    isLoading,
    
    // Methods
    fetchArticle
  };
} 