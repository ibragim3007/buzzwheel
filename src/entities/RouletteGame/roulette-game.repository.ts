import { Dare, DareType, Player } from "@/src/shared/types/globalTypes";
import { create } from "zustand";
import { usePackage } from "../Package/usePackage";
import { getRandomInt } from "@/src/shared/helpers/getRandomInt";
import { groupsOfColors } from "@/src/shared/config/constants/constants";

interface State {
  moves: { player: Player; dare: Dare }[];
  currentTurn: Player | null;
  currentDare: Dare | null;

  displayDare: boolean;

  groupColors: [string, string, string];
}

interface Actions {
  setTurn: (player: Player, type: DareType) => void;

  showDare: () => void;
  hideDare: () => void;
  initRandomGroupColors: () => void;
}

export const useRouletteGame = create<State & Actions>((set) => ({
  moves: [],
  currentTurn: null,
  currentDare: null,
  displayDare: false,
  groupColors: groupsOfColors[0],

  initRandomGroupColors: () => {
    const randomGroupColors =
      groupsOfColors[getRandomInt(0, groupsOfColors.length)];
    set((state: State) => ({ groupColors: randomGroupColors }));
  },

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

  setTurn: (player: Player, type: DareType) => {
    const availablePackages = usePackage.getState().pickedPackages;
    const allDares = usePackage.getState().data.dares;

    const availableDares = allDares
      .filter((dare) =>
        availablePackages.map((aP) => aP.id).includes(dare.package)
      )
      .filter((dare) => dare.type === type);

    const randomDare = availableDares[getRandomInt(0, availableDares.length)];

    set((state: State) => ({
      currentTurn: player,
      moves: [...state.moves, { dare: randomDare, player: player }],
      currentDare: randomDare,
    }));
  },
}));
