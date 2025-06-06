import { type ROUTE_NAMES } from './router-constants';

export interface MenuItem {
  name: keyof typeof ROUTE_NAMES;
  title: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    name: 'LEADERSHIP',
    title: 'common.navigation.leadership'
  },
  {
    name: 'LEGAL_HELP',
    title: 'common.navigation.legalHelp'
  },
  {
    name: 'PROSTHETICS',
    title: 'common.navigation.prosthetics'
  },
  {
    name: 'FAMILY',
    title: 'common.navigation.familyToFamily'
  },
  {
    name: 'ACTIVITIES',
    title: 'common.navigation.ourActivities'
  },
  {
    name: 'ABOUT',
    title: 'common.navigation.aboutUs'
  }
];