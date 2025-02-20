import {
  IAvailableColor,
  SettingsConstants,
} from "@/src/shared/config/constants/settingsOptions";
import { create } from "zustand";

interface State {
  rouletteColor?: IAvailableColor;
}

interface Actions {
  setRouletteColors: (avaialbleColor: IAvailableColor) => void;
}

export const useSettings = create<State & Actions>((set) => {
  return {
    rouletteColor: SettingsConstants.availableColors.find(
      (a) => a.isFree === true
    ),
    setRouletteColors: (avaialbleColor: IAvailableColor) =>
      set({ rouletteColor: avaialbleColor }),
  };
});
