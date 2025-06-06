<template>
  <section class="o-programs-section">
    <h2>Our Programs</h2>
    <p class="section-description">We offer various programs designed to support veterans in different aspects of their lives</p>
    <div class="program-cards">
      <MProgramCard
        v-for="program in programs"
        :key="program.id"
        :program="program"
        @click="$emit('program-click', program.id)"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Program } from '~/interfaces/home';
import MProgramCard from '~/components/molecules/m-program-card';

export default defineComponent({
  name: 'OProgramsSection',

  components: {
    MProgramCard
  },

  props: {
    programs: {
      type: Array as PropType<Program[]>,
      required: true
    }
  },

  emits: ['program-click']
});
</script>

<style lang="scss" scoped>
.o-programs-section {
  @apply bg-gray-50 py-16 px-4;

  h2 {
    @apply text-4xl font-bold text-center mb-4;
  }

  .section-description {
    @apply text-center max-w-3xl mx-auto mb-12;
  }

  .program-cards {
    @apply container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8;
  }
}
</style> 