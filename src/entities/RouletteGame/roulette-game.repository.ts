import { getRandomInt } from '@/src/shared/helpers/getRandomInt';
import { Dare, DareType, Player } from '@/src/shared/types/globalTypes';
import { create } from 'zustand';
import { PackageWithDaresIds, usePackage } from '../Package/usePackage';
import { useSettings } from '../Settings/settings.repository';

export type ModeType = 'drink' | 'dry';
interface State {
  moves: { player: Player; dare: Dare; packId: number; drunk: boolean }[];
  currentTurn: Player | null;
  currentDare: Dare | null;
  currentPackage: PackageWithDaresIds | null;
  displayDare: boolean;
  mode: ModeType | null;
}

interface Actions {
  setTurn: (player: Player, type: DareType) => void;
  showDare: () => void;
  hideDare: (drunk: boolean) => void;
  setMode: (mode: ModeType) => void;
}

export const useRouletteGame = create<State & Actions>(set => ({
  moves: [],
  currentTurn: null,
  currentDare: null,
  displayDare: false,
  currentPackage: null,
  mode: null,

  showDare: () => {
    set(() => ({ displayDare: true }));
  },

  hideDare: (drunk: boolean) => {
    set(state => {
      if (state.currentDare !== null && state.currentTurn !== null && state.currentPackage !== null) {
        return {
          moves: [
            ...state.moves,
            {
              dare: state.currentDare,
              player: state.currentTurn,
              packId: state.currentPackage.id,
              drunk: drunk,
            },
          ],
          currentPackage: null,
          displayDare: false,
          currentDare: null,
          currentTurn: null,
        };
      }
      return {
        currentPackage: null,
        displayDare: false,
        currentDare: null,
        currentTurn: null,
      };
    });
  },

  setMode: (mode: 'drink' | 'dry' | null) => {
    set(() => ({ mode }));
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

    console.log(useRouletteGame.getState().moves.map(a => a.dare.id));

    set((state: State) => ({
      currentPackage: randomPackage,
      currentTurn: player,

      currentDare: randomDare,
    }));
  },
}));
