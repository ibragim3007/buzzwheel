import { create } from 'zustand';

import { modes } from '@/assets/package_mock/modes';
import { Dare, Package } from '@/src/shared/types/globalTypes';
import { useLang } from '@/src/shared/hooks/lang/useLangStore';

export interface PackageWithDaresIds extends Package {
  dares: (Dare & { id: number })[];
  weight: number;
}

interface State {
  data: PackageWithDaresIds[];
  pickedPackages: PackageWithDaresIds[];
}
const INITIAL_WEIGHT = 1;
const MIN_WEIGHT = 0.001;

interface Actions {
  addPackage: (mode: PackageWithDaresIds) => void;
  removePackage: (mode: PackageWithDaresIds) => void;
  togglePackage: (mode: PackageWithDaresIds) => void;

  decayWeight: (id: number) => void;
  resetWeight: () => void;
}

export const usePackage = create<State & Actions>(set => {
  // Initialize the state with packages and their dares
  const lang = useLang.getState().lang;
  const modesLang = modes[lang];

  const packagesWithDaresIds: PackageWithDaresIds[] = Object.values(modesLang).map((mode, index) => {
    const daresWithIds = mode.dares.map((dare, dareIndex) => ({
      ...dare,
      id: index * 100 + dareIndex,
      type: dare.type as Dare['type'], // Cast type to DareType
    }));

    // Assign a unique ID to each dare based on its index
    return {
      ...mode,
      weight: INITIAL_WEIGHT,
      packageType: mode.packageType as Package['packageType'],
      dares: daresWithIds,
    };
  });

  // Set the initial state
  return {
    data: packagesWithDaresIds,
    pickedPackages: [packagesWithDaresIds[0]],

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

    resetWeight: () =>
      set(state => ({
        data: state.data.map(pkg => ({
          ...pkg,
          dares: pkg.dares.map(dare => ({
            ...dare,
          })),
          weight: INITIAL_WEIGHT, // Reset package weight to initial value
        })),
      })),

    decayWeight: id =>
      set(state => {
        const halve = (arr: PackageWithDaresIds[]) =>
          arr.map(p => (p.id === id ? { ...p, weight: Math.max(MIN_WEIGHT, p.weight * 0.5) } : p));

        return {
          data: halve(state.data),
          pickedPackages: halve(state.pickedPackages),
        };
      }),
  };
});

useLang.subscribe(state => {
  if (state.lang && state._hasHydrated) {
    const lang = state.lang;
    const modesLang = modes[lang];

    const packagesWithDaresIds: PackageWithDaresIds[] = Object.values(modesLang).map((mode, index) => {
      const daresWithIds = mode.dares.map((dare, dareIndex) => ({
        ...dare,
        id: index * 100 + dareIndex,
        type: dare.type as Dare['type'], // Cast type to DareType
      }));

      return {
        ...mode,
        weight: INITIAL_WEIGHT,
        packageType: mode.packageType as Package['packageType'],
        dares: daresWithIds,
      };
    });

    usePackage.setState({ data: packagesWithDaresIds });
  }
});
