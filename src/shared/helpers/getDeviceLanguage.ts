import { getLocales } from 'expo-localization';
import { DEFAULT_LANGUAGE } from '../config/constants/constants';
import { LANGUAGE } from '../types/globalTypes';

const availableLanguages: LANGUAGE[] = ['en', 'ru', 'de', 'fr', 'es', 'pl', 'fil'];

export const getDeviceLanguage = (): LANGUAGE => {
  try {
    const devLang = getLocales();
    const devLangCode = devLang[0].languageCode || DEFAULT_LANGUAGE;

    if (!availableLanguages.includes(devLangCode as LANGUAGE)) {
      return DEFAULT_LANGUAGE;
    }

    return devLangCode as LANGUAGE;
  } catch {
    // errorLogger.logError('Error to get device language');
    return DEFAULT_LANGUAGE;
  }
};
