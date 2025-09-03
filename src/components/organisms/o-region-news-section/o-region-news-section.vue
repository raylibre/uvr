<template>
  <section class="o-region-news-section">
    <h2 class="title">Новини регіону</h2>
    <div v-if="isLoading" class="loading">Завантаження…</div>
    <div v-else>
      <div v-if="news.length === 0" class="empty">Поки що немає новин для цього регіону.</div>
      <ul v-else class="news-list">
        <li 
          v-for="item in news" 
          :key="item.id" 
          class="news-item"
          @click="navigateToNews(item.id)"
        >
          <div v-if="item.featured_image_url" class="news-image">
            <img :src="item.featured_image_url" :alt="item.title" />
          </div>
          <div class="news-content">
            <div class="news-meta">
              <span v-if="item.published_at" class="publish-date">
                {{ formatDate(item.published_at) }}
              </span>
              <span v-if="item.author_name" class="author">
                {{ item.author_name }}
              </span>
            </div>
            <h3 class="news-title">{{ item.title }}</h3>
            <p class="news-desc">{{ item.short_description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getRegionNews } from '~/services/api/regions-api-service';
import { ROUTE_NAMES } from '~/constants/router-constants';
import type { NewsItem } from '~/interfaces/home';

interface Props {
  regionId: string;
}

const props = defineProps<Props>();
const router = useRouter();

const isLoading = ref(false);
const news = ref<NewsItem[]>([]);

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};

const navigateToNews = (newsId: number) => {
  router.push({
    name: ROUTE_NAMES.NEWS_ARTICLE,
    params: { id: newsId.toString() }
  });
};

onMounted(async () => {
  if (!props.regionId) return;
  isLoading.value = true;
  try {
    const data = await getRegionNews(props.regionId, 10, 0);
    news.value = data?.data?.news ?? [];
  } finally {
    isLoading.value = false;
  }
});
</script>

<style lang="scss" src="./o-region-news-section.scss" />