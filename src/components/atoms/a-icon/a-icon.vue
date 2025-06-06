<template>
  <i :class="iconClasses" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'AIcon',

  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value)
    }
  },

  setup(props) {
    const iconClasses = computed(() => [
      props.name,
      {
        'text-sm': props.size === 'sm',
        'text-base': props.size === 'md',
        'text-lg': props.size === 'lg',
        'text-xl': props.size === 'xl'
      }
    ]);

    return {
      iconClasses
    };
  }
});
</script>

<style lang="scss" scoped>
.a-icon {
  @apply inline-flex items-center justify-center;
}
</style> 