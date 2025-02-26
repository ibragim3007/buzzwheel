import { SettingsConstants } from "@/src/shared/config/constants/settingsOptions";
import { getRandomInt } from "@/src/shared/helpers/getRandomInt";
import { LocalStorage } from "@/src/shared/service/storage.service";
import { create } from "zustand";

interface State {
  unlockedRouletteColors: number[];
  unlockedThemes: number[];
}

interface Actions {
  unlockRouletteColor: (id: number) => void;
  unlockTheme: (id: number) => void;

  lockRouletteColor: (id: number) => void;
  lockTheme: (id: number) => void;
}

export const useGiftRepositroy = create<State & Actions>((set) => {
  const initialState: State = {
    unlockedRouletteColors: [],
    unlockedThemes: [],
  };

  const getInitialState = async () => {
    const unlockedRouletteColors =
      await LocalStorage.getUnlockedRouletteColors();
    const unlockedThemes = await LocalStorage.getUnlockedThemes();

    set({
      unlockedRouletteColors: unlockedRouletteColors || [],
      unlockedThemes: unlockedThemes || [],
    });
  };

  getInitialState();

  return {
    ...initialState,
    unlockRouletteColor: (id: number) => {
      set((state) => {
        return {
          unlockedRouletteColors: [...state.unlockedRouletteColors, id],
        };
      });
    },
    unlockTheme: (id: number) => {
      set((state) => {
        return {
          unlockedThemes: [...state.unlockedThemes, id],
        };
      });
    },
    lockRouletteColor: (id: number) => {
      set((state) => {
        return {
          unlockedRouletteColors: state.unlockedRouletteColors.filter(
            (colorId) => colorId !== id
          ),
        };
      });
    },
    lockTheme: (id: number) => {
      set((state) => {
        return {
          unlockedThemes: state.unlockedThemes.filter(
            (themeId) => themeId !== id
          ),
        };
      });
    },
  };
});

useGiftRepositroy.subscribe(async (state) => {
  if (state.unlockedRouletteColors) {
    await LocalStorage.setUnlockedRouletteColors(state.unlockedRouletteColors);
  }
  if (state.unlockedThemes) {
    await LocalStorage.setUnlockedThemes(state.unlockedThemes);
  }
});
