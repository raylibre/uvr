<template>
  <div class="card-project group">
    <div class="aspect-w-16 aspect-h-9 relative">
      <div v-if="image" class="w-full h-full">
        <img
          :src="image"
          :alt="title"
          class="object-cover w-full h-full"
        />
      </div>
      <div v-else class="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
        Project Image
      </div>
      <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
        <a-button
          variant="primary"
          class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-200"
          @click="$emit('view-details')"
        >
          View Details
        </a-button>
      </div>
    </div>
    
    <div class="p-6">
      <div class="flex items-start justify-between">
        <div>
          <h3 class="text-h5 font-heading font-bold text-gray-900">
            {{ title }}
          </h3>
          <p class="mt-2 text-gray-600 line-clamp-2">
            {{ description }}
          </p>
        </div>
        <span class="tag tag-primary">
          {{ category }}
        </span>
      </div>

      <div class="mt-4 flex items-center justify-between text-sm">
        <div class="flex items-center space-x-4">
          <div class="flex items-center text-gray-500">
            <span class="mr-2">Client:</span>
            {{ client }}
          </div>
          <div class="flex items-center text-gray-500">
            <span class="mr-2">Duration:</span>
            {{ duration }}
          </div>
        </div>
        <div class="text-primary font-medium">
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