<template>
  <a
    :href="href"
    class="a-social-link"
    target="_blank"
    rel="noopener noreferrer"
  >
    <AIcon :name="icon" size="lg" />
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AIcon from '~/components/atoms/a-icon';

export default defineComponent({
  name: 'ASocialLink',

  components: {
    AIcon
  },

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
  @apply text-2xl hover:text-primary transition-colors;
}
</style> 