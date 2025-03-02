import { createContext, PropsWithChildren, useState } from 'react';
import { customTheme, PalitraInterface } from '../config/theme/theme';

type ContextPalitraInterface = PalitraInterface;

export const ThemeContext = createContext<ContextPalitraInterface>(customTheme);

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [currentTheme, setCurrentTheme] = useState(customTheme);

  return <ThemeContext.Provider value={currentTheme}>{children}</ThemeContext.Provider>;
}
