import { createContext, PropsWithChildren, useState } from "react";
import { darkTheme, PalitraInterface } from "../config/theme/theme";

interface ContextPalitraInterface extends PalitraInterface {}

export const ThemeContext = createContext<ContextPalitraInterface>(darkTheme);

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
}
