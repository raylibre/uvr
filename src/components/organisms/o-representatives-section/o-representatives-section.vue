<template>
  <section class="o-representatives-section">
    <h2>Our Representatives</h2>
    <p class="section-description">Meet our dedicated team working to support veterans</p>
    <div class="representatives-grid">
      <div
        v-for="representative in representatives"
        :key="representative.id"
        class="representative-card"
      >
        <img
          :src="representative.image"
          :alt="representative.name"
          class="representative-image"
        />
        <h3>{{ representative.name }}</h3>
        <p>{{ representative.position }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Representative } from '~/interfaces/home';

export default defineComponent({
  name: 'ORepresentativesSection',

  props: {
    representatives: {
      type: Array as PropType<Representative[]>,
      required: true
    }
  },

  emits: ['representative-click']
});
</script>

<style lang="scss" scoped>
.o-representatives-section {
  @apply py-16 bg-white;

  h2 {
    @apply text-4xl font-bold text-center mb-4;
  }

  .section-description {
    @apply text-center text-gray-600 mb-12 max-w-2xl mx-auto;
  }

  .representatives-grid {
    @apply container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8;
  }

  .representative-card {
    @apply text-center;

    .representative-image {
      @apply w-48 h-48 rounded-full mx-auto mb-4 object-cover;
    }

    h3 {
      @apply text-xl font-semibold mb-2;
    }

    p {
      @apply text-gray-600;
    }
  }
}
</style> 