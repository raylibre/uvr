<template>
  <div v-click-outside="closeDropdown" class="m-user-dropdown">
    <!-- User Avatar Button -->
    <button
      type="button"
      class="user-button"
      :aria-expanded="isOpen"
      aria-haspopup="true"
      @click="toggleDropdown"
    >
      <div class="user-avatar">
        <img
          v-if="user?.avatar_url"
          :src="user.avatar_url"
          :alt="userDisplayName"
          class="avatar-image"
        />
        <div v-else class="avatar-initials">
          {{ userInitials }}
        </div>
      </div>
      <div class="user-info">
        <span class="user-name">{{ userDisplayName }}</span>
        <span class="user-status" :class="statusClass">
          {{ userStatusText }}
        </span>
      </div>
      <svg
        class="dropdown-icon"
        :class="{ 'is-open': isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-show="isOpen"
      class="dropdown-menu"
      role="menu"
      aria-orientation="vertical"
    >
      <div class="dropdown-header">
        <div class="user-avatar-large">
          <img
            v-if="user?.avatar_url"
            :src="user.avatar_url"
            :alt="userDisplayName"
            class="avatar-image"
          />
          <div v-else class="avatar-initials">
            {{ userInitials }}
          </div>
        </div>
        <div class="user-details">
          <p class="full-name">{{ userFullName }}</p>
          <p class="email">{{ user?.email }}</p>
          <p class="verification-status" :class="statusClass">
            {{ userStatusText }}
          </p>
        </div>
      </div>

      <div class="dropdown-divider" />

      <div class="dropdown-section">
        <button
          type="button"
          class="dropdown-item"
          role="menuitem"
          @click="handleProfile"
        >
          <i class="fas fa-user item-icon" />
          <span>{{ t(T_KEYS.COMMON.BUTTONS.PROFILE) }}</span>
        </button>

        <button
          type="button"
          class="dropdown-item"
          role="menuitem"
          @click="handleSettings"
        >
          <i class="fas fa-cog item-icon" />
          <span>{{ t(T_KEYS.COMMON.BUTTONS.SETTINGS) }}</span>
        </button>
      </div>

      <div class="dropdown-divider" />

      <div class="dropdown-section">
        <button
          type="button"
          class="dropdown-item dropdown-item--danger"
          role="menuitem"
          @click="handleLogout"
        >
          <i class="fas fa-sign-out-alt item-icon" />
          <span>{{ t(T_KEYS.COMMON.BUTTONS.LOGOUT) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useUserStore } from '~/composables/use-user-store';
import clickOutside from '~/directives/click-outside';
import { useTranslation } from '~/composables/use-translation';

export default defineComponent({
  name: 'MUserDropdown',
  
  directives: {
    clickOutside
  },

  setup() {
    const { t, T_KEYS } = useTranslation();
    const { user, userDisplayName, userFullName, userInitials, logout, isVerified } = useUserStore();
    const isOpen = ref(false);

    // Computed properties
    const statusClass = computed(() => {
      if (!user.value) return '';
      return isVerified.value ? 'status-verified' : 'status-pending';
    });

    const userStatusText = computed(() => {
      if (!user.value) return '';
      // Use direct keys to avoid any stale T_KEYS mismatch
      return isVerified.value ? t('user.status.verified') : t('user.status.pendingVerification');
    });

    // Methods
    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const closeDropdown = () => {
      isOpen.value = false;
    };

    const handleProfile = () => {
      console.log('Navigate to profile');
      closeDropdown();
      // TODO: Navigate to profile page
    };

    const handleSettings = () => {
      console.log('Navigate to settings');
      closeDropdown();
      // TODO: Navigate to settings page
    };

    const handleLogout = () => {
      logout();
      closeDropdown();
    };

    return {
      t,
      T_KEYS,
      user,
      isOpen,
      userDisplayName,
      userFullName,
      userInitials,
      statusClass,
      userStatusText,
      toggleDropdown,
      closeDropdown,
      handleProfile,
      handleSettings,
      handleLogout
    };
  }
});
</script>

<style lang="scss" scoped>
.m-user-dropdown {
  @apply relative;
}

.user-button {
  @apply flex items-center space-x-3 px-3 py-2 rounded-lg text-left
         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
         transition-colors duration-200;
}

.user-avatar {
  @apply w-8 h-8 rounded-full flex-shrink-0 overflow-hidden bg-gray-200;

  .avatar-image {
    @apply w-full h-full object-cover;
  }

  .avatar-initials {
    @apply w-full h-full flex items-center justify-center text-sm font-medium text-gray-600;
  }
}

.user-info {
  @apply flex flex-col min-w-0 flex-1;

  .user-name {
    @apply text-sm font-medium text-gray-900 truncate;
  }

  .user-status {
    @apply text-xs truncate;

    &.status-verified {
      @apply text-green-600;
    }

    &.status-pending {
      @apply text-yellow-600;
    }
  }
}

.dropdown-icon {
  @apply w-4 h-4 text-gray-400 transition-transform duration-200;

  &.is-open {
    @apply transform rotate-180;
  }
}

.dropdown-menu {
  @apply absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg
         border border-gray-200 z-50 py-2;
}

.dropdown-header {
  @apply flex items-center space-x-3 px-4 py-3;

  .user-avatar-large {
    @apply w-12 h-12 rounded-full flex-shrink-0 overflow-hidden bg-gray-200;

    .avatar-image {
      @apply w-full h-full object-cover;
    }

    .avatar-initials {
      @apply w-full h-full flex items-center justify-center text-lg font-medium text-gray-600;
    }
  }

  .user-details {
    @apply flex-1 min-w-0;

    .full-name {
      @apply text-sm font-medium text-gray-900 truncate;
    }

    .email {
      @apply text-sm text-gray-500 truncate;
    }

    .verification-status {
      @apply text-xs font-medium;

      &.status-verified {
        @apply text-green-600;
      }

      &.status-pending {
        @apply text-yellow-600;
      }
    }
  }
}

.dropdown-divider {
  @apply h-px bg-gray-200 my-2;
}

.dropdown-section {
  @apply px-2;
}

.dropdown-item {
  @apply flex items-center space-x-3 w-full px-3 py-2 text-sm text-gray-700
         hover:bg-gray-50 rounded-md transition-colors duration-150;

  &--danger {
    @apply text-red-600 hover:bg-red-50;
  }

  .item-icon {
    @apply w-4 h-4 text-gray-400;

    .dropdown-item--danger & {
      @apply text-red-400;
    }
  }

  .notification-badge {
    @apply ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center;
  }
}

// Mobile responsiveness
@media (max-width: 640px) {
  .user-button {
    @apply px-2 py-1;

    .user-info {
      @apply hidden;
    }
  }

  .dropdown-menu {
    @apply w-72 right-0;
  }
}
</style> 
