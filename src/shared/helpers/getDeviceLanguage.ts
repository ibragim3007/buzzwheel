import { getLocales } from 'expo-localization';
import { DEFAULT_LANGUAGE } from '../config/constants/constants';
import { LANGUAGE } from '../types/globalTypes';

export const getDeviceLanguage = (): LANGUAGE => {
  try {
    const devLang = getLocales();
    const devLangCode = devLang[0].languageCode || DEFAULT_LANGUAGE;
    return devLangCode as LANGUAGE;
  } catch {
    // errorLogger.logError('Error to get device language');
    return DEFAULT_LANGUAGE;
  }
};
