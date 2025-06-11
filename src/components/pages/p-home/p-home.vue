<template>
  <div class="p-home">
    <OHeroSection />
    
    <OPublicProgramsSection
      :limit="4"
      :show-featured-only="false"
      :show-view-all="true"
      @project-click="handleProgramClick"
      @view-all="handleViewAllPrograms"
    />

    <ORepresentativesSection
      :representatives="representatives"
      @representative-click="handleRepresentativeClick"
    />

    <ONewsSection
      :news-items="newsItems"
      @news-click="handleNewsClick"
      @view-all-news="handleViewAllNews"
    />

    <OFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useHomeStore } from '~/composables/use-home-store';
import { ROUTE_NAMES } from '~/constants/router-constants';
import OHeroSection from '~/components/organisms/o-hero-section';
import OPublicProgramsSection from '~/components/organisms/o-public-programs-section';
import ORepresentativesSection from '~/components/organisms/o-representatives-section';
import ONewsSection from '~/components/organisms/o-news-section';
import OFooter from '~/components/organisms/o-footer';

export default defineComponent({
  name: 'PHome',

  components: {
    OHeroSection,
    OPublicProgramsSection,
    ORepresentativesSection,
    ONewsSection,
    OFooter
  },

  setup() {
    const router = useRouter();
    const { representatives, newsItems, isLoading, fetchData } = useHomeStore();

    onMounted(fetchData);

    const handleProgramClick = (slug: string) => {
      router.push({ 
        name: ROUTE_NAMES.PROGRAM_DETAIL, 
        params: { slug } 
      });
    };

    const handleViewAllPrograms = () => {
      router.push({ name: ROUTE_NAMES.PROGRAMS });
    };

    const handleRepresentativeClick = (id: number) => {
      router.push(`/representatives/${id}`);
    };

    const handleNewsClick = (id: number) => {
      router.push(`/news/${id}`);
    };

    const handleViewAllNews = () => {
      router.push({ name: ROUTE_NAMES.NEWS });
    };

    return {
      representatives,
      newsItems,
      isLoading,
      handleProgramClick,
      handleViewAllPrograms,
      handleRepresentativeClick,
      handleNewsClick,
      handleViewAllNews
    };
  }
});
</script>

<style lang="scss" scoped>
.p-home {
  @apply min-h-screen;
}
</style> 