export type PalitraInterface = {
  theme: "light" | "dark" | "custom";
  accent: {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    white: string;
    error: string;
    success: string;
  };
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    error: string;
    success: string;
  };
};

export const darkTheme: PalitraInterface = {
  theme: "dark",
  accent: {
    primary: "#384dea",
    secondary: "#FFA500",
    tertiary: "#FF6347",
    quaternary: "#FF4500",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#A3A3A3",
    disabled: "#8A8A8A",
    white: "#FFFFFF",
    error: "#FF0000",
    success: "#00FF00",
  },
  background: {
    primary: "#151217",
    secondary: "#1b191d",
    tertiary: "#272529",
    quaternary: "#4F4F4F",
    error: "#FF0000",
    success: "#00FF00",
  },
};

export const lightTheme: PalitraInterface = {
  theme: "light",
  accent: {
    primary: "#4259FF",
    secondary: "#FFA500",
    tertiary: "#FF6347",
    quaternary: "#FF4500",
  },
  text: {
    primary: "#001d35",
    secondary: "#4a4b4d",
    disabled: "#8A8A8A",
    white: "#FFFFFF",
    error: "#FF0000",
    success: "#00FF00",
  },
  background: {
    primary: "#EDEFFA",
    secondary: "#FFFFFF",
    tertiary: "#dedede",
    quaternary: "#4F4F4F",
    error: "#FF0000",
    success: "#00FF00",
  },
};

export const customTheme: PalitraInterface = {
  theme: "custom",
  accent: {
    primary: "#ff8d22",
    secondary: "#FFA500",
    tertiary: "#FF6347",
    quaternary: "#FF4500",
  },
  text: {
    primary: "#ffffff",
    secondary: "#4a4b4d",
    disabled: "#8A8A8A",
    white: "#FFFFFF",
    error: "#FF0000",
    success: "#00FF00",
  },
  background: {
    primary: "#5e3677",
    secondary: "#36124D",
    tertiary: "#dedede",
    quaternary: "#4F4F4F",
    error: "#FF0000",
    success: "#00FF00",
  },
};
