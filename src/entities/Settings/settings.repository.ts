import {
  IAvailableColor,
  SettingsConstants,
} from "@/src/shared/config/constants/settingsOptions";
import { LocalStorage } from "@/src/shared/service/storage.service";

import { create } from "zustand";

interface State {
  rouletteColor?: IAvailableColor;
}

interface Actions {
  setRouletteColors: (avaialbleColor: IAvailableColor) => void;
}

export const useSettings = create<State & Actions>((set) => {
  const initialState: State = {
    rouletteColor: SettingsConstants.availableColors.find(
      (a) => a.isFree === true
    ),
  };

  const loadInitialState = async () => {
    const storedRouletteColor = await LocalStorage.getRouletteColor();

    if (storedRouletteColor) {
      set({ rouletteColor: storedRouletteColor });
    }
  };

  loadInitialState();

  return {
    ...initialState,
    setRouletteColors: (avaialbleColor: IAvailableColor) =>
      set({ rouletteColor: avaialbleColor }),
  };
});

useSettings.subscribe(async (state) => {
  if (state.rouletteColor)
    await LocalStorage.setRouletteColor(state.rouletteColor);
});
