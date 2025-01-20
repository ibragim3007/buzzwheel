import { create } from "zustand";
import { Package } from "./types/types";
import { PackagesMock } from "./packages";

interface State {
  packages: Package[];
  pickedPackages: Package[];
}

interface Actions {
  addPackage: (mode: Package) => void;
  removePackage: (mode: Package) => void;
  togglePackage: (mode: Package) => void;
}

export const usePackage = create<State & Actions>((set) => ({
  packages: PackagesMock,
  pickedPackages: [],
  addPackage: (mode) =>
    set((state) => ({ packages: [...state.packages, mode] })),
  removePackage: (mode) =>
    set((state) => ({
      packages: state.packages.filter((m) => m.id !== mode.id),
    })),
  togglePackage: (mode) =>
    set((state) => ({
      pickedPackages: state.pickedPackages.some((m) => m.id === mode.id)
        ? state.pickedPackages.filter((m) => m.id !== mode.id)
        : [...state.pickedPackages, mode],
    })),
}));
