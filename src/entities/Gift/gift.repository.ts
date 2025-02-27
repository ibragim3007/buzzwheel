import { LocalStorage } from "@/src/shared/service/storage.service";
import { create } from "zustand";

interface State {
  unlockedRouletteColors: number[];
  unlockedThemes: number[];

  isAvailableToSpin: {
    value: boolean;
    date: Date;
  };
}

interface Actions {
  unlockRouletteColor: (id: number) => void;
  unlockTheme: (id: number) => void;

  lockRouletteColor: (id: number) => void;
  lockTheme: (id: number) => void;

  setIsAvailableToSpin: (isAvailableToSpin: boolean) => void;
}

export const useGiftRepositroy = create<State & Actions>((set) => {
  const initialState: State = {
    unlockedRouletteColors: [],
    unlockedThemes: [],
    isAvailableToSpin: {
      value: false,
      date: new Date(),
    },
  };

  const getInitialState = async () => {
    const unlockedRouletteColors =
      await LocalStorage.getUnlockedRouletteColors();
    const unlockedThemes = await LocalStorage.getUnlockedThemes();

    const localDate = await LocalStorage.getDayliTaskDatePressed();
    const date = localDate ? new Date(localDate) : new Date();
    const now = new Date();
    const dayPlusOne = new Date(date);
    dayPlusOne.setDate(dayPlusOne.getDate() + 1);

    const isAvailableToSpin = !localDate || now >= dayPlusOne;

    set({
      unlockedRouletteColors: unlockedRouletteColors || [],
      unlockedThemes: unlockedThemes || [],
      isAvailableToSpin: {
        value: isAvailableToSpin,
        date: dayPlusOne,
      },
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
    setIsAvailableToSpin: (isAvailableToSpin: boolean) => {
      set({
        isAvailableToSpin: {
          value: isAvailableToSpin,
          date: new Date(),
        },
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

  if (state.isAvailableToSpin) {
    await LocalStorage.setDayliTaskDatePressed(new Date().toString());
  }
});
