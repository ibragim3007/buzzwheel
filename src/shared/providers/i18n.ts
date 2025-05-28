import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getDeviceLanguage } from '../helpers/getDeviceLanguage';
import en from '@/src/locales/en.json';
import ru from '@/src/locales/ru.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
