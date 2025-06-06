<template>
  <div class="m-project-card">
    <div class="media">
      <div v-if="image" class="image-wrapper">
        <img
          :src="image"
          :alt="title"
          class="image"
        />
      </div>
      <div v-else class="placeholder">
        Project Image
      </div>
      <div class="overlay">
        <AButton
          variant="primary"
          class="details-button"
          @click="$emit('view-details')"
        >
          View Details
        </AButton>
      </div>
    </div>
    
    <div class="content">
      <div class="header">
        <div class="info">
          <h3 class="title">
            {{ title }}
          </h3>
          <p class="description">
            {{ description }}
          </p>
        </div>
        <span class="category">
          {{ category }}
        </span>
      </div>

      <div class="footer">
        <div class="metadata">
          <div class="metadata__item">
            <span class="metadata__label">Client:</span>
            {{ client }}
          </div>
          <div class="metadata__item">
            <span class="metadata__label">Duration:</span>
            {{ duration }}
          </div>
        </div>
        <div class="status">
          {{ status }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AButton from '~/components/atoms/a-button/a-button.vue';

export default defineComponent({
  name: 'MProjectCard',

  components: {
    AButton
  },

  props: {
    image: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    client: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },

  emits: ['view-details']
});
</script>

<style lang="scss" scoped>
.m-project-card {
  @apply group;

  .media {
    @apply aspect-w-16 aspect-h-9 relative;
  }

  .image-wrapper {
    @apply w-full h-full;
  }

  .image {
    @apply object-cover w-full h-full;
  }

  .placeholder {
    @apply w-full h-full bg-gray-100 flex items-center justify-center text-gray-400;
  }

  .overlay {
    @apply absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 
           transition-opacity duration-200 flex items-center justify-center;
  }

  .details-button {
    @apply transform translate-y-4 group-hover:translate-y-0 transition-transform duration-200;
  }

  .content {
    @apply p-6;
  }

  .header {
    @apply flex items-start justify-between;
  }

  .info {
    @apply flex-grow;
  }

  .title {
    @apply text-h5 font-heading font-bold text-gray-900;
  }

  .description {
    @apply mt-2 text-gray-600 line-clamp-2;
  }

  .category {
    @apply tag tag-primary;
  }

  .footer {
    @apply mt-4 flex items-center justify-between text-sm;
  }

  .metadata {
    @apply flex items-center space-x-4;

    &__item {
      @apply flex items-center text-gray-500;
    }

    &__label {
      @apply mr-2;
    }
  }

  .status {
    @apply text-primary font-medium;
  }
}
</style> 