<template>
  <section class="o-public-programs-section">
    <div class="container mx-auto px-4">
      <slot name="section-header">
        <div class="section-header">
          <h2 class="section-title">Наші Програми</h2>
          <p class="section-description">
            Ми пропонуємо різноманітні програми для підтримки ветеранів та їхніх сімей
          </p>
        </div>
      </slot>

      <div v-if="isLoading" class="loading-state">
        <div class="flex justify-center items-center min-h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"/>
        </div>
      </div>

      <div v-else-if="error" class="error-state">
        <div class="text-center py-16">
          <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"/>
          <p class="text-red-600 mb-4">{{ error }}</p>
          <AButton variant="primary" @click="retryFetch">
            Спробувати знову
          </AButton>
        </div>
      </div>

      <div v-else class="programs-content">
        <div class="programs-grid">
          <MPublicProjectCard
            v-for="project in displayProjects"
            :key="project.id"
            :project="project"
            @click="handleProjectClick"
          />
        </div>

        <div v-if="showViewAll" class="view-all-section">
          <AButton 
            variant="outline" 
            size="lg"
            icon="fas fa-arrow-right"
            @click="$emit('view-all')"
          >
            Переглянути всі програми
          </AButton>
        </div>

        <div v-if="meta" class="programs-meta">
          <div class="stats-grid">
            <div class="stat-item">
              <i class="fas fa-project-diagram"/>
              <div>
                <span class="stat-number">{{ meta.total }}</span>
                <span class="stat-label">Всього програм</span>
              </div>
            </div>
            <div class="stat-item">
              <i class="fas fa-star"/>
              <div>
                <span class="stat-number">{{ meta.featured_count }}</span>
                <span class="stat-label">Рекомендовані</span>
              </div>
            </div>
            <div class="stat-item">
              <i class="fas fa-tags"/>
              <div>
                <span class="stat-number">{{ meta.types.length }}</span>
                <span class="stat-label">Типів програм</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { usePublicProjects } from '~/composables/use-public-projects';
import MPublicProjectCard from '~/components/molecules/m-public-project-card';
import AButton from '~/components/atoms/a-button';

export default defineComponent({
  name: 'OPublicProgramsSection',

  components: {
    MPublicProjectCard,
    AButton
  },

  props: {
    limit: {
      type: Number,
      default: 4
    },
    showFeaturedOnly: {
      type: Boolean,
      default: false
    },
    showViewAll: {
      type: Boolean,
      default: true
    }
  },

  emits: ['project-click', 'view-all'],

  setup(props, { emit }) {
    const { 
      projects, 
      featuredProjects, 
      meta, 
      isLoading, 
      error, 
      loadPublicProjects 
    } = usePublicProjects(props.limit);

    const displayProjects = computed(() => {
      const sourceProjects = props.showFeaturedOnly ? featuredProjects.value : projects.value;
      return sourceProjects;
    });

    const handleProjectClick = (slug: string) => {
      emit('project-click', slug);
    };

    const retryFetch = () => {
      loadPublicProjects();
    };

    onMounted(() => {
      if (projects.value.length === 0 && !isLoading.value) {
        loadPublicProjects();
      }
    });

    return {
      displayProjects,
      meta,
      isLoading,
      error,
      handleProjectClick,
      retryFetch
    };
  }
});
</script>

<style lang="scss" scoped>
.o-public-programs-section {
  @apply py-16 bg-gray-50;

  .section-header {
    @apply text-center mb-12;

    .section-title {
      @apply text-4xl font-bold text-gray-900 mb-4;
    }

    .section-description {
      @apply text-xl text-gray-600 max-w-3xl mx-auto;
    }
  }

  .loading-state,
  .error-state {
    @apply min-h-64;
  }

  .programs-grid {
    @apply flex flex-wrap justify-center gap-8 mb-12;
  }

  .view-all-section {
    @apply text-center mb-12;
  }

  .programs-meta {
    .stats-grid {
      @apply flex justify-center gap-8 flex-wrap;

      .stat-item {
        @apply flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm;

        i {
          @apply text-2xl text-primary;
        }

        .stat-number {
          @apply block text-2xl font-bold text-gray-900;
        }

        .stat-label {
          @apply block text-sm text-gray-500;
        }
      }
    }
  }
}
</style> 