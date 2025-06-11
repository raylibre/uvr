import { reactive, computed, ref } from 'vue';
import AsyncSource from 'async-source';
import type { NewsListResponse, NewsItem } from '~/interfaces/home';
import { getNewsList } from '~/services/api/news-api-service';
import { handleApiError } from '~/services/notification-service';
import { NEWS_PAGINATION } from '~/constants/news-constants';

export function useNewsStore() {
  // State
  const newsItems = ref<NewsItem[]>([]);
  const selectedCategory = ref<'general' | 'project_related' | null>(null);
  const currentOffset = ref(0);
  const limit = ref(NEWS_PAGINATION.DEFAULT_LIMIT);
  const hasMore = ref(true);
  const totalReturned = ref(0);

  // AsyncSource for API calls
  const newsSource = reactive(new AsyncSource(
    async () => {
      const response = await getNewsList({
        limit: limit.value,
        offset: currentOffset.value,
        category: selectedCategory.value || undefined
      });
      return response;
    },
    handleApiError
  ));

  // Computed properties
  const isLoading = computed(() => newsSource.isLoading);

  // Methods
  function fetchNews(reset = false) {
    if (reset) {
      currentOffset.value = 0;
      newsItems.value = [];
    }

    newsSource.push(handleNewsSuccess);
  }

  function loadMoreNews() {
    if (!hasMore.value || isLoading.value) return;
    
    currentOffset.value += limit.value;
    newsSource.push(handleLoadMoreSuccess);
  }

  function filterByCategory(category: 'general' | 'project_related' | null) {
    selectedCategory.value = category;
    fetchNews(true);
  }

  function handleNewsSuccess(response: NewsListResponse) {
    newsItems.value = response.news;
    hasMore.value = response.pagination.has_more;
    totalReturned.value = response.pagination.total_returned;
    currentOffset.value = response.pagination.offset;
    console.log('News loaded successfully', response);
  }

  function handleLoadMoreSuccess(response: NewsListResponse) {
    newsItems.value = [...newsItems.value, ...response.news];
    hasMore.value = response.pagination.has_more;
    totalReturned.value += response.pagination.total_returned;
    currentOffset.value = response.pagination.offset;
    console.log('More news loaded successfully', response);
  }

  return {
    // State
    newsItems,
    selectedCategory,
    hasMore,
    totalReturned,
    
    // Loading states
    isLoading,
    
    // Methods
    fetchNews,
    loadMoreNews,
    filterByCategory
  };
} 