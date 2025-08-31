<template>
  <a
    :href="href"
    class="a-social-link"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i :class="icon" />
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ASocialLink',

  props: {
    href: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.a-social-link {
  @apply text-2xl hover:text-primary transition-colors duration-200;
  
  i {
    @apply text-lg;
  }
  
  &:hover {
    @apply transform scale-110;
  }
}
</style> 