<template>
  <section class="o-public-programs-section">
    <div class="container mx-auto px-4">
      <div class="section-header">
        <h2 class="section-title">Наші Програми</h2>
        <p class="section-description">
          Ми пропонуємо різноманітні програми для підтримки ветеранів та їхніх сімей
        </p>
      </div>

      <div v-if="isLoading" class="loading-state">
        <div class="flex justify-center items-center py-16">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>

      <div v-else-if="error" class="error-state">
        <div class="text-center py-16">
          <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
          <p class="text-red-600 mb-4">{{ error }}</p>
          <button @click="retryFetch" class="btn btn-primary">
            Спробувати знову
          </button>
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
          <button @click="$emit('view-all')" class="btn btn-outline">
            Переглянути всі програми
            <i class="fas fa-arrow-right ml-2"></i>
          </button>
        </div>

        <div v-if="meta" class="programs-meta">
          <div class="stats-grid">
            <div class="stat-item">
              <i class="fas fa-project-diagram"></i>
              <div>
                <span class="stat-number">{{ meta.total }}</span>
                <span class="stat-label">Всього програм</span>
              </div>
            </div>
            <div class="stat-item">
              <i class="fas fa-star"></i>
              <div>
                <span class="stat-number">{{ meta.featured_count }}</span>
                <span class="stat-label">Рекомендовані</span>
              </div>
            </div>
            <div class="stat-item">
              <i class="fas fa-tags"></i>
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
import { defineComponent, computed, onMounted, type PropType } from 'vue';
import type { PublicProject } from '~/interfaces/project.interface';
import { usePublicProjects } from '~/composables/use-public-projects';
import MPublicProjectCard from '~/components/molecules/m-public-project-card';

export default defineComponent({
  name: 'OPublicProgramsSection',

  components: {
    MPublicProjectCard
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
      fetchPublicProjects 
    } = usePublicProjects();

    const displayProjects = computed(() => {
      const sourceProjects = props.showFeaturedOnly ? featuredProjects.value : projects.value;
      return sourceProjects.slice(0, props.limit);
    });

    const handleProjectClick = (slug: string) => {
      emit('project-click', slug);
    };

    const retryFetch = () => {
      fetchPublicProjects();
    };

    onMounted(() => {
      if (projects.value.length === 0 && !isLoading.value) {
        fetchPublicProjects();
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
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12;
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
          @apply text-2xl text-blue-500;
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

  .btn {
    @apply px-6 py-3 rounded-lg font-medium transition-all duration-200 inline-flex items-center;

    &.btn-primary {
      @apply bg-blue-600 text-white hover:bg-blue-700;
    }

    &.btn-outline {
      @apply border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white;
    }
  }
}
</style> 