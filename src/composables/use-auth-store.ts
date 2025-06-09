/**
 * @deprecated This auth store has been replaced by useUserStore.
 * Please use useUserStore from ~/composables/use-user-store instead.
 * This file will be removed in a future version.
 */

import { useUserStore } from './use-user-store';

/**
 * @deprecated Use useUserStore instead
 */
export function useAuthStore() {
  console.warn('useAuthStore is deprecated. Please use useUserStore instead.');
  return useUserStore();
} 