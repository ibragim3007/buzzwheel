import { getLocales } from 'expo-localization';
import { DEFAULT_LANGUAGE } from '../config/constants/constants';

export const getDeviceLanguage = () => {
  try {
    const devLang = getLocales();
    const devLangCode = devLang[0].languageCode || DEFAULT_LANGUAGE;

    return devLangCode;
  } catch {
    // errorLogger.logError('Error to get device language');
    return DEFAULT_LANGUAGE;
  }
};
