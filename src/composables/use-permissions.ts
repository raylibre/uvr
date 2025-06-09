import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { Permission, ROLE_PERMISSIONS, UserRole } from '~/constants/permission-constants';

interface User {
  id: number;
  role: UserRole;
  isVerified: boolean;
}

export function usePermissions() {
  const currentUser = useStorage<User | null>('currentUser', null);

  const userRole = computed(() => currentUser.value?.role ?? UserRole.USER);
  const isVerified = computed(() => currentUser.value?.isVerified ?? false);

  const hasPermission = (permission: Permission) => {
    if (!currentUser.value) return false;
    return ROLE_PERMISSIONS[userRole.value].includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]) => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]) => {
    return permissions.every(permission => hasPermission(permission));
  };

  const isAdmin = computed(() => userRole.value === UserRole.ADMIN);
  const isModerator = computed(() => userRole.value === UserRole.MODERATOR || isAdmin.value);
  const isCoordinator = computed(() => userRole.value === UserRole.COORDINATOR);

  const can = {
    viewProfile: (userId: number) => {
      if (!currentUser.value) return false;
      return hasPermission(Permission.VIEW_ALL_PROFILES) ||
        (hasPermission(Permission.VIEW_OWN_PROFILE) && currentUser.value.id === userId);
    },
    updateProfile: (userId: number) => {
      if (!currentUser.value) return false;
      return hasPermission(Permission.UPDATE_ANY_PROFILE) ||
        (hasPermission(Permission.UPDATE_OWN_PROFILE) && currentUser.value.id === userId);
    },
    viewProject: (_projectId: number, isActive: boolean) => {
      if (!currentUser.value) return false;
      return hasPermission(Permission.VIEW_ALL_PROJECTS) ||
        (hasPermission(Permission.VIEW_ACTIVE_PROJECTS) && isActive);
    },
    updateProject: (coordinatorId: number) => {
      if (!currentUser.value) return false;
      return hasPermission(Permission.UPDATE_ANY_PROJECT) ||
        (hasPermission(Permission.UPDATE_OWN_PROJECTS) && currentUser.value.id === coordinatorId);
    },
    viewApplication: (userId: number, _projectId: number) => {
      if (!currentUser.value) return false;
      return hasPermission(Permission.VIEW_PROJECT_APPLICATIONS) ||
        (hasPermission(Permission.VIEW_OWN_APPLICATIONS) && currentUser.value.id === userId);
    }
  };

  return {
    userRole,
    isVerified,
    isAdmin,
    isModerator,
    isCoordinator,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    can
  };
}