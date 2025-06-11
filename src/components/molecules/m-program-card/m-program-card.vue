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
  @apply bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 cursor-pointer flex flex-col;
  min-width: 280px;
  max-width: 320px;
  height: 400px;
  flex: 1 1 280px;

  img {
    @apply w-full h-48 object-cover;
  }

  h3 {
    @apply text-xl font-semibold p-4 pb-2 text-gray-900;
  }

  p {
    @apply p-4 pt-0 text-gray-600 leading-relaxed flex-grow;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
}
</style> 