import apiClient from './api-client';
import type { 
  PublicProjectsResponse, 
  ProgramDetailResponse, 
  JoinProgramRequest, 
  JoinProgramResponse,
  ProgramDetail,
  UserParticipation
} from '~/interfaces/project.interface';
import { FUNCTIONS_V1_PUBLIC_PROJECTS } from '~/constants/url-constants';

export async function getPublicProjects(): Promise<PublicProjectsResponse> {
  try {
    const response = await apiClient.get<PublicProjectsResponse>(FUNCTIONS_V1_PUBLIC_PROJECTS);
    return response.data;
  } catch (error) {
    console.error('Error fetching public projects:', error);
    throw error;
  }
}

export async function getProgramDetail(slug: string): Promise<ProgramDetailResponse> {
  try {
    // For now, using mock data as requested
    // TODO: Replace with actual API call when backend is ready
    // const response = await apiClient.get<ProgramDetailResponse>(`/functions/v1/public-projects/${slug}`);
    return getMockProgramDetail(slug);
  } catch (error) {
    console.error('Error fetching program detail:', error);
    throw error;
  }
}

export async function joinProgram(request: JoinProgramRequest): Promise<JoinProgramResponse> {
  try {
    // For now, using mock response as requested
    // TODO: Replace with actual API call when backend is ready
    // const response = await apiClient.post<JoinProgramResponse>('/functions/v1/program-join', request);
    return getMockJoinResponse(request);
  } catch (error) {
    console.error('Error joining program:', error);
    throw error;
  }
}

export async function getUserProgramStatus(programId: number): Promise<UserParticipation | null> {
  try {
    // For now, using mock data as requested
    // TODO: Replace with actual API call when backend is ready
    // const response = await apiClient.get<{participation: UserParticipation | null}>(`/functions/v1/my-programs/${programId}`);
    return getMockUserParticipation(programId);
  } catch (error) {
    console.error('Error fetching user program status:', error);
    return null;
  }
}

// Mock data functions (to be replaced with real API calls)
function getMockProgramDetail(slug: string): ProgramDetailResponse {
  const mockPrograms: Record<string, ProgramDetail> = {
    'ai-psychology-support': {
      id: 4,
      title: 'ШІ-психолог для ветеранів',
      slug: 'ai-psychology-support',
      short_description: 'Психологічна підтримка за допомогою ШІ',
      long_description: 'Програма надає комплексну психологічну підтримку ветеранам за допомогою передових технологій штучного інтелекту. Наша система забезпечує індивідуальний підхід до кожного учасника, аналізуючи їхні потреби та пропонуючи найбільш ефективні методи терапії.\n\nПрограма розроблена провідними психологами та фахівцями з ШІ для забезпечення найвищої якості допомоги нашим героям.',
      project_type: 'ai_psychology',
      featured_image_url: '/images/projects/ai-psychology-hero.jpg',
      total_helped: 78,
      current_participants: 31,
      success_stories_count: 45,
      total_budget: 750000,
      is_featured: true,
      created_at: '2025-06-02T15:32:02.474212+00:00',
      requirements: [
        'Статус ветерана або військовослужбовця',
        'Вік від 18 років',
        'Наявність смартфона або комп\'ютера',
        'Базові навички користування інтернетом'
      ],
      benefits: [
        'Безкоштовні консультації з ШІ-психологом 24/7',
        'Персоналізовані вправи для подолання стресу',
        'Доступ до групової терапії онлайн',
        'Щомісячні зустрічі з живими психологами',
        'Сертифікат про проходження програми'
      ],
      duration_months: 6,
      contact_email: 'psychology@uvr.org',
      contact_phone: '+380 44 123 4567',
      application_deadline: '2025-08-15T23:59:59.000Z',
      status: 'active',
      max_participants: 100,
      gallery_images: [
        '/images/projects/ai-psychology-1.jpg',
        '/images/projects/ai-psychology-2.jpg',
        '/images/projects/ai-psychology-3.jpg'
      ],
      location: 'Онлайн',
      tags: ['психологія', 'ШІ', 'терапія', 'онлайн', 'безкоштовно']
    },
    'family-support-program': {
      id: 2,
      title: 'Підтримка сімей загиблих героїв',
      slug: 'family-support-program',
      short_description: 'Комплексна підтримка родин загиблих військових',
      long_description: 'Програма "Сім\'я до сім\'ї" надає всебічну підтримку родинам загиблих героїв. Ми розуміємо, як важко пережити втрату, тому наша місія - забезпечити сім\'ям необхідну допомогу на всіх етапах горювання та адаптації.\n\nНаша команда складається з досвідчених психологів, соціальних працівників та волонтерів, які самі пройшли подібний досвід.',
      project_type: 'family_support',
      featured_image_url: '/images/projects/family-support-hero.jpg',
      total_helped: 89,
      current_participants: 23,
      success_stories_count: 67,
      total_budget: 1800000,
      is_featured: true,
      created_at: '2025-06-02T15:32:02.474212+00:00',
      requirements: [
        'Статус сім\'ї загиблого військовослужбовця',
        'Документи, що підтверджують статус',
        'Довідка про склад сім\'ї'
      ],
      benefits: [
        'Щомісячна фінансова допомога',
        'Психологічна підтримка для всієї родини',
        'Юридичне консультування',
        'Допомога з працевлаштуванням',
        'Освітні програми для дітей',
        'Медичне страхування'
      ],
      duration_months: null,
      contact_email: 'family@uvr.org',
      contact_phone: '+380 44 123 4568',
      application_deadline: null,
      status: 'active',
      max_participants: null,
      gallery_images: [
        '/images/projects/family-support-1.jpg',
        '/images/projects/family-support-2.jpg'
      ],
      location: 'Київ, Львів, Дніпро',
      tags: ['сім\'я', 'підтримка', 'фінанси', 'психологія', 'діти']
    },
    'prosthetics-for-heroes': {
      id: 1,
      title: 'Протези для героїв',
      slug: 'prosthetics-for-heroes',
      short_description: 'Забезпечення протезами та реабілітація поранених військових',
      long_description: 'Програма "Протези для героїв" забезпечує поранених військових високоякісними протезами та комплексною реабілітацією. Ми співпрацюємо з провідними виробниками протезів та реабілітаційними центрами для надання найкращої допомоги нашим захисникам.\n\nКожен учасник отримує індивідуально підібраний протез та повний курс реабілітації для швидкого повернення до активного життя.',
      project_type: 'prosthetics',
      featured_image_url: '/images/projects/prosthetics-hero.jpg',
      total_helped: 127,
      current_participants: 15,
      success_stories_count: 95,
      total_budget: 2500000,
      is_featured: true,
      created_at: '2025-06-02T15:32:02.474212+00:00',
      requirements: [
        'Статус учасника бойових дій',
        'Медична документація про поранення',
        'Направлення від лікаря',
        'Проходження медичної комісії'
      ],
      benefits: [
        'Безкоштовне протезування',
        'Повний курс реабілітації',
        'Психологічна підтримка',
        'Навчання користування протезом',
        'Технічна підтримка та ремонт',
        'Заміна через 2-3 роки'
      ],
      duration_months: 4,
      contact_email: 'prosthetics@uvr.org',
      contact_phone: '+380 44 123 4569',
      application_deadline: null,
      status: 'active',
      max_participants: 50,
      gallery_images: [
        '/images/projects/prosthetics-1.jpg',
        '/images/projects/prosthetics-2.jpg',
        '/images/projects/prosthetics-3.jpg',
        '/images/projects/prosthetics-4.jpg'
      ],
      location: 'Київ, Харків, Одеса',
      tags: ['протезування', 'реабілітація', 'медицина', 'поранені']
    }
  };

  const program = mockPrograms[slug];
  if (!program) {
    throw new Error(`Program with slug "${slug}" not found`);
  }

  // Mock user participation (simulate different scenarios)
  const mockParticipation = Math.random() > 0.7 ? {
    id: 1,
    user_id: 123,
    project_id: program.id,
    status: 'approved' as const,
    applied_at: '2025-06-01T10:00:00.000Z',
    approved_at: '2025-06-02T14:30:00.000Z',
    completed_at: null,
    notes: 'Заявка схвалена. Очікуйте контакту від координатора програми.'
  } : null;

  return {
    success: true,
    data: {
      program,
      user_participation: mockParticipation
    }
  };
}

function getMockJoinResponse(request: JoinProgramRequest): JoinProgramResponse {
  const participation: UserParticipation = {
    id: Math.floor(Math.random() * 1000) + 100,
    user_id: 123, // Mock user ID
    project_id: request.project_id,
    status: 'pending',
    applied_at: new Date().toISOString(),
    approved_at: null,
    completed_at: null,
    notes: 'Заявка подана успішно. Очікуйте розгляду протягом 3-5 робочих днів.'
  };

  return {
    success: true,
    data: { participation },
    message: 'Заявка успішно подана! Ми розглянемо її найближчим часом.'
  };
}

function getMockUserParticipation(programId: number): UserParticipation | null {
  // Simulate 30% chance user already applied
  if (Math.random() > 0.7) {
    return {
      id: 1,
      user_id: 123,
      project_id: programId,
      status: 'approved',
      applied_at: '2025-06-01T10:00:00.000Z',
      approved_at: '2025-06-02T14:30:00.000Z',
      completed_at: null,
      notes: 'Заявка схвалена. Очікуйте контакту від координатора програми.'
    };
  }
  return null;
} 