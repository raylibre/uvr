import { createI18n } from 'vue-i18n';
import * as en from './locales/en.json';

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: (en as any).default || en
  }
});
