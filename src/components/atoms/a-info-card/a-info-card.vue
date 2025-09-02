<template>
  <div class="a-info-card" :class="cardClasses">
    <div class="icon-wrapper mb-4">
      <div class="icon-container" :class="iconColorClass">
        <slot name="icon" />
      </div>
    </div>
    <h4 class="card-title text-xl font-semibold text-gray-900 mb-2">
      {{ title }}
    </h4>
    <p class="card-description text-gray-700">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
interface Props {
  title: string
  description: string
  colorScheme?: 'blue' | 'green' | 'purple' | 'yellow'
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: 'blue'
})

// Computed
const cardClasses = computed(() => ({
  'from-blue-50 to-blue-100': props.colorScheme === 'blue',
  'from-green-50 to-green-100': props.colorScheme === 'green',
  'from-purple-50 to-purple-100': props.colorScheme === 'purple',
  'from-yellow-50 to-yellow-100': props.colorScheme === 'yellow'
}))

const iconColorClass = computed(() => ({
  'bg-blue-500': props.colorScheme === 'blue',
  'bg-green-500': props.colorScheme === 'green',
  'bg-purple-500': props.colorScheme === 'purple',
  'bg-yellow-500': props.colorScheme === 'yellow'
}))
</script>

<style scoped>
.a-info-card {
  @apply bg-gradient-to-br p-6 rounded-xl transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg;
}

.icon-container {
  @apply w-12 h-12 rounded-lg flex items-center justify-center;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .a-info-card {
    @apply p-4;
  }
}
</style>
