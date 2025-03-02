import { getRandomInt } from '@/src/shared/helpers/getRandomInt';
import { Dare, DareType, Player } from '@/src/shared/types/globalTypes';
import { create } from 'zustand';
import { usePackage } from '../Package/usePackage';
import { useSettings } from '../Settings/settings.repository';

interface State {
  moves: { player: Player; dare: Dare }[];
  currentTurn: Player | null;
  currentDare: Dare | null;
  displayDare: boolean;
}

interface Actions {
  setTurn: (player: Player, type: DareType) => void;
  showDare: () => void;
  hideDare: () => void;
}

export const useRouletteGame = create<State & Actions>(set => ({
  moves: [],
  currentTurn: null,
  currentDare: null,
  displayDare: false,

  showDare: () => {
    set(() => ({ displayDare: true }));
  },

  hideDare: () => {
    set(() => ({
      displayDare: false,
      currentDare: null,
      currentTurn: null,
    }));
  },

  setTurn: (player: Player, type: DareType) => {
    const availablePackages = usePackage.getState().pickedPackages;
    const allDares = usePackage.getState().data.dares;

    const availableDares = allDares
      .filter(dare => availablePackages.map(aP => aP.id).includes(dare.package))
      .filter(dare => dare.type === type);

    const state = useRouletteGame.getState();

    const sortedDares = useSettings.getState().isRemoveRepetitions
      ? availableDares.filter(dare => !state.moves.some(move => move.dare.id === dare.id))
      : availableDares;

    if (sortedDares.length === 0) sortedDares.push(...availableDares);

    console.log(sortedDares.length);

    // Возможно имеет смысл сделать органичение по игроку/действию  move.player.id === player.id &&

    const randomDare = sortedDares[getRandomInt(0, sortedDares.length)];

    set((state: State) => ({
      currentTurn: player,
      moves: [...state.moves, { dare: randomDare, player: player }],
      currentDare: randomDare,
    }));
  },
}));
