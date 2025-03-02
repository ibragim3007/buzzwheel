export type PalitraInterface = {
  id: number;
  isFree: boolean;
  theme: string;
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

export const customTheme: PalitraInterface = {
  id: 3,
  isFree: true,
  theme: 'custom',
  accent: {
    primary: '#FF8D22',
    secondary: '#ef2fb9',
    tertiary: '#FF6347',
    quaternary: '#b5651a',
  },
  text: {
    primary: '#ffffff',
    secondary: '#181818',
    disabled: '#8A8A8A',
    white: '#FFFFFF',
    error: '#FF0000',
    success: '#00FF00',
  },
  background: {
    primary: '#101116',
    secondary: '#1D1E2A',
    tertiary: '#dedede',
    quaternary: '#4F4F4F',
    error: '#FF0000',
    success: '#00FF00',
  },
};

export const beachTheme: PalitraInterface = {
  id: 8,
  isFree: false,
  theme: 'beach',
  accent: {
    primary: '#FFD700', // золотой песок
    secondary: '#00BFFF', // яркое бирюзовое море
    tertiary: '#FF6347', // коралловый
    quaternary: '#FFA500', // оранжевый закат
  },
  text: {
    primary: '#FFFFFF', // светлый текст
    secondary: '#2F4F4F', // тёмно-серый для фона
    disabled: '#A9A9A9', // для отключенных элементов
    white: '#FFFFFF',
    error: '#FF4500', // ярко-красный
    success: '#32CD32', // лаймовый
  },
  background: {
    primary: '#87CEEB', // ясное небо
    secondary: '#F0E68C', // песчаный цвет
    tertiary: '#FFD700', // золотистый
    quaternary: '#FFE4B5', // светло-песочный
    error: '#FF4500',
    success: '#32CD32',
  },
};

export const christmasTheme: PalitraInterface = {
  id: 9,
  isFree: false,
  theme: 'christmas',
  accent: {
    primary: '#008000', // ёлка
    secondary: '#FF0000', // красный
    tertiary: '#FFD700', // золотой
    quaternary: '#FFFFFF', // снежный белый
  },
  text: {
    primary: '#FFFFFF', // светлый текст
    secondary: '#C0C0C0', // серебристый
    disabled: '#808080', // серый
    white: '#FFFFFF',
    error: '#D32F2F', // новогодний красный
    success: '#388E3C', // зелёный
  },
  background: {
    primary: '#003366', // глубокий синий
    secondary: '#1C1C1C', // почти чёрный
    tertiary: '#004d00', // тёмно-зелёный
    quaternary: '#B22222', // тёмно-красный
    error: '#D32F2F',
    success: '#388E3C',
  },
};

export const loveTheme: PalitraInterface = {
  id: 10,
  isFree: false,
  theme: 'love',
  accent: {
    primary: '#FF69B4', // розовый
    secondary: '#FF1493', // яркий розовый
    tertiary: '#FFC0CB', // нежно-розовый
    quaternary: '#FF4500', // оранжевый закат
  },
  text: {
    primary: '#800000', // тёмно-красный
    secondary: '#4B0082', // индиго
    disabled: '#8A8A8A', // серый
    white: '#FFFFFF',
    error: '#FF0000', // красный
    success: '#00FF00', // зелёный
  },
  background: {
    primary: '#FFF0F5', // розовый фон
    secondary: '#FFB6C1', // светло-розовый
    tertiary: '#FF69B4', // розовый
    quaternary: '#FFE4E1', // розовато-белый
    error: '#FF0000',
    success: '#00FF00',
  },
};

export const autumnTheme: PalitraInterface = {
  id: 11,
  isFree: false,
  theme: 'autumn',
  accent: {
    primary: '#FF6347', // томатный
    secondary: '#D2691E', // коричневый
    tertiary: '#8B4513', // тёмно-коричневый
    quaternary: '#FFD700', // золотой
  },
  text: {
    primary: '#FFFFFF', // светлый текст
    secondary: '#F4A460', // светло-коричневый
    disabled: '#D3D3D3', // серый
    white: '#FFFFFF',
    error: '#B22222', // темно-красный
    success: '#228B22', // лесной зелёный
  },
  background: {
    primary: '#2F4F4F', // тёмно-серый с оттенком зелёного
    secondary: '#8B4513', // коричневый
    tertiary: '#A0522D', // коричневый
    quaternary: '#D2691E', // коричневый
    error: '#B22222',
    success: '#228B22',
  },
};

export const summerTheme: PalitraInterface = {
  id: 12,
  isFree: false,
  theme: 'summer',
  accent: {
    primary: '#FF4500', // оранжевый
    secondary: '#32CD32', // лаймовый
    tertiary: '#FFD700', // солнечный жёлтый
    quaternary: '#00CED1', // аквамарин
  },
  text: {
    primary: '#FFFFFF', // светлый текст
    secondary: '#2F4F4F', // тёмно-серый
    disabled: '#8A8A8A', // серый
    white: '#FFFFFF',
    error: '#FF6347', // красноватый
    success: '#32CD32', // зелёный
  },
  background: {
    primary: '#FFFFF0', // светло-жёлтый
    secondary: '#F0E68C', // песчаный
    tertiary: '#FFE4B5', // светло-песочный
    quaternary: '#B0E0E6', // светло-голубой
    error: '#FF6347',
    success: '#32CD32',
  },
};
