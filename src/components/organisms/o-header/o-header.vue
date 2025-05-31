<template>
  <header class="o-header fixed w-full top-0 z-50 bg-white shadow-sm">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <RouterLink to="/" class="flex items-center">
              <img src="../../../assets/images/logo.svg" alt="УВР" class="h-10 w-auto text-primary" />
              <span class="ml-3 text-lg font-semibold text-gray-900">УВР</span>
            </RouterLink>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <RouterLink
              v-for="item in menuItems"
              :key="item.path"
              :to="item.path"
              class="nav-link inline-flex items-center px-1 pt-1 border-b-2"
              :class="[
                $route.path === item.path
                  ? 'border-primary text-primary'
                  : 'border-transparent hover:border-gray-300'
              ]"
            >
              {{ t(item.title) }}
            </RouterLink>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center space-x-4">
          <AButton
            variant="outline"
            size="sm"
            class="hidden sm:inline-flex"
            @click="$emit('join')"
          >
            {{ t('common.buttons.join') }}
          </AButton>
          <AButton
            variant="primary"
            size="sm"
            class="hidden sm:inline-flex"
            @click="$emit('login')"
          >
            {{ t('common.buttons.login') }}
          </AButton>

          <!-- Mobile menu button -->
          <button
            type="button"
            class="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            @click="toggleMobileMenu"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              :class="{ 'hidden': isMobileMenuOpen, 'block': !isMobileMenuOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              class="h-6 w-6"
              :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }"
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
    </nav>

    <!-- Mobile menu -->
    <div
      class="sm:hidden"
      :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }"
    >
      <div class="pt-2 pb-3 space-y-1">
        <RouterLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="nav-link block pl-3 pr-4 py-2 border-l-4"
          :class="[
            $route.path === item.path
              ? 'border-primary text-primary bg-primary-50'
              : 'border-transparent hover:bg-gray-50 hover:border-gray-300'
          ]"
          @click="closeMobileMenu"
        >
          {{ t(item.title) }}
        </RouterLink>

        <div class="pt-4 pb-3 border-t border-gray-200">
          <div class="space-y-2 px-3">
            <AButton variant="outline" block @click="$emit('join')">
              {{ t('common.buttons.join') }}
            </AButton>
            <AButton variant="primary" block @click="$emit('login')">
              {{ t('common.buttons.login') }}
            </AButton>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Spacer to prevent content from going under fixed header -->
  <div class="h-16"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink, useRoute } from 'vue-router';
import AButton from '~/components/atoms/a-button/a-button.vue';

interface MenuItem {
  path: string;
  title: string;
}

export default defineComponent({
  name: 'OHeader',

  components: {
    AButton,
    RouterLink
  },

  emits: ['join', 'login'],

  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const isMobileMenuOpen = ref(false);

    const menuItems: MenuItem[] = [
      { path: '/leadership', title: 'common.navigation.leadership' },
      { path: '/legal-help', title: 'common.navigation.legalHelp' },
      { path: '/prosthetics', title: 'common.navigation.prosthetics' },
      { path: '/family', title: 'common.navigation.familyToFamily' },
      { path: '/activities', title: 'common.navigation.ourActivities' },
      { path: '/about', title: 'common.navigation.aboutUs' }
    ];

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false;
    };

    return {
      t,
      route,
      menuItems,
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu
    };
  }
});
</script>

<style lang="scss" scoped>
.o-header {
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.95);
}
</style> 