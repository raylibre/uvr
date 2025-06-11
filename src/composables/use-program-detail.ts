import { ref, computed, reactive, ComputedRef } from 'vue';
import AsyncSource from 'async-source';
import type { 
  ProgramDetail, 
  UserProjectStatus, 
  UserProjectStatusResponse,
  JoinProgramRequest 
} from '~/interfaces/project.interface';
import { 
  fetchProgramDetail, 
  fetchUserProjectStatus, 
  submitProgramJoin 
} from '~/services/api/projects-api-service';
import { handleApiError, notifySuccess } from '~/services/notification-service';
import { PROJECT_TYPE_LABELS } from '~/constants/status-constants';
import { LOCALE_CONFIG } from '~/constants/datetime-constants';
import { useUserStore } from './use-user-store';

const programsCache = ref<Record<string, ProgramDetail>>({});
const statusCache = ref<Record<number, UserProjectStatus>>({});

// Status labels mapping
const USER_STATUS_LABELS = {
  'can_apply': 'Можна подавати заявку',
  'already_applied': 'Заявка вже подана',
  'application_pending': 'Заявка на розгляді',
  'application_approved': 'Заявка схвалена',
  'application_rejected': 'Заявка відхилена',
  'category_not_allowed': 'Категорія не дозволена',
  'user_not_verified': 'Потрібна верифікація користувача'
};

const USER_STATUS_COLORS = {
  'can_apply': 'green',
  'already_applied': 'blue',
  'application_pending': 'yellow',
  'application_approved': 'green',
  'application_rejected': 'red',
  'category_not_allowed': 'red',
  'user_not_verified': 'orange'
};

export function useProgramDetail(slug: ComputedRef) {
  // Get authentication state from user store
  const { isAuthenticated, user } = useUserStore();
  
  // Error state tracking
  const error = ref<string | null>(null);
  const statusError = ref<string | null>(null);
  const joinError = ref<string | null>(null);

  // Create AsyncSource instances with custom error handlers
  const programDetailSource = reactive(new AsyncSource(fetchProgramDetail, (err) => {
    error.value = err.message || 'Failed to load program details';
    handleApiError(err);
  }));
  
  const userStatusSource = reactive(new AsyncSource(fetchUserProjectStatus, (err) => {
    statusError.value = err.message || 'Failed to load user status';
    handleApiError(err);
  }));
  
  const joinProgramSource = reactive(new AsyncSource(submitProgramJoin, (err) => {
    joinError.value = err.message || 'Failed to join program';
    handleApiError(err);
  }));

  const program = ref<ProgramDetail | null>(null);
  const userStatus = ref<UserProjectStatus | null>(null);

  // Loading states
  const isLoading = computed(() => programDetailSource.isLoading);
  const isLoadingStatus = computed(() => userStatusSource.isLoading);
  const isJoining = computed(() => joinProgramSource.isLoading);

  // Helper to determine if program was not found
  const isProgramNotFound = computed(() => {
    return !isLoading.value && !program.value && error.value;
  });

  // Computed properties
  const canApply = computed(() => {
    return userStatus.value?.can_apply === true;
  });

  const userStatusText = computed(() => {
    if (!userStatus.value) return '';
    return USER_STATUS_LABELS[userStatus.value.status] || userStatus.value.status;
  });

  const userStatusColor = computed(() => {
    if (!userStatus.value) return 'gray';
    return USER_STATUS_COLORS[userStatus.value.status] || 'gray';
  });

  const statusReason = computed(() => {
    return userStatus.value?.reason || '';
  });

  // Methods
  function loadProgramDetail() {
    // Clear previous error
    error.value = null;

    programDetailSource.push(handleProgramDetailSuccess, slug.value);
  }

  function loadUserStatus() {
    // Only load user status if user is authenticated and program is loaded
    if (!program.value || !isAuthenticated.value) return;
    
    // Clear previous error
    statusError.value = null;
    
    // Check cache first
    const cacheKey = program.value.id;
    if (statusCache.value[cacheKey]) {
      userStatus.value = statusCache.value[cacheKey];
      return;
    }

    userStatusSource.push(handleUserStatusSuccess, program.value.id);
  }

  function joinProgram(applicationMessage: string) {
    if (!program.value || !canApply.value) {
      throw new Error('Cannot apply to this program');
    }

    // Clear previous error
    joinError.value = null;

    const request: JoinProgramRequest = {
      project_id: program.value.id,
      application_message: applicationMessage
    };

    joinProgramSource.push(handleJoinSuccess, request);
  }

  // Success handlers
  function handleProgramDetailSuccess(result: ProgramDetail) {
    program.value = result;
    programsCache.value[slug.value] = result;
    error.value = null; // Clear error on success
    console.log('Program detail loaded successfully:', result);
    
    // Auto-load user status after program is loaded (only if authenticated)
    loadUserStatus();
  }

  function handleUserStatusSuccess(result: UserProjectStatusResponse) {
    userStatus.value = result.data;
    if (program.value) {
      statusCache.value[program.value.id] = result.data;
    }
    statusError.value = null; // Clear error on success
    console.log('User status loaded successfully:', result);
  }

  function handleJoinSuccess(result: any) {
    // Update user status after successful application
    if (userStatus.value && program.value) {
      userStatus.value.status = 'application_pending';
      userStatus.value.can_apply = false;
      userStatus.value.reason = 'Application submitted successfully';
      statusCache.value[program.value.id] = userStatus.value;
    }
    
    joinError.value = null; // Clear error on success
    notifySuccess('Заявка успішно подана! Ми розглянемо її найближчим часом.');
    console.log('Successfully joined program:', result);
  }

  // Utility functions
  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString(LOCALE_CONFIG.UKRAINE, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function formatBudget(budget: number): string {
    return new Intl.NumberFormat(LOCALE_CONFIG.UKRAINE).format(budget) + ' грн';
  }

  function getProjectTypeLabel(type: string): string {
    return PROJECT_TYPE_LABELS[type as keyof typeof PROJECT_TYPE_LABELS] || type;
  }

  function formatDescription(description: string): string {
    return description.replace(/\n/g, '<br>');
  }

  return {
    // Data
    program,
    userStatus,
    isAuthenticated: isAuthenticated,
    currentUser: user,
    
    // Loading states
    isLoading,
    isLoadingStatus,
    isJoining,
    
    // Error states
    error,
    statusError,
    joinError,
    isProgramNotFound,
    
    // Computed properties
    canApply,
    userStatusText,
    userStatusColor,
    statusReason,
    
    // Methods
    loadProgramDetail,
    loadUserStatus,
    joinProgram,
    formatDate,
    formatBudget,
    getProjectTypeLabel,
    formatDescription,
    
    // Legacy methods for backward compatibility
    fetchProgramDetail: loadProgramDetail,
    handleJoinProgram: (message: string) => {
      joinProgram(message);
      return Promise.resolve(true);
    }
  };
} 