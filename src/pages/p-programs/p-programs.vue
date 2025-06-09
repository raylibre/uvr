<template>
  <div class="p-programs">
    <div class="hero-section">
      <div class="container mx-auto px-4 py-16 text-center">
        <h1 class="text-5xl font-bold text-white mb-6">Наші Програми</h1>
        <p class="text-xl text-white max-w-3xl mx-auto">
          Ми пропонуємо комплексну підтримку для ветеранів та їхніх сімей через різноманітні програми
        </p>
      </div>
    </div>

    <OPublicProgramsSection
      :limit="8"
      :show-featured-only="false"
      :show-view-all="false"
      @project-click="handleProjectClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from '~/constants/router-constants';
import OPublicProgramsSection from '~/components/organisms/o-public-programs-section';

export default defineComponent({
  name: 'PPrograms',

  components: {
    OPublicProgramsSection
  },

  setup() {
    const router = useRouter();

    const handleProjectClick = (slug: string) => {
      // Navigate to program detail page using route name and params
      router.push({ 
        name: ROUTE_NAMES.PROGRAM_DETAIL, 
        params: { slug } 
      });
    };

    return {
      handleProjectClick
    };
  }
});
</script>

<style lang="scss" scoped>
.p-programs {
  @apply min-h-screen;

  .hero-section {
    @apply bg-gradient-to-r from-blue-600 to-blue-800;
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/programs-hero.jpg');
    background-size: cover;
    background-position: center;
  }
}
</style> 