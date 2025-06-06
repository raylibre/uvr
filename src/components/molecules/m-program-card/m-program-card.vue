<template>
  <div class="m-program-card" @click="$emit('click')">
    <img :src="program.image" :alt="program.title" />
    <h3>{{ program.title }}</h3>
    <p>{{ program.description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Program } from '~/interfaces/home';

export default defineComponent({
  name: 'MProgramCard',

  props: {
    program: {
      type: Object as PropType<Program>,
      required: true
    }
  },

  emits: ['click']
});
</script>

<style lang="scss" scoped>
.m-program-card {
  @apply bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105 cursor-pointer;

  img {
    @apply w-full h-48 object-cover;
  }

  h3 {
    @apply text-xl font-semibold p-4;
  }

  p {
    @apply p-4 pt-0;
  }
}
</style> 