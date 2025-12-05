export interface IDisplayLanguage {
  label: string;
  code: string;
  flag: string;
}

export const languages: IDisplayLanguage[] = [
  { label: 'English', code: 'en', flag: '🇬🇧' },
  { label: 'Русский', code: 'ru', flag: '🇷🇺' },
  { label: 'Deutsch', code: 'de', flag: '🇩🇪' },
  { label: 'Français', code: 'fr', flag: '🇫🇷' },
  { label: 'Español', code: 'es', flag: '🇪🇸' },
  { label: 'Polski', code: 'pl', flag: '🇵🇱' },
  { label: 'Filipino', code: 'fil', flag: '🇵🇭' },
].sort((a, b) => a.code.localeCompare(b.code));
