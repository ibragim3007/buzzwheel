export interface IAvailableColor {
  id: number;
  isFree: boolean;
  colors: [string, string, string];
}

export interface ISettings {
  availableColors: IAvailableColor[];
}

export const SettingsConstants: ISettings = {
  availableColors: [
    {
      id: 1,
      colors: ["#2E8B57", "#3CB371", "#232323"],
      isFree: true,
    },
    {
      id: 2,
      colors: ["#990", "#350", "#232323"],
      isFree: false,
    },
    {
      id: 3,
      colors: ["#999", "#777", "#232323"],
      isFree: false,
    },
    {
      id: 4,
      colors: ["#FFAEBC", "#fa26a0", "#232323"],
      isFree: false,
    },
    {
      id: 5,
      colors: ["#2e8bc0", "#145da0", "#0c2d48"],
      isFree: false,
    },
  ],
};
