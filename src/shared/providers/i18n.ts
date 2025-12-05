import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getDeviceLanguage } from '../helpers/getDeviceLanguage';
import en from '@/src/locales/en.json';
import ru from '@/src/locales/ru.json';
import de from '@/src/locales/de.json';
import fr from '@/src/locales/fr.json';
import es from '@/src/locales/es.json';
import pl from '@/src/locales/pl.json';
import fil from '@/src/locales/fil.json';

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    de: { translation: de },
    fr: { translation: fr },
    es: { translation: es },
    pl: { translation: pl },
    fil: { translation: fil },
  },
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
