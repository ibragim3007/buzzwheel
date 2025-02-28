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

    const dayliTaskDatePressed = await LocalStorage.getDayliTaskDatePressed();
    console.log("DAULY: ", dayliTaskDatePressed);

    if (!dayliTaskDatePressed) {
      set({
        isAvailableToSpin: {
          value: true,
          date: new Date(),
        },
      });
    } else if (dayliTaskDatePressed) {
      const localDate = new Date(dayliTaskDatePressed);
      const currentDate = new Date();

      if (currentDate.getTime() > localDate.getTime()) {
        set({
          isAvailableToSpin: {
            value: true,
            date: new Date(),
          },
        });
      } else {
        set({
          isAvailableToSpin: {
            value: false,
            date: new Date(),
          },
        });
      }
    }

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
    setIsAvailableToSpin: async (isAvailableToSpin: boolean) => {
      const currentDate = new Date();
      const plusOneDay = new Date(
        currentDate.setDate(currentDate.getDate() + 1)
      );

      console.log("PLUS ONE LOCAL:", plusOneDay.toString());

      await LocalStorage.setDayliTaskDatePressed(plusOneDay.toString());
      set({
        isAvailableToSpin: {
          value: isAvailableToSpin,
          date: plusOneDay,
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
});
