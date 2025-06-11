<template>
  <section class="o-hero-section">
    <div class="hero-content">
      <div class="hero-text">
        <h1>Supporting Ukrainian Veterans</h1>
        <p>We are dedicated to helping veterans rebuild their lives and reintegrate into society</p>
      </div>
      <div class="key-points">
        <div v-for="point in keyPoints" :key="point.title" class="key-point">
          <h3>{{ point.title }}</h3>
          <p>{{ point.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OHeroSection',

  setup() {
    const keyPoints = [
      {
        title: 'Comprehensive Support',
        description: 'Providing medical, psychological, and social support to veterans'
      },
      {
        title: 'Community Building',
        description: 'Creating a strong network of veterans and supporters'
      },
      {
        title: 'Professional Development',
        description: 'Helping veterans build successful civilian careers'
      }
    ];

    return {
      keyPoints
    };
  }
});
</script>

<style lang="scss" scoped>
.o-hero-section {
  @apply relative min-h-[80vh] flex items-center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/images/hero-background.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  .hero-content {
    @apply container mx-auto flex flex-col md:flex-row items-center justify-between;
  }

  .hero-text {
    @apply text-white md:w-1/2 mb-8 md:mb-0;

    h1 {
      @apply text-5xl font-bold mb-6;
    }

    p {
      @apply text-xl;
    }
  }

  .key-points {
    @apply md:w-1/2 grid gap-6;

    .key-point {
      @apply bg-white/90 p-6 rounded-lg;

      h3 {
        @apply text-xl font-semibold mb-2;
      }
    }
  }
}
</style> 