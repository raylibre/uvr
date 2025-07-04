<template>
  <div class="m-public-project-card" @click="$emit('click', project.slug)">
    <div class="project-image-container">
      <img 
        v-if="project.featured_image_url" 
        :src="project.featured_image_url" 
        :alt="project.title"
        class="project-image"
      />
      <div v-else class="project-image-placeholder">
        <div class="placeholder-content">
          <i class="fas fa-heart text-2xl text-gray-400"/>
        </div>
      </div>
      <div v-if="project.is_featured" class="featured-badge">
        <i class="fas fa-star"/>
        Рекомендований
      </div>
    </div>
    
    <div class="project-content">
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.short_description }}</p>
      
      <div class="project-stats">
        <div class="stat-item">
          <i class="fas fa-users"/>
          <span>{{ project.total_helped }} допомогли</span>
        </div>
        <div v-if="project.current_participants > 0" class="stat-item">
          <i class="fas fa-user-clock"/>
          <span>{{ project.current_participants }} учасників</span>
        </div>
        <div v-if="project.success_stories_count > 0" class="stat-item">
          <i class="fas fa-trophy"/>
          <span>{{ project.success_stories_count }} успішних історій</span>
        </div>
      </div>
      
      <div v-if="project.total_budget" class="project-budget">
        <i class="fas fa-coins"/>
        <span>Бюджет: {{ formatBudget(project.total_budget) }} грн</span>
      </div>
      
      <div class="project-type">
        <span class="type-badge" :class="`type-${project.project_type}`">
          {{ formatProjectType(project.project_type) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { PublicProject } from '~/interfaces/project.interface';

export default defineComponent({
  name: 'MPublicProjectCard',

  props: {
    project: {
      type: Object as PropType<PublicProject>,
      required: true
    }
  },

  emits: ['click'],

  setup() {
    function formatBudget(budget: number): string {
      return new Intl.NumberFormat('uk-UA').format(budget);
    }

    function formatProjectType(type: string): string {
      const typeMap: Record<string, string> = {
        ai_psychology: 'ШІ-психологія',
        family_support: 'Підтримка сімей',
        prosthetics: 'Протезування',
        civilian_retraining: 'Перекваліфікація',
        legal_aid: 'Правова допомога'
      };
      return typeMap[type] || type;
    }

    return {
      formatBudget,
      formatProjectType
    };
  }
});
</script>

<style lang="scss" scoped>
.m-public-project-card {
  @apply bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 cursor-pointer flex flex-col;
  min-width: 280px;
  max-width: 320px;
  height: 516px;
  flex: 1 1 280px;

  .project-image-container {
    @apply relative;

    .project-image {
      @apply w-full h-48 object-cover;
    }

    .project-image-placeholder {
      @apply w-full h-48 bg-gray-100 flex items-center justify-center;

      .placeholder-content {
        @apply text-center;
      }
    }

    .featured-badge {
      @apply absolute top-2 right-2 bg-yellow-dark text-white text-xs px-2 py-1 rounded-full flex items-center gap-1;
    }
  }

  .project-content {
    @apply p-4 flex-grow flex flex-col;

    .project-title {
      @apply text-xl font-semibold mb-2 text-gray-900;
    }

    .project-description {
      @apply text-gray-600 mb-4 leading-relaxed;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .project-stats {
      @apply space-y-2 mb-4;

      .stat-item {
        @apply flex items-center gap-2 text-sm text-gray-700;

        i {
          @apply text-primary w-4;
        }
      }
    }

    .project-budget {
      @apply flex items-center gap-2 text-sm text-green font-semibold mb-3;

      i {
        @apply text-green;
      }
    }

    .project-type {
      @apply mt-auto;
      
      .type-badge {
        @apply inline-block px-3 py-1 rounded-full text-xs font-medium;
        @apply bg-primary-light/20 text-primary-dark;
      }
    }
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 