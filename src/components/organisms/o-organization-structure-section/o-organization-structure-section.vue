<template>
  <section class="o-organization-structure-section">
    <div class="container mx-auto px-4 py-16">
      <!-- Section Header -->
      <div class="section-header text-center mb-12">
        <h2 class="section-title text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Наша Структура
        </h2>
        <div class="section-description max-w-4xl mx-auto">
          <p class="text-lg md:text-xl text-gray-700 leading-relaxed">
            Структура нашої організації по всій Україні.<br/>
            Клікніть на область для переходу до інформації про наші програми.
          </p>
        </div>
      </div>

      <!-- Interactive Ukraine Map -->
      <div class="map-section">
        <div class="map-wrapper">
          <div class="map-header text-center mb-8">
            
            <!-- Selected Region Info -->
            <div v-if="selectedRegion" class="selected-region-info mt-6 p-4 bg-blue-50 rounded-lg">
              <div class="flex items-center justify-center gap-3">
                <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <p class="text-blue-800 font-medium">
                  Обрана область: <span class="font-bold">{{ selectedRegion }}</span>
                </p>
                <button 
                  @click="clearSelection"
                  class="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                  title="Очистити вибір"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <OUkraineMap
            :default-color="defaultMapColor"
            :hover-color="hoverMapColor"
            :clickable="true"
            :selected-region="selectedRegionId"
            @region-click="handleRegionClick"
            @region-hover="handleRegionHover"
          />
          
          <!-- Interactive Instructions -->
          <div class="interaction-hints mt-8 text-center">
            <div class="flex flex-wrap justify-center gap-8 text-sm">
              <div class="hint-item flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.122 2.122"/>
                </svg>
                <span class="text-gray-600">Наведіть курсор для деталей</span>
              </div>
              <div class="hint-item flex items-center gap-2">
                <svg class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <span class="text-yellow-600 font-medium">Клікніть для вибору</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Information -->
      <div class="additional-info mt-16">
        <div class="grid md:grid-cols-3 gap-8">
          <AInfoCard
            title="24 області"
            description="Присутність у всіх областях України для максимального охоплення ветеранів"
            color-scheme="blue"
          >
            <template #icon>
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </template>
          </AInfoCard>

          <AInfoCard
            title="Місцеві команди"
            description="Кваліфіковані спеціалісти в кожному регіоні для персоналізованої допомоги"
            color-scheme="yellow"
          >
            <template #icon>
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </template>
          </AInfoCard>

          <AInfoCard
            title="Комплексні послуги"
            description="Повний спектр підтримки: від медичної до професійної реабілітації"
            color-scheme="blue"
          >
            <template #icon>
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </template>
          </AInfoCard>
        </div>
      </div>

      <!-- Statistics Section -->
      <div v-if="selectedRegion" class="statistics-section mt-16">
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
          <h3 class="text-2xl font-bold mb-6 text-center">Наша діяльність в регіоні</h3>
          <div class="grid md:grid-cols-4 gap-6">
            <div class="stat-item text-center">
              <div class="text-3xl font-bold mb-2">150+</div>
              <div class="text-blue-100">Ветеранів підтримано</div>
            </div>
            <div class="stat-item text-center">
              <div class="text-3xl font-bold mb-2">25</div>
              <div class="text-blue-100">Активних програм</div>
            </div>
            <div class="stat-item text-center">
              <div class="text-3xl font-bold mb-2">12</div>
              <div class="text-blue-100">Спеціалістів</div>
            </div>
            <div class="stat-item text-center">
              <div class="text-3xl font-bold mb-2">24/7</div>
              <div class="text-blue-100">Підтримка</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OUkraineMap from '~/components/organisms/o-ukraine-map'
import AInfoCard from '~/components/atoms/a-info-card'

// Map colors
const defaultMapColor = ref('#e3f2fd')
const hoverMapColor = ref('#2196f3')

// Selected region state
const selectedRegion = ref<string | null>(null)
const selectedRegionId = ref<string | null>(null)

// Emits
const emit = defineEmits<{
  regionClick: [regionId: string, regionName: string]
  regionHover: [regionId: string, regionName: string]
}>()

// Event handlers
const handleRegionClick = (regionId: string, regionName: string) => {
  selectedRegion.value = regionName
  selectedRegionId.value = regionId
  emit('regionClick', regionId, regionName)
  
  // You can add analytics tracking here
  console.log(`Region clicked: ${regionName} (${regionId})`)
}

const handleRegionHover = (regionId: string, regionName: string) => {
  emit('regionHover', regionId, regionName)
}

const clearSelection = () => {
  selectedRegion.value = null
  selectedRegionId.value = null
}
</script>

<style scoped>
.o-organization-structure-section {
  @apply bg-gradient-to-b from-gray-50 to-white;
}

.section-title {
  @apply relative;
}

/* Убрали синюю линию под заголовком */

.map-wrapper {
  @apply transition-all duration-300;
}

/* Info card styles moved to AInfoCard atom */

.legend-color {
  @apply transition-all duration-200;
}

.selected-region-info {
  @apply transition-all duration-500 ease-in-out;
  animation: slideDown 0.5s ease-out;
}

.statistics-section {
  animation: fadeInUp 0.6s ease-out;
}

.stat-item {
  @apply transition-all duration-300 hover:transform hover:scale-110;
}

.hint-item {
  @apply transition-all duration-200 hover:transform hover:scale-105;
}

/* Animation for better UX */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 100px;
  }
}

.section-header,
.map-section,
.additional-info {
  animation: fadeInUp 0.6s ease-out;
}

.map-section {
  animation-delay: 0.2s;
}

.additional-info {
  animation-delay: 0.4s;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .section-title {
    @apply text-3xl;
  }
  
  .section-description {
    @apply text-base;
  }
  
  .map-wrapper {
    @apply p-4;
  }
  
  .hint-item {
    @apply text-xs;
  }
  
  .statistics-section {
    @apply p-6;
  }
  
  .stat-item {
    @apply mb-4;
  }
}
</style> 