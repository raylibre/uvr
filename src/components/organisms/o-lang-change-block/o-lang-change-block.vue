<template>
  <div class="o-lang-change-block">
    <div class="language-switcher" :class="{ 'is-open': isDropdownOpen }">
      <button
        type="button"
        class="language-button"
        @click="toggleDropdown"
      >
        <span :class="currentLanguage.flag" class="language-flag" />
        <span class="language-code">{{ currentLanguage.code.toUpperCase() }}</span>
        <svg
          class="dropdown-icon"
          :class="{ 'is-rotated': isDropdownOpen }"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div v-if="isDropdownOpen" class="dropdown-menu">
        <button
          v-for="language in availableLanguages"
          :key="language.code"
          type="button"
          class="dropdown-item"
          :class="{ 'is-active': language.code === currentLanguage.code }"
          @click="handleLanguageChange(language.code)"
        >
          <span :class="language.flag" class="language-flag" />
          <span class="language-name">{{ language.name }}</span>
          <i v-if="language.code === currentLanguage.code" class="fas fa-check check-icon" />
        </button>
      </div>
    </div>

    <!-- Backdrop to close dropdown when clicking outside -->
    <div
      v-if="isDropdownOpen"
      class="dropdown-backdrop"
      @click="closeDropdown"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useLanguage } from '~/composables/use-language';

export default defineComponent({
  name: 'OLangChangeBlock',

  setup() {
    const { currentLanguage, availableLanguages, setLanguage } = useLanguage();
    const isDropdownOpen = ref(false);

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const closeDropdown = () => {
      isDropdownOpen.value = false;
    };

    const handleLanguageChange = (languageCode: string) => {
      setLanguage(languageCode);
      closeDropdown();
    };

    // Close dropdown when clicking outside
    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-switcher')) {
        closeDropdown();
      }
    };

    // Close dropdown on ESC key
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDropdownOpen.value) {
        closeDropdown();
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeydown);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    });

    return {
      currentLanguage,
      availableLanguages,
      isDropdownOpen,
      toggleDropdown,
      closeDropdown,
      handleLanguageChange
    };
  }
});
</script>

<style lang="scss">
.o-lang-change-block {
  @apply relative inline-block;

  .language-switcher {
    @apply relative;
  }

  .language-button {
    @apply flex items-center space-x-2 px-4 py-3 text-base rounded-lg font-medium;
    @apply text-gray-700 hover:text-gray-900 hover:bg-gray-100;
    @apply border border-gray-200 bg-white shadow-sm;
    @apply transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20;

    &:hover {
      @apply border-gray-300;
    }

    .is-open & {
      @apply bg-gray-50 border-gray-300;
    }
  }

  .language-flag {
    width: 20px;
    height: 15px;
    border-radius: 2px;
    display: inline-block;
    background-size: cover;
    background-position: center;
    flex-shrink: 0;
  }

  .language-code {
    @apply text-xs font-semibold tracking-wide;
  }

  .dropdown-icon {
    @apply w-4 h-4 transition-transform duration-200;

    &.is-rotated {
      @apply rotate-180;
    }
  }

  .dropdown-menu {
    @apply absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50;
    @apply py-1 max-h-60 overflow-y-auto;
  }

  .dropdown-item {
    @apply w-full flex items-center justify-between px-4 py-2 text-sm;
    @apply text-gray-700 hover:text-gray-900 hover:bg-gray-50;
    @apply transition-colors duration-150;

    &.is-active {
      @apply bg-primary bg-opacity-10 text-primary;

      .language-name {
        @apply font-medium;
      }
    }

    &:first-child {
      @apply rounded-t-lg;
    }

    &:last-child {
      @apply rounded-b-lg;
    }

    .language-flag {
      @apply mr-3;
    }
  }

  .language-name {
    @apply flex-1 text-left;
  }

  .check-icon {
    @apply text-primary text-xs;
  }

  .dropdown-backdrop {
    @apply fixed inset-0 z-40;
  }

  // Mobile responsive adjustments
  @media (max-width: 640px) {
    .language-button {
      @apply px-2 py-1;
    }

    .dropdown-menu {
      @apply w-36;
    }

    .dropdown-item {
      @apply px-3 py-2;
    }
  }
}
</style> 