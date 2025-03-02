import { useSettings } from '@/src/entities/Settings/settings.repository';

export function useTheme() {
  const { theme } = useSettings();

  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return theme;
}
