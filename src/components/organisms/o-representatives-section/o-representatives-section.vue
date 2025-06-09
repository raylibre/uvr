<template>
  <section class="o-representatives-section">
    <h2>Our Representatives</h2>
    <p class="section-description">Meet our dedicated team working to support veterans</p>
    <div class="representatives-grid">
      <div
        v-for="representative in representatives"
        :key="representative.id"
        class="representative-card"
        @click="$emit('representative-click', representative.id)"
      >
        <div class="representative-image-container">
          <img
            v-if="representative.image"
            :src="representative.image"
            :alt="representative.name"
            class="representative-image"
            @load="onImageLoad(representative)"
            @error="(event) => onImageError(event, representative.name)"
          />
          <img
            v-else
            :src="generateFallbackAvatar(representative.name)"
            :alt="representative.name"
            class="representative-image"
            @load="onImageLoad(representative)"
          />
        </div>
        <h3>{{ representative.name }}</h3>
        <p class="position">{{ representative.position }}</p>
        <p v-if="representative.bio" class="bio">{{ representative.bio }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, type PropType, onMounted } from 'vue';
import type { Representative } from '~/interfaces/home';
import type { TeamMember } from '~/interfaces/team';
import { generateImageCacheKey } from '~/utils/team-utils';
import { generateFallbackAvatar, onImageError as handleImageError } from '~/utils/image-utils';

export default defineComponent({
  name: 'ORepresentativesSection',

  props: {
    representatives: {
      type: Array as PropType<Representative[]>,
      required: true
    }
  },

  emits: ['representative-click'],

  setup(props) {
    const cacheTeamImages = () => {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        props.representatives.forEach((representative) => {
          if (representative.image) {
            // Create a mock team member for cache key generation
            const mockTeamMember: TeamMember = {
              id: representative.id,
              full_name: representative.name,
              member_position: representative.position,
              bio: representative.bio || '',
              photo_url: representative.image,
              email: '',
              phone: null,
              sort_order: 0
            };
            
            const cacheKey = generateImageCacheKey(mockTeamMember);
            
            navigator.serviceWorker.controller.postMessage({
              type: 'CACHE_TEAM_IMAGE',
              url: representative.image,
              cacheKey: cacheKey
            });
          }
        });
      }
    };

    const onImageLoad = (representative: Representative) => {
      console.log('Image loaded successfully for:', representative.name);
    };

    const onImageError = (event: Event, name: string) => {
      console.error('Failed to load representative image, using fallback for:', name);
      handleImageError(event, name);
    };

    onMounted(() => {
      // Cache images after component is mounted
      setTimeout(cacheTeamImages, 1000);
    });

    return {
      generateFallbackAvatar,
      onImageLoad,
      onImageError
    };
  }
});
</script>

<style lang="scss" scoped>
.o-representatives-section {
  @apply py-16 bg-white;

  h2 {
    @apply text-4xl font-bold text-center mb-4;
  }

  .section-description {
    @apply text-center text-gray-600 mb-12 max-w-2xl mx-auto;
  }

  .representatives-grid {
    @apply container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8;
  }

  .representative-card {
    @apply text-center cursor-pointer transition-transform duration-300 hover:transform hover:scale-105;

    .representative-image-container {
      @apply relative mb-4;
    }

    .representative-image {
      @apply w-48 h-48 rounded-full mx-auto object-cover shadow-lg;
    }

    .representative-image-placeholder {
      @apply w-48 h-48 rounded-full mx-auto bg-gray-200 flex items-center justify-center shadow-lg;
      
      i {
        @apply text-6xl text-gray-400;
      }
    }

    h3 {
      @apply text-xl font-semibold mb-2 text-gray-900;
    }

    .position {
      @apply text-gray-600 font-medium mb-2;
    }

    .bio {
      @apply text-sm text-gray-500 leading-relaxed max-w-xs mx-auto;
    }
  }
}
</style> 