import { ref } from 'vue';
import type { Program, Representative, NewsItem } from '~/interfaces/home';
import { getHomePageData } from '~/services/api/home-api-service';

export function useHomeStore() {
  const programs = ref<Program[]>([]);
  const representatives = ref<Representative[]>([]);
  const newsItems = ref<NewsItem[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchData() {
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await getHomePageData();
      programs.value = data.programs;
      representatives.value = data.representatives;
      newsItems.value = data.newsItems;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch data';
    } finally {
      isLoading.value = false;
    }
  }

  return {
    programs,
    representatives,
    newsItems,
    isLoading,
    error,
    fetchData
  };
} 