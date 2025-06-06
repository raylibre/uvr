<template>
  <div class="p-not-found">
    <div class="content">
      <h1>404</h1>
      <p>{{ t(T_KEYS.COMMON.ERRORS.PAGE_NOT_FOUND) }}</p>
      <RouterLink :to="{ name: ROUTE_NAMES.HOME }" class="home-link">
        {{ t(T_KEYS.COMMON.BUTTONS.BACK_TO_HOME) }}
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { useTranslation } from '~/composables/use-translation';
import { ROUTE_NAMES } from '~/constants/router-constants';

export default defineComponent({
  name: 'PNotFound',

  components: {
    RouterLink
  },

  setup() {
    const { t, T_KEYS } = useTranslation();

    return {
      t,
      T_KEYS,
      ROUTE_NAMES
    };
  }
});
</script>

<style lang="scss" scoped>
.p-not-found {
  @apply min-h-screen flex items-center justify-center bg-gray-100;

  .content {
    @apply text-center p-8;

    h1 {
      @apply text-6xl font-bold text-gray-800 mb-4;
    }

    p {
      @apply text-xl text-gray-600 mb-8;
    }

    .home-link {
      @apply text-primary hover:text-primary-dark font-medium;
    }
  }
}
</style> 