import { getRandomInt } from '@/src/shared/helpers/getRandomInt';
import { Dare, DareType, Package, Player } from '@/src/shared/types/globalTypes';
import { create } from 'zustand';
import { usePackage } from '../Package/usePackage';
import { useSettings } from '../Settings/settings.repository';

interface State {
  moves: { player: Player; dare: Dare; packId: number }[];
  currentTurn: Player | null;
  currentDare: Dare | null;
  currentPackage: Package | null;
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
  currentPackage: null,

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
    const isRemoveRepetitions = useSettings.getState().isRemoveRepetitions;
    const availablePackages = usePackage.getState().pickedPackages;
    const randomPackage = availablePackages[getRandomInt(0, availablePackages.length)];

    if (!randomPackage) {
      set(() => ({
        currentTurn: null,
        currentDare: null,
      }));
      return;
    }

    // Фильтруем дачи по типу и удаляем повторы, если это необходимо
    const sortedDaresFromPackage = randomPackage.dares.filter(dare => dare.type === type);
    const sortedDares = isRemoveRepetitions
      ? sortedDaresFromPackage.filter(dare => !useRouletteGame.getState().moves.some(move => move.dare.id === dare.id))
      : sortedDaresFromPackage;

    // Если нет доступных дач, то добавляем все дачи из пакета
    if (sortedDares.length === 0) sortedDares.push(...sortedDaresFromPackage);

    // Возможно имеет смысл сделать органичение по игроку/действию  move.player.id === player.id &&
    const randomDare = sortedDares[getRandomInt(0, sortedDares.length)];

    set((state: State) => ({
      currentPackage: randomPackage,
      currentTurn: player,
      moves: [...state.moves, { dare: randomDare, player: player, packId: randomPackage.id }],
      currentDare: randomDare,
    }));
  },
}));
