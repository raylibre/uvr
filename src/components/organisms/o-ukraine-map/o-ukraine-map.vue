<template>
    <div class="o-ukraine-map">
    <div class="map-container" @mouseleave="handleMapMouseLeave">
      <svg-map
        :map="ukraineMapData"
        @click="onRegionClick"
        :locationClass="getRegionClass"
        class="ukraine-svg-map"
      />
      
      <!-- Tooltip -->
      <MMapTooltip
        :visible="tooltip.visible"
        :text="tooltip.text"
        :x="tooltip.x"
        :y="tooltip.y"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { SvgMap } from 'vue3-svg-map'
import Ukraine from '@svg-maps/ukraine'
import { ROUTE_NAMES } from '~/constants/router-constants'
import MMapTooltip from '~/components/molecules/m-map-tooltip'
import 'vue3-svg-map/style.css'

// Props
interface Props {
  defaultColor?: string
  hoverColor?: string
  selectedColor?: string
  clickable?: boolean
  selectedRegion?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  defaultColor: '#e3f2fd',
  hoverColor: '#2196f3',
  selectedColor: '#4caf50',
  clickable: true,
  selectedRegion: null
})

// Emits
const emit = defineEmits<{
  regionClick: [regionId: string, regionName: string]
  regionHover: [regionId: string, regionName: string]
}>()

// Router
const router = useRouter()

// Refs
const tooltip = ref({
  visible: false,
  text: '',
  x: 0,
  y: 0
})

// State
const hoveredRegion = ref<string | null>(null)

// Ukraine map data with custom attributes
const ukraineMapData = computed(() => ({
  ...Ukraine,
  locations: Ukraine.locations.map(location => ({
    ...location,
    // Добавляем кастомные атрибуты для стилизации
    'data-region': location.id,
    'data-name': location.name,
    'data-clickable': props.clickable
  }))
}))

// Regional name mapping (English to Ukrainian) - Updated with actual IDs from @svg-maps/ukraine
const regionNameMapping: Record<string, string> = {
  'cherkasy': 'Черкаська область',
  'chernihiv': 'Чернігівська область',
  'chernivtsi': 'Чернівецька область',
  'dnipropetrovsk': 'Дніпропетровська область',
  'donetsk': 'Донецька область',
  'ivano-frankivsk': 'Івано-Франківська область',
  'kharkiv': 'Харківська область',
  'kherson': 'Херсонська область',
  'khmelnytskyi': 'Хмельницька область',
  'kirovohrad': 'Кіровоградська область',
  'kyiv': 'Київська область',
  'kyiv-city': 'м. Київ',
  'luhansk': 'Луганська область',
  'lviv': 'Львівська область',
  'mykolaiv': 'Миколаївська область',
  'odessa': 'Одеська область',
  'poltava': 'Полтавська область',
  'rivne': 'Рівненська область',
  'sumy': 'Сумська область',
  'ternopil': 'Тернопільська область',
  'vinnytsia': 'Вінницька область',
  'volyn': 'Волинська область',
  'zakarpattia': 'Закарпатська область',
  'zaporizhia': 'Запорізька область',
  'zhytomyr': 'Житомирська область',
  'crimea': 'Автономна Республіка Крим'
}

// Computed styles removed - now handled by MMapTooltip

// Methods
const getRegionClass = (location: { id: string; [key: string]: any }, _index: number): string => {
  const regionId = location.id
  const baseClass = `region region-${regionId}`
  const modifiers: string[] = []
  
  if (hoveredRegion.value === regionId) {
    modifiers.push('region--hovered')
  }
  
  if (props.selectedRegion === regionId) {
    modifiers.push('region--selected')
  }
  
  if (props.clickable) {
    modifiers.push('region--clickable')
  }
  
  return [baseClass, ...modifiers].join(' ')
}

const onRegionClick = (event: MouseEvent) => {
  if (!props.clickable) return
  
  const target = event.target as SVGElement
  const regionId = target.getAttribute('data-region')
  const regionName = target.getAttribute('data-name')
  
  if (regionId && regionName) {
    const ukrainianName = regionNameMapping[regionId] || regionName
    
    emit('regionClick', regionId, ukrainianName)
    
    // For now, navigate to programs page - region pages can be implemented later
    router.push({ name: ROUTE_NAMES.PROGRAMS })
    
    console.log(`Region clicked: ${ukrainianName} (${regionId})`)
  }
}

const handleRegionHover = (event: MouseEvent) => {
  const target = event.target as SVGElement
  const regionId = target.getAttribute('data-region')
  const regionName = target.getAttribute('data-name')
  
  if (regionId && regionName) {
    const ukrainianName = regionNameMapping[regionId] || regionName
    
    hoveredRegion.value = regionId
    tooltip.value.text = ukrainianName
    tooltip.value.visible = true
    
    emit('regionHover', regionId, ukrainianName)
    
    updateTooltipPosition(event)
  }
}

const handleRegionLeave = () => {
  hoveredRegion.value = null
  if (tooltip.value) {
    tooltip.value.visible = false
  }
}

const handleMapMouseLeave = () => {
  hoveredRegion.value = null
  if (tooltip.value) {
    tooltip.value.visible = false
  }
}

const updateTooltipPosition = (event: MouseEvent) => {
  if (!tooltip.value || !tooltip.value.visible) return
  
  tooltip.value.x = event.clientX
  tooltip.value.y = event.clientY - 50
}

// Event handlers for DOM events
const handleMouseOver = (e: Event) => {
  const target = e.target as SVGElement
  if (target.hasAttribute('data-region')) {
    handleRegionHover(e as MouseEvent)
  }
}

const handleMouseMove = (e: Event) => {
  updateTooltipPosition(e as MouseEvent)
}

// Lifecycle
onMounted(() => {
  // Add event listeners for hover effects
  const mapElement = document.querySelector('.ukraine-svg-map')
  if (mapElement) {
    mapElement.addEventListener('mouseover', handleMouseOver)
    mapElement.addEventListener('mouseleave', handleRegionLeave)
    mapElement.addEventListener('mousemove', handleMouseMove)
  }
})

onUnmounted(() => {
  const mapElement = document.querySelector('.ukraine-svg-map')
  if (mapElement) {
    mapElement.removeEventListener('mouseover', handleMouseOver)
    mapElement.removeEventListener('mouseleave', handleRegionLeave)
    mapElement.removeEventListener('mousemove', handleMouseMove)
  }
})

// Watch for region changes
watch(() => props.selectedRegion, (newRegion) => {
  // Update classes when selected region changes
  if (newRegion) {
    console.log(`Selected region updated: ${newRegion}`)
  }
})
</script>

<style scoped>
.o-ukraine-map {
  @apply w-full flex justify-center;
}

.map-container {
  @apply relative w-full max-w-4xl;
}

.ukraine-svg-map {
  @apply w-full h-auto;
}

/* Base region styles */
:deep(.region) {
  fill: v-bind('props.defaultColor');
  stroke: #1976d2;
  stroke-width: 1;
  cursor: default;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.region--clickable) {
  @apply cursor-pointer;
}

:deep(.region--hovered) {
  fill: v-bind('props.hoverColor');
  stroke: #0d47a1;
  stroke-width: 2;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transform: scale(1.02);
  transform-origin: center;
}

:deep(.region--selected) {
  fill: v-bind('props.selectedColor');
  stroke: #2e7d32;
  stroke-width: 2.5;
  filter: drop-shadow(0 6px 12px rgba(76, 175, 80, 0.4));
  transform: scale(1.05);
  transform-origin: center;
}

/* Override svg-map default styles */
:deep(.svg-map) {
  @apply w-full h-auto;
}

:deep(.svg-map__location) {
  @apply transition-all duration-300;
}

/* Tooltip styles moved to MMapTooltip molecule */

/* Responsive adjustments */
@media (max-width: 768px) {
  :deep(.region) {
    stroke-width: 0.8;
  }
  
  :deep(.region--hovered) {
    stroke-width: 1.5;
  }
  
  :deep(.region--selected) {
    stroke-width: 2;
  }
}

/* Animation improvements */
:deep(.region--hovered:not(.region--selected)) {
  animation: pulse-glow 2s ease-in-out infinite;
}

:deep(.region--selected) {
  animation: selected-glow 3s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }
  50% {
    filter: drop-shadow(0 6px 12px rgba(33, 150, 243, 0.4));
  }
}

@keyframes selected-glow {
  0%, 100% {
    filter: drop-shadow(0 6px 12px rgba(76, 175, 80, 0.4));
    transform: scale(1.05);
  }
  50% {
    filter: drop-shadow(0 8px 16px rgba(76, 175, 80, 0.6));
    transform: scale(1.07);
  }
}
</style> 