import { create } from 'zustand';

import { modes } from '@/assets/package_mock/modes';
import { Dare, Package } from '@/src/shared/types/globalTypes';

export interface PackageWithDaresIds extends Package {
  dares: (Dare & { id: number })[];
}

interface State {
  data: PackageWithDaresIds[];
  pickedPackages: PackageWithDaresIds[];
}

interface Actions {
  addPackage: (mode: PackageWithDaresIds) => void;
  removePackage: (mode: PackageWithDaresIds) => void;
  togglePackage: (mode: PackageWithDaresIds) => void;
}

export const usePackage = create<State & Actions>(set => {
  // Initialize the state with packages and their dares
  const packagesWithDaresIds = Object.values(modes.ru).map((mode, index) => {
    const daresWithIds = mode.dares.map((dare, dareIndex) => ({
      ...dare,
      id: index * 100 + dareIndex,
      type: dare.type as Dare['type'], // Cast type to DareType
    }));

    // Assign a unique ID to each dare based on its index
    return {
      ...mode,
      packageType: mode.packageType as Package['packageType'],
      dares: daresWithIds,
    };
  });

  // Set the initial state
  return {
    data: packagesWithDaresIds,
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
  };
});
