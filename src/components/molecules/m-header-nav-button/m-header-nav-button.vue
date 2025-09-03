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
        <span class="label">{{ displayLabel }}</span>
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
          ? route.fullPath === props.to
          : route.path.startsWith(props.to);
      }
      
      // For route objects, check both name and hash
      if (props.to && typeof props.to === 'object') {
        const nameMatches = props.to.name === route.name;
        
        // If the route object has a hash, we need both name and hash to match
        if (props.to.hash) {
          return nameMatches && route.hash === props.to.hash;
        }
        
        // If no hash in route object, just check name
        return nameMatches;
      }
      
      return false;
    });

    const displayLabel = computed(() => {
      if (props.translationKey) {
        return t(props.translationKey);
      }
      return props.label;
    });

    return {
      isActive,
      displayLabel
    };
  }
});
</script>

<style lang="scss" scoped>
.m-header-nav-button {
  @apply inline-flex items-center px-3 md:px-4 py-2 md:py-2 text-sm font-medium text-gray-700 rounded-md transition-colors;
  @apply block w-full;

  @screen md {
    @apply w-auto;
  }

  &:hover,
  &.is-active {
    @apply bg-blue-50 text-blue-dark;
  }

  .content {
    @apply flex items-center space-x-1 h-full;
  }

  .label {
    @apply inline-block;
  }
}
</style> 