import { create } from 'zustand';

import { modes } from '@/assets/package_mock/modes';
import { Package } from '@/src/shared/types/globalTypes';

interface State {
  data: Package[];
  pickedPackages: Package[];
}

interface Actions {
  addPackage: (mode: Package) => void;
  removePackage: (mode: Package) => void;
  togglePackage: (mode: Package) => void;
}

export const usePackage = create<State & Actions>(set => ({
  data: modes.ru as Package[],
  pickedPackages: [],
  addPackage: mode => set(state => ({ pickedPackages: [...state.pickedPackages, mode] })),
  removePackage: mode =>
    set(state => ({
      pickedPackages: state.pickedPackages.filter(m => m.id !== mode.id),
    })),
  togglePackage: mode =>
    set(state => ({
      pickedPackages: state.pickedPackages.some(m => m.id === mode.id)
        ? state.pickedPackages.filter(m => m.id !== mode.id)
        : [...state.pickedPackages, mode],
    })),
}));
