<template>
  <section class="o-programs-section">
    <div class="container mx-auto">
      <h2>Our Programs</h2>
      <p class="section-description">We offer various programs designed to support veterans in different aspects of their lives</p>
      <div class="program-cards">
        <MProgramCard
          v-for="program in programs"
          :key="program.id"
          :program="program"
          @click="$emit('program-click', program)"
        />
      </div>
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
    @apply text-4xl font-bold text-center mb-4 text-gray-900;
  }

  .section-description {
    @apply text-center text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed;
  }

  .program-cards {
    @apply flex flex-wrap justify-center gap-8;
  }
}
</style> 