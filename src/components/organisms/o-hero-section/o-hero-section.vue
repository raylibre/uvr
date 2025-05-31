<template>
  <section class="relative bg-gray-50 py-20 sm:py-32">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
        <div class="lg:col-span-6">
          <h1 class="text-display-1 font-heading font-bold text-gray-900 mb-6">
            {{ t('home.hero.title') }} <span class="text-gray-400">{{ t('home.hero.titleHighlight') }}</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            {{ t('home.hero.description') }}
          </p>
          <div class="flex flex-wrap gap-4">
            <AButton variant="primary" @click="$emit('services-click')">
              {{ t('common.buttons.ourServices') }}
            </AButton>
            <AButton variant="outline" @click="$emit('contact-click')">
              {{ t('common.buttons.getInTouch') }}
            </AButton>
          </div>
        </div>
        <div class="lg:col-span-6 mt-10 lg:mt-0">
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-xl shadow-lg col-span-2 aspect-w-16 aspect-h-9 bg-gray-100">
              <div class="flex items-center justify-center text-gray-400">Hero Image 1</div>
            </div>
            <div class="rounded-xl shadow-lg aspect-w-4 aspect-h-3 bg-gray-100">
              <div class="flex items-center justify-center text-gray-400">Hero Image 2</div>
            </div>
            <div class="rounded-xl shadow-lg aspect-w-4 aspect-h-3 bg-gray-100">
              <div class="flex items-center justify-center text-gray-400">Hero Image 3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import AButton from '~/components/atoms/a-button/a-button.vue';

export default defineComponent({
  name: 'OHeroSection',

  components: {
    AButton
  },

  emits: ['services-click', 'contact-click'],

  setup() {
    const { t } = useI18n();
    return { t };
  }
});
</script> 