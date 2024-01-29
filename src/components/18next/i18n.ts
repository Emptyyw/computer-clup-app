import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      Hello: 'Hello',
    },
  },
  ru: {
    translation: {
      Hello: 'Привет',
    },
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

export type MyTranslationKeys = keyof (typeof resources)['ru']['translation'];
