<template>
  <i :class="['a-icon', ...iconClasses]" />
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
    },
    color: {
      type: String,
      default: ''
    }
  },

  setup(props) {
    const iconClasses = computed(() => {
      const classes = [
        'fas',
        props.name.startsWith('fa-') ? props.name : `fa-${props.name}`,
        {
          'text-sm': props.size === 'sm',
          'text-base': props.size === 'md',
          'text-lg': props.size === 'lg',
          'text-xl': props.size === 'xl'
        }
      ];
      if (props.color) {
        classes.push(`text-${props.color}`);
      }
      return classes;
    });

    return {
      iconClasses
    };
  }
});
</script>

<style lang="scss">
.a-icon {
  @apply inline-flex items-center justify-center;
}
</style> 