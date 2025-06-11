import { type RouteRecordRaw } from 'vue-router';
import { Permission } from '~/constants/permission-constants';

export const ROUTE_NAMES = {
  HOME: 'HOME',
  LEADERSHIP: 'LEADERSHIP',
  LEGAL_HELP: 'LEGAL_HELP',
  PROSTHETICS: 'PROSTHETICS',
  FAMILY: 'FAMILY',
  ACTIVITIES: 'ACTIVITIES',
  ABOUT: 'ABOUT',
  PROGRAMS: 'PROGRAMS',
  PROGRAM_DETAIL: 'PROGRAM_DETAIL',
  PROGRAM_FAMILY_SUPPORT: 'PROGRAM_FAMILY_SUPPORT',
  PROGRAM_LEGAL_AID_VETERANS: 'PROGRAM_LEGAL_AID_VETERANS',
  PROGRAM_PROSTHETICS_FOR_HEROES: 'PROGRAM_PROSTHETICS_FOR_HEROES',
  NEWS: 'NEWS',
  NEWS_ARTICLE: 'NEWS_ARTICLE',
  NOT_FOUND: 'NOT_FOUND'
} as const;

// Export the type for use in other files
export type ROUTE_NAMES = typeof ROUTE_NAMES;

export const ROUTES: RouteRecordRaw[] = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    component: () => import('~/components/pages/p-home')
  },
  {
    path: '/programs',
    name: ROUTE_NAMES.PROGRAMS,
    component: () => import('~/components/pages/p-programs')
  },
  {
    path: '/programs/:slug',
    name: ROUTE_NAMES.PROGRAM_DETAIL,
    component: () => import('~/components/pages/p-program-detail'),
    props: true
  },
  {
    path: '/programs/family-support-program',
    name: ROUTE_NAMES.PROGRAM_FAMILY_SUPPORT,
    component: () => import('~/components/pages/p-program-detail'),
    props: () => ({ slug: 'family-support-program' })
  },
  {
    path: '/programs/legal-aid-veterans',
    name: ROUTE_NAMES.PROGRAM_LEGAL_AID_VETERANS,
    component: () => import('~/components/pages/p-program-detail'),
    props: () => ({ slug: 'legal-aid-veterans' })
  },
  {
    path: '/programs/prosthetics-for-heroes',
    name: ROUTE_NAMES.PROGRAM_PROSTHETICS_FOR_HEROES,
    component: () => import('~/components/pages/p-program-detail'),
    props: () => ({ slug: 'prosthetics-for-heroes' })
  },
  {
    path: '/news',
    name: ROUTE_NAMES.NEWS,
    component: () => import('~/components/pages/p-news')
  },
  {
    path: '/news/:id',
    name: ROUTE_NAMES.NEWS_ARTICLE,
    component: () => import('~/components/pages/p-news-article'),
    props: true
  },
  {
    path: '/leadership',
    name: ROUTE_NAMES.LEADERSHIP,
    component: () => import('~/components/pages/p-leadership'),
    meta: {
      requiresAuth: true,
      permissions: [Permission.VIEW_ACTIVE_PROJECTS]
    }
  },
  {
    path: '/legal-help',
    name: ROUTE_NAMES.LEGAL_HELP,
    component: () => import('~/components/pages/p-legal-help'),
    meta: {
      requiresAuth: true,
      permissions: [Permission.VIEW_ACTIVE_PROJECTS]
    }
  },
  {
    path: '/prosthetics',
    name: ROUTE_NAMES.PROSTHETICS,
    component: () => import('~/components/pages/p-prosthetics'),
    meta: {
      requiresAuth: true,
      permissions: [Permission.VIEW_ACTIVE_PROJECTS]
    }
  },
  {
    path: '/family',
    name: ROUTE_NAMES.FAMILY,
    component: () => import('~/components/pages/p-family'),
    meta: {
      requiresAuth: true,
      permissions: [Permission.VIEW_ACTIVE_PROJECTS]
    }
  },
  {
    path: '/activities',
    name: ROUTE_NAMES.ACTIVITIES,
    component: () => import('~/components/pages/p-activities'),
    meta: {
      requiresAuth: true,
      permissions: [Permission.VIEW_ACTIVE_PROJECTS]
    }
  },
  {
    path: '/about',
    name: ROUTE_NAMES.ABOUT,
    component: () => import('~/components/pages/p-about')
  }
]; 