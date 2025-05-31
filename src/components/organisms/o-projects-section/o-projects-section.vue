<template>
  <section id="projects" class="py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-h2 font-heading font-bold text-gray-900 mb-4">
          {{ t('home.projects.title') }}
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          {{ t('home.projects.description') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MProjectCard
          v-for="project in projects"
          :key="project.id"
          v-bind="project"
          @view-details="onViewDetails"
        />
      </div>

      <div class="mt-12">
        <MPagination
          v-model:currentPage="currentPage"
          :total-pages="totalPages"
          :total-items="totalItems"
          :per-page="perPage"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Project, PaginationProps } from '~/interfaces/project.interface';
import MProjectCard from '~/components/molecules/m-project-card/m-project-card.vue';
import MPagination from '~/components/molecules/m-pagination/m-pagination.vue';

export default defineComponent({
  name: 'OProjectsSection',

  components: {
    MProjectCard,
    MPagination
  },

  props: {
    projects: {
      type: Array as () => Project[],
      required: true
    },
    totalPages: {
      type: Number,
      default: 5
    },
    totalItems: {
      type: Number,
      default: 50
    },
    perPage: {
      type: Number,
      default: 9
    }
  },

  emits: ['view-details'],

  setup(_, { emit }) {
    const { t } = useI18n();
    const currentPage = ref(1);

    const onViewDetails = (id: number) => {
      emit('view-details', id);
    };

    return {
      t,
      currentPage,
      onViewDetails
    };
  }
});
</script> 