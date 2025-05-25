import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppStateStorage } from './app.storage';

interface State {
  isVibrationEnabled: boolean;
}

interface Actions {
  setVibration: (isEnabled: boolean) => void;
}

export const useApp = create<State & Actions>()(
  persist(
    set => ({
      isVibrationEnabled: true,
      setVibration: (isEnabled: boolean) => set({ isVibrationEnabled: isEnabled }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AppStateStorage),
    },
  ),
);
