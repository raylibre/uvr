<template>
  <header class="o-header">
    <nav class="nav">
      <div class="header-container">
        <!-- Logo -->

        <div class="logo">
          <RouterLink :to="{ name: ROUTE_NAMES.HOME }" class="logo__link">
            <img src="/images/logo_dark_navy_cut.png" alt="УВР" class="logo__image" />
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="nav-desktop">
          <template v-for="item in menuItems" :key="item.name">
            <div v-if="item.children" class="nav-dropdown-wrapper" v-click-outside="() => closeDropdown(item.name)"
                 @mouseenter="openDropdown(item.name)" @mouseleave="closeDropdown(item.name)">
              <MHeaderNavButton
                :to="item.path || { name: item.name }"
                :translation-key="item.title"
                @click="toggleDropdown(item.name)"
                :class="{ 'is-dropdown-open': isDropdownOpen(item.name) }"
              >
                <template #dropdown-indicator>
                  <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.584l3.71-3.354a.75.75 0 111.02 1.1l-4.25 3.85a.75.75 0 01-1.02 0l-4.25-3.85a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                  </svg>
                </template>
              </MHeaderNavButton>
              <div v-if="isDropdownOpen(item.name)" class="nav-dropdown-menu">
                <MHeaderNavButton
                  v-for="child in item.children"
                  :key="child.name"
                  :to="child.path || { name: child.name }"
                  :translation-key="child.title"
                  class="dropdown-item"
                  @click="closeDropdown(item.name)"
                />
              </div>
            </div>
            <MHeaderNavButton
              v-else
              :to="getNavigationRoute(item)"
              :exact="item.exact"
              :translation-key="item.title"
            />
          </template>
        </div>

        <!-- Action Buttons with Language Switcher -->
        <div class="actions">
          <!-- Desktop Language Switcher -->
          <OLangChangeBlock class="language-switcher" />

          <!-- Loading state during initialization -->
          <div v-if="!isInitialized" class="initialization-loading">
            <div class="loading-spinner"/>
          </div>

          <!-- Desktop Authentication Section -->
          <div v-else-if="isAuthenticated" class="user-section">
            <MUserDropdown />
          </div>
          <div v-else class="auth-buttons">
            <AButton
              variant="outline"
              size="md"
              class="action-button action-button--join"
              @click="handleJoin"
            >
              {{ t(T_KEYS.COMMON.BUTTONS.JOIN) }}
            </AButton>
            <AButton
              variant="primary"
              size="md"
              class="action-button action-button--login"
              @click="handleLogin"
            >
              {{ t(T_KEYS.COMMON.BUTTONS.LOGIN) }}
            </AButton>
          </div>

          <!-- Compact Mobile Authentication Section -->
          <div class="mobile-compact-actions">
            <!-- Mobile Language Switcher -->
            <OLangChangeBlock class="mobile-language-switcher" />

            <!-- Mobile Loading State -->
            <div v-if="!isInitialized" class="mobile-loading">
              <div class="loading-spinner-sm"/>
            </div>

            <!-- Mobile User Section -->
            <div v-else-if="isAuthenticated" class="mobile-user-section">
              <MUserDropdown />
            </div>
            <div v-else class="mobile-auth-buttons">
              <AButton
                variant="outline"
                size="sm"
                @click="handleJoin"
              >
                {{ t(T_KEYS.COMMON.BUTTONS.JOIN) }}
              </AButton>
              <AButton
                variant="primary"
                size="sm"
                class="ml-2"
                @click="handleLogin"
              >
                {{ t(T_KEYS.COMMON.BUTTONS.LOGIN) }}
              </AButton>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button
            type="button"
            class="mobile-menu-button"
            @click="toggleMobileMenu"
          >
            <span class="mobile-menu-label">Open main menu</span>
            <svg
              class="mobile-menu-icon"
              :class="{
              'is-visible': !isMobileMenuOpen,
              'is-hidden': isMobileMenuOpen
            }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="mobile-menu-icon"
              :class="{
              'is-visible': isMobileMenuOpen,
              'is-hidden': !isMobileMenuOpen
            }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div
      class="mobile-menu"
      :class="{ 'is-open': isMobileMenuOpen }"
    >
      <div class="mobile-menu__content">
        <template v-for="item in menuItems" :key="item.name">
          <div v-if="item.children" class="mobile-nav-dropdown">
            <MHeaderNavButton
              :to="item.path || { name: item.name }"
              :translation-key="item.title"
              class="mobile"
              @click="closeMobileMenu"
              :exact="true"
            />
            <div class="mobile-dropdown-menu">
              <MHeaderNavButton
                v-for="child in item.children"
                :key="child.name"
                :to="child.path || { name: child.name }"
                :translation-key="child.title"
                class="mobile dropdown-item"
                @click="closeMobileMenu"
              />
            </div>
          </div>
          <MHeaderNavButton
            v-else
            :to="getNavigationRoute(item)"
            :exact="item.exact"
            :translation-key="item.title"
            class="mobile"
            @click="closeMobileMenu"
          />
        </template>
        <div class="mobile-menu__actions">
          <!-- Mobile Language Switcher -->
          <div class="mobile-menu__language">
            <OLangChangeBlock />
          </div>
          <!-- Mobile Authentication Section -->
          <div v-if="isAuthenticated" class="mobile-menu__user">
            <MUserDropdown />
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Spacer to prevent content from going under fixed header -->
  <div class="spacer"/>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import AButton from '~/components/atoms/a-button/a-button.vue';
import OLangChangeBlock from '~/components/organisms/o-lang-change-block';
import { MENU_ITEMS, type MenuItem } from '~/constants/navigation-constants';
import { useTranslation } from '~/composables/use-translation';
import { useLanguage } from '~/composables/use-language';
import { useEventBus } from '~/composables/use-event-bus';
import { useUserStore } from '~/composables/use-user-store';
import { EVENTS } from '~/constants/event-bus-constants';
import { ROUTE_NAMES } from '~/constants/router-constants';
import MHeaderNavButton from '~/components/molecules/m-header-nav-button';
import MUserDropdown from '~/components/molecules/m-user-dropdown';
import clickOutside from '~/directives/click-outside';

export default defineComponent({
  name: 'OHeader',

  components: {
    AButton,
    RouterLink,
    MHeaderNavButton,
    OLangChangeBlock,
    MUserDropdown
  },
  directives: {
    clickOutside
  },
  setup() {
    const { t, T_KEYS } = useTranslation();
    const { initializeLanguage } = useLanguage();
    const route = useRoute();
    const { BUS } = useEventBus();
    const { isAuthenticated, initialize, unreadNotificationsCount, isInitialized } = useUserStore();
    const isMobileMenuOpen = ref(false);
    const dropdownOpen = ref<string | null>(null);
    const openDropdown = (name: string) => { dropdownOpen.value = name; };
    const closeDropdown = (name: string) => { if (dropdownOpen.value === name) dropdownOpen.value = null; };
    const toggleDropdown = (name: string) => { dropdownOpen.value = dropdownOpen.value === name ? null : name; };
    const isDropdownOpen = (name: string) => dropdownOpen.value === name;

    const getNavigationRoute = (item: MenuItem) => {
      // If the item has a custom path, use it directly
      if (item.path) {
        return item.path;
      }
      // Otherwise, use the route name
      return { name: item.name };
    };

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false;
    };

    const handleJoin = () => {
      BUS.emit(EVENTS.OPEN_REGISTER_MODAL as any);
    };

    const handleLogin = () => {
      BUS.emit(EVENTS.SHOW_LOGIN_MODAL as any);
    };

    // Initialize language and user data on component mount
    onMounted(() => {
      initializeLanguage();
      initialize();
    });

    return {
      t,
      T_KEYS,
      route,
      menuItems: MENU_ITEMS,
      isMobileMenuOpen,
      isAuthenticated,
      getNavigationRoute,
      toggleMobileMenu,
      closeMobileMenu,
      handleJoin,
      handleLogin,
      ROUTE_NAMES,
      unreadNotificationsCount,
      isInitialized,
      openDropdown,
      closeDropdown,
      toggleDropdown,
      isDropdownOpen
    };
  }
});
</script>

<style lang="scss">
.o-header {
  @apply fixed w-full top-0 z-50 shadow-sm;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.95);

  // Navigation
  .nav {
    @apply mx-auto px-4 sm:px-6 lg:px-8;
  }

  .header-container {
    @apply flex items-center justify-between h-20 min-w-0;
  }

  // Logo
  .logo {
    @apply flex-shrink-0 flex items-center;

    &__link {
      @apply flex items-center;
    }

    &__image {
      @apply h-8 sm:h-12 w-auto text-primary;
    }

    &__text {
      @apply hidden sm:block ml-3 text-lg font-semibold text-gray-900;
    }
  }

  // Desktop Navigation
  .nav-desktop {
    @apply hidden lg:ml-6 lg:flex lg:space-x-2;
  }

  .nav-dropdown-wrapper {
    position: relative;
    display: inline-block;
    .dropdown-arrow {
      margin-left: 0.25rem;
      vertical-align: middle;
      transition: transform 0.2s;
    }
    &.is-dropdown-open .dropdown-arrow {
      transform: rotate(180deg);
    }
  }
  .nav-dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border-radius: 0.5rem;
    z-index: 100;
    padding: 0.5rem 0;
    .dropdown-item {
      width: 100%;
      text-align: left;
      padding-left: 1.5rem;
    }
  }

  // Action Buttons with Language Switcher
  .actions {
    @apply flex items-center space-x-2;

    .language-switcher {
      @apply hidden md:block;
    }

    .initialization-loading {
      @apply hidden md:flex items-center px-2;
    }

    .user-section {
      @apply hidden md:flex items-center space-x-2;
    }

    .user-stats {
      @apply flex items-center;
    }

    .auth-buttons {
      @apply hidden md:flex md:space-x-2;
    }

    // Mobile compact actions for smaller screens
    .mobile-compact-actions {
      @apply flex md:hidden items-center space-x-2;

      .mobile-language-switcher {
        @apply block;
      }

      .mobile-loading {
        @apply flex items-center;
      }

      .mobile-user-section {
        @apply block;
      }

      .mobile-auth-buttons {
        @apply flex;
      }
    }
  }

  .action-button {
    @apply inline-flex;
  }

  // Mobile Menu Button
  .mobile-menu-button {
    @apply lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400
           hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary;
  }

  .mobile-menu-label {
    @apply sr-only;
  }

  .mobile-menu-icon {
    @apply h-6 w-6;

    &.is-hidden {
      @apply hidden;
    }

    &.is-visible {
      @apply block;
    }
  }

  // Mobile Menu
  .mobile-menu {
    @apply lg:hidden hidden;

    &.is-open {
      @apply block;
    }

    &__content {
      @apply px-2 pt-2 pb-3 space-y-1;
    }

    &__actions {
      @apply pt-4 pb-3 border-t border-gray-200;
    }

    &__language {
      @apply px-2;
    }

    &__user {
      @apply mt-4 px-2;
    }

    &__buttons {
      @apply mt-3 space-y-2 px-2;

      .button-row {
        @apply flex space-x-2 space-y-0;
      }
    }
  }

  .mobile-nav-dropdown {
    .dropdown-arrow {
      margin-left: 0.5rem;
      vertical-align: middle;
      transition: transform 0.2s;
    }
    &.is-dropdown-open .dropdown-arrow {
      transform: rotate(180deg);
    }
    .mobile-dropdown-menu {
      padding-left: 1.5rem;
      .dropdown-item {
        padding-left: 1.5rem;
      }
    }
  }

  // Spacer
  & + .spacer {
    @apply h-16;
  }

  .loading-spinner {
    @apply animate-spin h-5 w-5 border-2 border-gray-300 border-t-primary rounded-full;
  }

  .loading-spinner-sm {
    @apply animate-spin h-4 w-4 border-2 border-gray-300 border-t-primary rounded-full;
  }
}
</style>