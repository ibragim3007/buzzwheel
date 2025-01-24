import { Dare, Player } from "@/src/shared/types/globalTypes";
import { create } from "zustand";
import { usePackage } from "../Package/usePackage";
import { getRandomInt } from "@/src/shared/helpers/getRandomInt";

interface State {
  moves: { player: Player; dare: Dare }[];
  currentTurn: Player | null;
  currentDare: Dare | null;

  displayDare: boolean;
}

interface Actions {
  setTurn: (player: Player) => void;

  showDare: () => void;
  hideDare: () => void;
}

export const useRouletteGame = create<State & Actions>((set) => ({
  moves: [],
  currentTurn: null,
  currentDare: null,
  displayDare: false,

  showDare: () => {
    set((state: State) => ({ displayDare: true }));
  },
  hideDare: () => {
    set((state: State) => ({
      displayDare: false,
      currentDare: null,
      currentTurn: null,
    }));
  },

  setTurn: (player: Player) => {
    const availablePackages = usePackage.getState().pickedPackages;
    const allDares = usePackage.getState().data.dares;
    const availableDares = allDares.filter((dare) =>
      availablePackages.map((aP) => aP.id).includes(dare.package)
    );

    const randomDare = availableDares[getRandomInt(0, availableDares.length)];

    set((state: State) => ({
      currentTurn: player,
      moves: [...state.moves, { dare: randomDare, player: player }],
      currentDare: randomDare,
    }));
  },
}));
