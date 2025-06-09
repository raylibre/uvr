import { ref, computed } from 'vue';
import type { ProgramDetail, UserParticipation, JoinProgramRequest } from '~/interfaces/project.interface';
import { getProgramDetail, joinProgram } from '~/services/api/projects-api-service';

const programsCache = ref<Record<string, ProgramDetail>>({});
const participationsCache = ref<Record<number, UserParticipation | null>>({});

export function useProgramDetail(slug: string) {
  const program = ref<ProgramDetail | null>(null);
  const userParticipation = ref<UserParticipation | null>(null);
  const isLoading = ref(false);
  const isJoining = ref(false);
  const error = ref<string | null>(null);
  const joinError = ref<string | null>(null);

  // Mock authentication check (replace with real auth service)
  const isAuthenticated = ref(true); // TODO: Connect to real auth service
  const currentUser = ref({ id: 123, name: 'Іван Петренко' }); // TODO: Get from auth service

  const canJoin = computed(() => {
    if (!isAuthenticated.value || !program.value) return false;
    if (userParticipation.value) return false; // Already applied
    if (program.value.status !== 'active') return false;
    if (program.value.max_participants && program.value.current_participants >= program.value.max_participants) return false;
    return true;
  });

  const participationStatusText = computed(() => {
    if (!userParticipation.value) return null;
    
    const statusMap = {
      pending: 'Заявка на розгляді',
      approved: 'Заявка схвалена',
      rejected: 'Заявка відхилена',
      completed: 'Програма завершена',
      withdrawn: 'Заявка відкликана'
    };
    
    return statusMap[userParticipation.value.status] || userParticipation.value.status;
  });

  const participationStatusColor = computed(() => {
    if (!userParticipation.value) return 'gray';
    
    const colorMap = {
      pending: 'yellow',
      approved: 'green',
      rejected: 'red',
      completed: 'blue',
      withdrawn: 'gray'
    };
    
    return colorMap[userParticipation.value.status] || 'gray';
  });

  async function fetchProgramDetail(): Promise<void> {
    if (isLoading.value) return;
    
    // Check cache first
    if (programsCache.value[slug]) {
      program.value = programsCache.value[slug];
      userParticipation.value = participationsCache.value[program.value.id] || null;
      return;
    }
    
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await getProgramDetail(slug);
      program.value = response.data.program;
      userParticipation.value = response.data.user_participation;
      
      // Cache the results
      programsCache.value[slug] = program.value;
      participationsCache.value[program.value.id] = userParticipation.value;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Помилка завантаження програми';
      console.error('Error fetching program detail:', err);
    } finally {
      isLoading.value = false;
    }
  }

  async function handleJoinProgram(applicationMessage: string): Promise<boolean> {
    if (!program.value || !isAuthenticated.value || isJoining.value) return false;
    
    isJoining.value = true;
    joinError.value = null;
    
    try {
      const request: JoinProgramRequest = {
        project_id: program.value.id,
        application_message: applicationMessage
      };
      
      const response = await joinProgram(request);
      userParticipation.value = response.data.participation;
      
      // Update cache
      participationsCache.value[program.value.id] = userParticipation.value;
      
      // Update current participants count
      if (program.value) {
        program.value.current_participants += 1;
        programsCache.value[slug] = program.value;
      }
      
      return true;
    } catch (err) {
      joinError.value = err instanceof Error ? err.message : 'Помилка при подачі заявки';
      console.error('Error joining program:', err);
      return false;
    } finally {
      isJoining.value = false;
    }
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function formatBudget(budget: number): string {
    return new Intl.NumberFormat('uk-UA').format(budget) + ' грн';
  }

  function getProjectTypeLabel(type: string): string {
    const typeMap: Record<string, string> = {
      ai_psychology: 'ШІ-психологія',
      family_support: 'Підтримка сімей',
      prosthetics: 'Протезування',
      civilian_retraining: 'Перекваліфікація',
      legal_aid: 'Правова допомога'
    };
    return typeMap[type] || type;
  }

  return {
    program,
    userParticipation,
    isLoading,
    isJoining,
    error,
    joinError,
    isAuthenticated,
    currentUser,
    canJoin,
    participationStatusText,
    participationStatusColor,
    fetchProgramDetail,
    handleJoinProgram,
    formatDate,
    formatBudget,
    getProjectTypeLabel
  };
} 