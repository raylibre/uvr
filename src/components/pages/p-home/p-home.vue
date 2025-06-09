<template>
  <div class="p-home">
    <OHeroSection />
    
    <OProgramsSection
      :programs="programs"
      @program-click="handleProgramClick"
    />

    <ORepresentativesSection
      :representatives="representatives"
      @representative-click="handleRepresentativeClick"
    />

    <ONewsSection
      :news-items="newsItems"
      @news-click="handleNewsClick"
    />

    <OFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useHomeStore } from '~/composables/use-home-store';
import OHeroSection from '~/components/organisms/o-hero-section';
import OProgramsSection from '~/components/organisms/o-programs-section';
import ORepresentativesSection from '~/components/organisms/o-representatives-section';
import ONewsSection from '~/components/organisms/o-news-section';
import OFooter from '~/components/organisms/o-footer';

export default defineComponent({
  name: 'PHome',

  components: {
    OHeroSection,
    OProgramsSection,
    ORepresentativesSection,
    ONewsSection,
    OFooter
  },

  setup() {
    const router = useRouter();
    const { programs, representatives, newsItems, isLoading, error, fetchData } = useHomeStore();

    onMounted(fetchData);

    const handleProgramClick = (id: number) => {
      router.push(`/programs/${id}`);
    };

    const handleRepresentativeClick = (id: number) => {
      router.push(`/representatives/${id}`);
    };

    const handleNewsClick = (id: number) => {
      router.push(`/news/${id}`);
    };

    return {
      programs,
      representatives,
      newsItems,
      isLoading,
      error,
      handleProgramClick,
      handleRepresentativeClick,
      handleNewsClick
    };
  }
});
</script>

<style lang="scss" scoped>
.p-home {
  @apply min-h-screen;
}
</style> 