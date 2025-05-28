import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getDeviceLanguage } from '../helpers/getDeviceLanguage';
import en from '@/src/locales/en.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
