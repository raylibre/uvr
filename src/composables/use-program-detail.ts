import { ref, computed, reactive } from 'vue';
import AsyncSource from 'async-source';
import type { ProgramDetail, UserParticipation, JoinProgramRequest, ProgramDetailResponse } from '~/interfaces/project.interface';
import { fetchProgramDetail, submitProgramJoin } from '~/services/api/projects-api-service';
import { handleApiError, notifySuccess } from '~/services/notification-service';
import { PARTICIPATION_STATUS_LABELS, PARTICIPATION_STATUS_COLORS, PROJECT_TYPE_LABELS } from '~/constants/status-constants';
import { DATE_FORMATS, LOCALE_CONFIG } from '~/constants/datetime-constants';

const programsCache = ref<Record<string, ProgramDetail>>({});
const participationsCache = ref<Record<number, UserParticipation | null>>({});

export function useProgramDetail(slug: string) {
  // Create AsyncSource instances
  const programDetailSource = reactive(new AsyncSource(fetchProgramDetail, handleApiError));
  const joinProgramSource = reactive(new AsyncSource(submitProgramJoin, handleApiError));

  const program = ref<ProgramDetail | null>(null);
  const userParticipation = ref<UserParticipation | null>(null);

  // Mock authentication check (replace with real auth service)
  const isAuthenticated = ref(true); // TODO: Connect to real auth service
  const currentUser = ref({ id: 123, name: 'Іван Петренко' }); // TODO: Get from auth service

  // Loading states
  const isLoading = computed(() => programDetailSource.isLoading);
  const isJoining = computed(() => joinProgramSource.isLoading);

  // Computed properties
  const canJoin = computed(() => {
    if (!isAuthenticated.value || !program.value) return false;
    if (userParticipation.value) return false; // Already applied
    if (program.value.status !== 'active') return false;
    if (program.value.max_participants && program.value.current_participants >= program.value.max_participants) return false;
    return true;
  });

  const participationStatusText = computed(() => {
    if (!userParticipation.value) return null;
    return PARTICIPATION_STATUS_LABELS[userParticipation.value.status] || userParticipation.value.status;
  });

  const participationStatusColor = computed(() => {
    if (!userParticipation.value) return 'gray';
    return PARTICIPATION_STATUS_COLORS[userParticipation.value.status] || 'gray';
  });

  // Methods
  function loadProgramDetail(): void {
    // Check cache first
    if (programsCache.value[slug]) {
      program.value = programsCache.value[slug];
      userParticipation.value = participationsCache.value[program.value.id] || null;
      return;
    }
    
    programDetailSource.push(handleProgramDetailSuccess, slug);
  }

  function joinProgram(applicationMessage: string): void {
    if (!program.value || !isAuthenticated.value || isJoining.value) return;
    
    const request: JoinProgramRequest = {
      project_id: program.value.id,
      application_message: applicationMessage
    };
    
    joinProgramSource.push(handleJoinSuccess, request);
  }

  // Success handlers
  function handleProgramDetailSuccess(response: ProgramDetailResponse) {
    program.value = response.data.program;
    userParticipation.value = response.data.user_participation;
    
    // Cache the results
    programsCache.value[slug] = program.value;
    participationsCache.value[program.value.id] = userParticipation.value;
    
    console.log('Program detail loaded successfully:', program.value.title);
  }

  function handleJoinSuccess(response: any) {
    userParticipation.value = response.data.participation;
    
    // Update cache
    if (program.value) {
      participationsCache.value[program.value.id] = userParticipation.value;
      
      // Update current participants count
      program.value.current_participants += 1;
      programsCache.value[slug] = program.value;
    }
    
    notifySuccess('Заявка успішно подана! Ми розглянемо її найближчим часом.');
    console.log('Successfully joined program');
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

  return {
    // Data
    program,
    userParticipation,
    isAuthenticated,
    currentUser,
    
    // Loading states
    isLoading,
    isJoining,
    
    // Computed properties
    canJoin,
    participationStatusText,
    participationStatusColor,
    
    // Methods
    loadProgramDetail,
    joinProgram,
    formatDate,
    formatBudget,
    getProjectTypeLabel,
    
    // Legacy methods for backward compatibility
    fetchProgramDetail: loadProgramDetail,
    handleJoinProgram: (message: string) => {
      joinProgram(message);
      return Promise.resolve(true); // For backward compatibility
    }
  };
} 