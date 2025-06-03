import { IAvailableColor, SettingsConstants } from '@/src/shared/config/constants/settingsOptions';
import { customTheme, PalitraInterface } from '@/src/shared/config/theme/theme';
import { LocalStorage } from '@/src/shared/service/storage.service';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { SettingsStateStorage } from './settings.storage';

interface State {
  rouletteColor?: IAvailableColor;
  theme: PalitraInterface;
  isRemoveRepetitions: boolean;
  isDrinkingMode: boolean;
}

interface Actions {
  setRouletteColors: (avaialbleColor: IAvailableColor) => void;
  setTheme: (theme: PalitraInterface) => void;
  setRemoveRepetitions: (isRemoveRepetitions: boolean) => void;
  setDrinkingMode: (isDrinkingMode: boolean) => void;
}

export const useSettings = create<State & Actions>()(
  persist(
    set => {
      const initialState: State = {
        theme: customTheme,
        isRemoveRepetitions: true,
        isDrinkingMode: false,

        rouletteColor: SettingsConstants.availableColors.find(a => a.isFree === true),
      };

      return {
        ...initialState,

        setRouletteColors: (avaialbleColor: IAvailableColor) => set({ rouletteColor: avaialbleColor }),

        setTheme: (theme: PalitraInterface) => set({ theme }),

        setRemoveRepetitions: (isRemoveRepetitions: boolean) => set({ isRemoveRepetitions }),

        setDrinkingMode: (isDrinkingMode: boolean) => set({ isDrinkingMode }),
      };
    },
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => SettingsStateStorage),
    },
  ),
);
