import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'uk', name: 'Українська', flag: 'flag-icon flag-icon-ua' },
  { code: 'en', name: 'English', flag: 'flag-icon flag-icon-gb' }
];

// Store current language state outside the composable
const currentLanguageCode = ref<string>('uk');

export function useLanguage() {
  const { locale } = useI18n();

  const currentLanguage = computed(() => 
    SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguageCode.value) || SUPPORTED_LANGUAGES[1]
  );

  const availableLanguages = computed(() => SUPPORTED_LANGUAGES);

  const setLanguage = (languageCode: string) => {
    if (SUPPORTED_LANGUAGES.some(lang => lang.code === languageCode)) {
      currentLanguageCode.value = languageCode;
      locale.value = languageCode;
      
      // Store language preference in localStorage
      localStorage.setItem('user-language', languageCode);
    }
  };

  const initializeLanguage = () => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('user-language');
    if (savedLanguage && SUPPORTED_LANGUAGES.some(lang => lang.code === savedLanguage)) {
      currentLanguageCode.value = savedLanguage;
      locale.value = savedLanguage;
    } else {
      // Default to Українська if no preference is saved
      currentLanguageCode.value = 'uk';
      locale.value = 'uk';
    }
  };

  return {
    currentLanguage,
    availableLanguages,
    setLanguage,
    initializeLanguage
  };
} 




