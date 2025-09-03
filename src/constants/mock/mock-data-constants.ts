/**
 * Mock data constants
 * Contains mock data for development and testing purposes
 */

import { ProjectType, ParticipationStatus } from '../status-constants';
import type { ProgramDetail, UserParticipation } from '~/interfaces/project.interface';

// Mock program details
export const MOCK_PROGRAMS: Record<string, ProgramDetail> = {
  'ai-psychology-support': {
    id: 4,
    title: 'ШІ-психолог для ветеранів',
    slug: 'ai-psychology-support',
    short_description: 'Психологічна підтримка',
    description: 'Програма надає комплексну психологічну підтримку ветеранам за допомогою передових технологій штучного інтелекту. Наша система забезпечує індивідуальний підхід до кожного учасника, аналізуючи їхні потреби та пропонуючи найбільш ефективні методи терапії.\n\nПрограма розроблена провідними психологами та фахівцями з ШІ для забезпечення найвищої якості допомоги нашим героям.',
    project_type: ProjectType.AI_PSYCHOLOGY,
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
  } as any,
  'family-support-program': {
    id: 2,
    title: 'Підтримка сімей загиблих героїв',
    slug: 'family-support-program',
    short_description: 'Комплексна підтримка родин загиблих військових',
    description: 'Програма "Сім\'я до сім\'ї" надає всебічну підтримку родинам загиблих героїв. Ми розуміємо, як важко пережити втрату, тому наша місія - забезпечити сім\'ям необхідну допомогу на всіх етапах горювання та адаптації.\n\nНаша команда складається з досвідчених психологів, соціальних працівників та волонтерів, які самі пройшли подібний досвід.',
    project_type: ProjectType.FAMILY_SUPPORT,
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
  } as any,
  'prosthetics-for-heroes': {
    id: 1,
    title: 'Протези для героїв',
    slug: 'prosthetics-for-heroes',
    short_description: 'Забезпечення протезами та реабілітація поранених військових',
    description: 'Програма "Протези для героїв" забезпечує поранених військових високоякісними протезами та комплексною реабілітацією. Ми співпрацюємо з провідними виробниками протезів та реабілітаційними центрами для надання найкращої допомоги нашим захисникам.\n\nКожен учасник отримує індивідуально підібраний протез та повний курс реабілітації для швидкого повернення до активного життя.',
    project_type: ProjectType.PROSTHETICS,
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
  } as any
} as const;

// Mock participation statuses for testing
export const MOCK_PARTICIPATION_STATUSES = [
  ParticipationStatus.PENDING,
  ParticipationStatus.APPROVED,
  ParticipationStatus.REJECTED,
  ParticipationStatus.COMPLETED
] as const;

// Mock user data
export const MOCK_CURRENT_USER = {
  id: 123,
  name: 'Іван Петренко'
} as const;

// Helper functions for mock data generation
export function generateMockParticipation(programId: number, status?: ParticipationStatus): UserParticipation {
  const randomStatus = status || MOCK_PARTICIPATION_STATUSES[Math.floor(Math.random() * MOCK_PARTICIPATION_STATUSES.length)];

  return {
    id: Math.floor(Math.random() * 100) + 1,
    user_id: MOCK_CURRENT_USER.id,
    project_id: programId,
    status: randomStatus,
    applied_at: '2025-06-01T10:00:00.000Z',
    approved_at: randomStatus === ParticipationStatus.APPROVED || randomStatus === ParticipationStatus.COMPLETED
      ? '2025-06-02T14:30:00.000Z'
      : null,
    completed_at: randomStatus === ParticipationStatus.COMPLETED
      ? '2025-06-15T16:45:00.000Z'
      : null,
    notes: 'Тестова участь у програмі'
  };
}

export function shouldHaveParticipation(): boolean {
  return Math.random() > 0.6;
}