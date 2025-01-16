import { create } from "zustand";
import { Mode } from "./types/types";
import { ModesMock } from "./modes";

interface State {
  modes: Mode[];
  pickedModes: Mode[];
}

interface Actions {
  addMode: (mode: Mode) => void;
  removeMode: (mode: Mode) => void;
  toggleMode: (mode: Mode) => void;
}

export const useMode = create<State & Actions>((set) => ({
  modes: ModesMock,
  pickedModes: [],
  addMode: (mode) => set((state) => ({ modes: [...state.modes, mode] })),
  removeMode: (mode) =>
    set((state) => ({
      modes: state.modes.filter((m) => m.id !== mode.id),
    })),
  toggleMode: (mode) =>
    set((state) => ({
      pickedModes: state.pickedModes.some((m) => m.id === mode.id)
        ? state.pickedModes.filter((m) => m.id !== mode.id)
        : [...state.pickedModes, mode],
    })),
}));
