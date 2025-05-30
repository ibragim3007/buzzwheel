import { create } from 'zustand';

import { useLang } from '@/src/shared/hooks/lang/useLangStore';
import { Dare, Package } from '@/src/shared/types/globalTypes';
import { buildPackages } from './helpers/buildPackages';

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

  // resetPackages: () => void;

  decayWeight: (id: number) => void;
  resetWeight: () => void;
}

export const usePackage = create<State & Actions>(set => {
  // Initialize the state with packages and their dares
  const initialPackages = buildPackages(useLang.getState().lang);

  // Set the initial state
  return {
    data: initialPackages,
    pickedPackages: [initialPackages[0]],

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

    // resetPackages: () =>
    //   set(() => {
    //     const packages = buildPackages(useLang.getState().lang);

    //     return {
    //       pickedPackages: [packages[0]], // Reset to the first package
    //       data: packages, // Reset data to initial packages
    //     };
    //   }),
  };
});

useLang.subscribe(state => {
  const prevPickedIds = usePackage.getState().pickedPackages.map(p => p.id);

  const lang = state.lang;
  const packages = buildPackages(lang);

  const pickedPackages = packages.filter(pkg => prevPickedIds.includes(pkg.id));

  usePackage.setState({
    data: packages,
    pickedPackages: pickedPackages.length ? pickedPackages : [packages[0]],
  });
});
