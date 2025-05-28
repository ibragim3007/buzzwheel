export interface IDisplayLanguage {
  label: string;
  code: string;
  flag: string;
}

export const languages: IDisplayLanguage[] = [
  { label: 'English', code: 'en', flag: '🇬🇧' },
  { label: 'Русский', code: 'ru', flag: '🇷🇺' },
].sort((a, b) => a.code.localeCompare(b.code));
