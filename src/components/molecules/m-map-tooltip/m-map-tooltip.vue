<template>
  <div
    v-if="visible"
    ref="tooltipEl"
    class="m-map-tooltip"
    :style="tooltipStyle"
    :class="tooltipClasses"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'

// Props
interface Props {
  visible: boolean
  text: string
  x: number
  y: number
}

const props = defineProps<Props>()

// Refs
const tooltipEl = ref<HTMLElement>()

// State
const adjustedPosition = ref({ x: props.x, y: props.y })
const flipHorizontal = ref(false)
const flipVertical = ref(false)

// Computed
const tooltipStyle = computed(() => ({
  left: `${adjustedPosition.value.x}px`,
  top: `${adjustedPosition.value.y}px`
}))

const tooltipClasses = computed(() => ({
  'tooltip-flipped-horizontal': flipHorizontal.value,
  'tooltip-flipped-vertical': flipVertical.value
}))

// Methods
const adjustTooltipPosition = async () => {
  if (!props.visible || !tooltipEl.value) return
  
  await nextTick()
  
  const rect = tooltipEl.value.getBoundingClientRect()
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  
  let newX = props.x
  let newY = props.y
  
  // Adjust horizontal position
  if (props.x + rect.width / 2 > windowWidth - 10) {
    // Too far right, move left
    newX = windowWidth - rect.width - 10
    flipHorizontal.value = false
  } else if (props.x - rect.width / 2 < 10) {
    // Too far left, move right
    newX = rect.width / 2 + 10
    flipHorizontal.value = false
  } else {
    flipHorizontal.value = false
  }
  
  // Adjust vertical position
  if (props.y < rect.height + 10) {
    // Too close to top, show below cursor
    newY = props.y + 60
    flipVertical.value = true
  } else {
    flipVertical.value = false
  }
  
  adjustedPosition.value = { x: newX, y: newY }
}

// Watchers
watch(() => [props.visible, props.x, props.y], adjustTooltipPosition, { immediate: true })
</script>

<style scoped>
.m-map-tooltip {
  @apply fixed z-50 bg-yellow-400 text-gray-900 px-3 py-2 rounded shadow-lg text-sm pointer-events-none font-medium;
  transform: translateX(-50%);
}

.m-map-tooltip::after {
  content: '';
  @apply absolute top-full left-1/2 transform -translate-x-1/2;
  border: 4px solid transparent;
  border-top-color: #facc15;
}

/* Flipped vertical tooltip (shows below cursor) */
.tooltip-flipped-vertical {
  transform: translateX(-50%);
}

.tooltip-flipped-vertical::after {
  @apply bottom-full top-auto;
  border-top-color: transparent;
  border-bottom-color: #facc15;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .m-map-tooltip {
    @apply text-xs px-2 py-1;
  }
}
</style>
