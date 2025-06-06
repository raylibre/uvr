import { useI18n } from 'vue-i18n';
import { T_KEYS } from '~/constants/translation-keys';

export function useTranslation() {
  const { t, locale } = useI18n();

  return {
    t,
    T_KEYS,
    lang: locale
  };
} 