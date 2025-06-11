import { type ROUTE_NAMES } from './router-constants';

export interface MenuItem {
  name: keyof typeof ROUTE_NAMES;
  title: string;
  path?: string; // For program-specific paths
}

export const MENU_ITEMS: MenuItem[] = [
  {
    name: 'PROGRAM_FAMILY_SUPPORT',
    title: 'common.navigation.familySupportProgram',
    path: '/programs/family-support-program'
  },
  {
    name: 'PROGRAM_LEGAL_AID_VETERANS',
    title: 'common.navigation.legalAidVeterans',
    path: '/programs/legal-aid-veterans'
  },
  {
    name: 'PROGRAM_PROSTHETICS_FOR_HEROES',
    title: 'common.navigation.prostheticsForHeroes',
    path: '/programs/prosthetics-for-heroes'
  },
  {
    name: 'NEWS',
    title: 'common.navigation.news'
  },
  {
    name: 'ABOUT',
    title: 'common.navigation.aboutUs'
  }
];