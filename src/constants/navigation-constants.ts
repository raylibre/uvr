import { ROUTE_NAMES } from './router-constants';

export interface MenuItem {
  name: keyof typeof ROUTE_NAMES;
  title: string;
  path?: string; // For program-specific paths
  exact?: boolean;
  children?: MenuItem[]; // Add children for dropdowns
}

export const MENU_ITEMS: MenuItem[] = [
  {
    name: 'ABOUT',
    title: 'common.navigation.aboutUs'
  },
  {
    name: ROUTE_NAMES.HOME,
    title: 'common.navigation.structure',
    exact: true,
    path: '/#structure'
  },
  {
    name: 'NEWS',
    title: 'common.navigation.news'
  },
  {
    name: 'PROGRAMS',
    title: 'common.navigation.programs',
    path: '/programs',
    children: [
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
      }
    ]
  }
];