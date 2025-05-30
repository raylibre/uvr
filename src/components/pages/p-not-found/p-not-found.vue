<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
      <h1 class="text-display-1 font-heading font-bold text-gray-900 mb-4">
        404
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <router-link to="/" class="btn btn-primary">
        Back to Home
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTitle } from '@vueuse/core';

export default defineComponent({
  name: 'PNotFound',

  setup() {
    useTitle('Page Not Found | Mason Construction');

    return {};
  }
});
</script>

<style src="./p-not-found.scss" lang="scss" scoped></style> 