import { createI18n } from 'vue-i18n';
import * as en from './locales/en.json';
import * as uk from './locales/uk.json';

export const i18n = createI18n({
  legacy: false,
  locale: 'uk',
  fallbackLocale: 'en',
  messages: {
    en: (en as any).default || en,
    uk: (uk as any).default || uk
  }
});
