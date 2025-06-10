import { reactive, computed, onBeforeUnmount } from 'vue';
import AsyncSource from 'async-source';
import type { Program, Representative, NewsItem, HomePageData } from '~/interfaces/home';
import { fetchHomePageData, fetchFeaturedPrograms, fetchRepresentatives, fetchNewsItems } from '~/services/api/home-api-service';
import { getSharedAsyncSource, removeSharedAsyncSource } from '~/services/async-source-service';
import { handleApiError } from '~/services/notification-service';

export function useHomeStore() {
  // Create AsyncSource instances for different data types
  const homeDataSource = getSharedAsyncSource(
    'homePageData',
    fetchHomePageData,
    handleApiError
  );

  const featuredProgramsSource = reactive(new AsyncSource(fetchFeaturedPrograms, handleApiError));
  const representativesSource = reactive(new AsyncSource(fetchRepresentatives, handleApiError));
  const newsItemsSource = reactive(new AsyncSource(fetchNewsItems, handleApiError));

  // Computed properties for accessing data
  const homeData = computed(() => homeDataSource.data as HomePageData | null);
  const programs = computed(() => homeData.value?.programs || featuredProgramsSource.data || []);
  const representatives = computed(() => homeData.value?.representatives || representativesSource.data || []);
  const newsItems = computed(() => homeData.value?.newsItems || newsItemsSource.data || []);

  // Loading states
  const isLoading = computed(() => homeDataSource.isLoading);
  const isProgramsLoading = computed(() => featuredProgramsSource.isLoading);
  const isRepresentativesLoading = computed(() => representativesSource.isLoading);
  const isNewsLoading = computed(() => newsItemsSource.isLoading);

  // Methods to fetch data
  function fetchData() {
    homeDataSource.push(handleHomeDataSuccess);
  }

  function fetchPrograms() {
    featuredProgramsSource.push(handleProgramsSuccess);
  }

  function fetchRepresentativesData() {
    representativesSource.push(handleRepresentativesSuccess);
  }

  function fetchNews() {
    newsItemsSource.push(handleNewsSuccess);
  }

  // Success handlers
  function handleHomeDataSuccess(data: HomePageData) {
    console.log('Home page data loaded successfully');
  }

  function handleProgramsSuccess(data: Program[]) {
    console.log('Featured programs loaded successfully');
  }

  function handleRepresentativesSuccess(data: Representative[]) {
    console.log('Representatives loaded successfully');
  }

  function handleNewsSuccess(data: NewsItem[]) {
    console.log('News items loaded successfully');
  }

  // Cleanup shared AsyncSource on unmount
  onBeforeUnmount(() => {
    removeSharedAsyncSource('homePageData', fetchHomePageData);
  });

  return {
    // Data
    homeData,
    programs,
    representatives,
    newsItems,
    
    // Loading states
    isLoading,
    isProgramsLoading,
    isRepresentativesLoading,
    isNewsLoading,
    
    // Methods
    fetchData,
    fetchPrograms,
    fetchRepresentativesData,
    fetchNews
  };
} 