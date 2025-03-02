import { create } from 'zustand';

import { DATA, Package } from '@/src/shared/types/globalTypes';
import DataTest from '../../../assets/package_mock/jsons/ru_test.json';

interface State {
  data: DATA;
  pickedPackages: Package[];
}

interface Actions {
  addPackage: (mode: Package) => void;
  removePackage: (mode: Package) => void;
  togglePackage: (mode: Package) => void;
}

export const usePackage = create<State & Actions>(set => ({
  data: DataTest as DATA,
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
