<template>
  <RouterLink
    :to="to"
    data-at="m-header-nav-button"
    class="m-header-nav-button"
    :class="{ 'is-active': isActive }"
  >
    <div class="content">
      <!-- Main content - either label or custom content -->
      <slot>
        <span class="label">{{ label }}</span>
      </slot>

      <!-- Dropdown indicator if needed in future -->
      <slot name="dropdown-indicator" />
    </div>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTranslation } from '~/composables/use-translation';

export default defineComponent({
  name: 'MHeaderNavButton',

  props: {
    to: {
      type: [String, Object],
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    exact: {
      type: Boolean,
      default: false
    },
    translationKey: {
      type: String,
      default: ''
    }
  },

  setup(props) {
    const route = useRoute();
    const { t } = useTranslation();

    const isActive = computed(() => {
      if (typeof props.to === 'string') {
        return props.exact 
          ? route.path === props.to
          : route.path.startsWith(props.to);
      }
      return props.to.name === route.name;
    });

    const displayLabel = computed(() => {
      if (props.translationKey) {
        return t(props.translationKey);
      }
      return props.label;
    });

    return {
      isActive,
      label: displayLabel
    };
  }
});
</script>

<style lang="scss" scoped>
.m-header-nav-button {
  @apply inline-flex items-center px-3 md:px-2 py-2 md:py-1.5 text-sm font-medium 
         text-gray-700 rounded-md transition-colors hover:bg-gray-100;

  // Mobile styles
  @apply block w-full;

  // Desktop styles
  @screen md {
    @apply w-auto;
  }

  // Active state
  &.is-active {
    @apply bg-gray-100 font-bold;
  }

  .content {
    @apply flex items-center space-x-1 h-full;
  }

  .label {
    @apply inline-block;
  }
}
</style> 