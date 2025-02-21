import {
  IAvailableColor,
  SettingsConstants,
} from "@/src/shared/config/constants/settingsOptions";
import { customTheme, PalitraInterface } from "@/src/shared/config/theme/theme";
import { LocalStorage } from "@/src/shared/service/storage.service";

import { create } from "zustand";

interface State {
  rouletteColor?: IAvailableColor;
  theme: PalitraInterface;
}

interface Actions {
  setRouletteColors: (avaialbleColor: IAvailableColor) => void;
  setTheme: (theme: PalitraInterface) => void;
}

export const useSettings = create<State & Actions>((set) => {
  const initialState: State = {
    theme: customTheme,
    rouletteColor: SettingsConstants.availableColors.find(
      (a) => a.isFree === true
    ),
  };

  const loadInitialState = async () => {
    const storedRouletteColor = await LocalStorage.getRouletteColor();
    const storedTheme = await LocalStorage.getTheme();

    if (storedRouletteColor) {
      set({
        rouletteColor: storedRouletteColor,
        theme: storedTheme || customTheme,
      });
    }
  };

  loadInitialState();

  return {
    ...initialState,
    setRouletteColors: (avaialbleColor: IAvailableColor) =>
      set({ rouletteColor: avaialbleColor }),
    setTheme: (theme: PalitraInterface) => set({ theme }),
  };
});

useSettings.subscribe(async (state) => {
  if (state.rouletteColor)
    await LocalStorage.setRouletteColor(state.rouletteColor);

  if (state.theme) await LocalStorage.setTheme(state.theme);
});
