import { createContext, PropsWithChildren, useState } from "react";
import {
  customTheme,
  darkTheme,
  lightTheme,
  PalitraInterface,
} from "../config/theme/theme";

interface ContextPalitraInterface extends PalitraInterface {}

export const ThemeContext = createContext<ContextPalitraInterface>(lightTheme);

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
}
