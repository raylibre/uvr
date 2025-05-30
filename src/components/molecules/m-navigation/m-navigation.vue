<template>
  <nav class="bg-white shadow-sm">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-2xl font-bold text-gray-900">
              Mason
            </router-link>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              class="nav-link inline-flex items-center px-1 pt-1 border-b-2"
              :class="[
                $route.path === item.path
                  ? 'border-primary text-primary'
                  : 'border-transparent hover:border-gray-300'
              ]"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <!-- Right side -->
        <div class="flex items-center">
          <a-button
            variant="primary"
            class="hidden sm:inline-flex"
            @click="$emit('contact-us')"
          >
            Contact Us
          </a-button>

          <!-- Mobile menu button -->
          <button
            type="button"
            class="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            @click="isOpen = !isOpen"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              :class="{ 'hidden': isOpen, 'block': !isOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              class="h-6 w-6"
              :class="{ 'block': isOpen, 'hidden': !isOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      class="sm:hidden"
      :class="{ 'block': isOpen, 'hidden': !isOpen }"
    >
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          class="nav-link block pl-3 pr-4 py-2 border-l-4"
          :class="[
            $route.path === item.path
              ? 'border-primary text-primary bg-primary-50'
              : 'border-transparent hover:bg-gray-50 hover:border-gray-300'
          ]"
          @click="isOpen = false"
        >
          {{ item.name }}
        </router-link>

        <div class="pt-4 pb-3 border-t border-gray-200">
          <a-button
            variant="primary"
            class="mx-3 w-[calc(100%-24px)]"
            @click="$emit('contact-us')"
          >
            Contact Us
          </a-button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AButton from '~/components/atoms/a-button/a-button.vue';

interface NavigationItem {
  name: string;
  path: string;
}

export default defineComponent({
  name: 'MNavigation',

  components: {
    AButton
  },

  emits: ['contact-us'],

  setup() {
    const isOpen = ref(false);

    const navigationItems: NavigationItem[] = [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: 'Services', path: '/services' },
      { name: 'About', path: '/about' },
      { name: 'Blog', path: '/blog' }
    ];

    return {
      isOpen,
      navigationItems
    };
  }
});
</script> 