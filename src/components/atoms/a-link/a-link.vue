<template>
  <router-link
    :to="to"
    class="a-link"
    :class="{ 'is-external': isExternal }"
  >
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ALink',

  props: {
    to: {
      type: [String, Object],
      required: true
    },
    isExternal: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style lang="scss" scoped>
.a-link {
  @apply text-white hover:text-primary transition-colors;

  &.is-external {
    @apply inline-flex items-center;
    
    &::after {
      content: '↗';
      @apply ml-1;
    }
  }
}
</style> 