import { getRandomInt } from '@/src/shared/helpers/getRandomInt';
import { Dare, DareType, Player } from '@/src/shared/types/globalTypes';
import { create } from 'zustand';
import { PackageWithDaresIds, usePackage } from '../Package/usePackage';
import { useSettings } from '../Settings/settings.repository';
import { navigate } from 'expo-router/build/global-state/routing';
import { pickByWeight } from '@/src/shared/utils/pickByWeight';
import { usePurchases } from '../usePurchases/usePurchases';
import { FREE_TURNS_BEFORE_LIMIT, TURNS_BETWEEN_LIMIT_REMINDERS } from '@/src/shared/config/constants/constants';

export type ModeType = 'drink' | 'dry' | 'push-ups' | 'no-penalty';
interface State {
  moves: { player: Player; dare: Dare; packId: number; drunk: boolean }[];
  currentTurn: Player | null;
  currentDare: Dare | null;
  currentPackage: PackageWithDaresIds | null;
  displayDare: boolean;
  mode: ModeType | null;
  limitOptions: {
    turnsPlayed: number; // Ходы за сессию приложения, не сбрасываются между играми
    showLimitAt: number;
  };
}

interface Actions {
  setTurn: (player: Player, type: DareType) => void;
  showDare: () => void;
  hideDare: (drunk: boolean) => void;
  setMode: (mode: ModeType) => void;

  resetGame: () => void;
}

export const useRouletteGame = create<State & Actions>((set, get) => ({
  moves: [],
  currentTurn: null,
  currentDare: null,
  displayDare: false,
  currentPackage: null,
  mode: null,
  limitOptions: {
    turnsPlayed: 0,
    showLimitAt: FREE_TURNS_BEFORE_LIMIT,
  },

  showDare: () => {
    set(() => ({ displayDare: true }));
  },

  hideDare: (drunk: boolean) => {
    const isTurnFinished = get().currentDare !== null;

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

    if (!isTurnFinished) return;

    const { turnsPlayed, showLimitAt } = get().limitOptions;
    const nextTurnsPlayed = turnsPlayed + 1;
    const { isActiveSubscription } = usePurchases.getState();

    // Показываем лимит только между ходами — после того как задание закрыто
    if (!isActiveSubscription && nextTurnsPlayed >= showLimitAt) {
      set({
        limitOptions: { turnsPlayed: nextTurnsPlayed, showLimitAt: nextTurnsPlayed + TURNS_BETWEEN_LIMIT_REMINDERS },
      });
      setTimeout(() => navigate('/screens/limit'), 400); // Даём карточке задания уехать
      return;
    }

    set({ limitOptions: { turnsPlayed: nextTurnsPlayed, showLimitAt } });
  },

  setMode: (mode: ModeType | null) => {
    set(() => ({ mode }));
  },

  /*

    Нужно чтобы пакеты выпадали с определенными вероятностями 
    в зависимости от того сколько раз он уже выпал и сколько в нем действий осталось.

    Например, если пакет выпал 3 раза, то вероятность его выпадения должна быть ниже
    чем у пакета, который выпал 1 раз.

    Например можно выставить всем пакетам вероятность 1. А затем каждый раз, когда пакет выпадает,
    уменьшать вероятность его выпадения на 1 / 0.1 * dares.length

  */

  resetGame: () => {
    set(() => ({
      moves: [],
      currentTurn: null,
      currentDare: null,
      displayDare: false,
      currentPackage: null,
      mode: null,
    }));
  },

  setTurn: (player: Player, type: DareType) => {
    const { pickedPackages, decayWeight, resetWeight } = usePackage.getState();
    const isRemoveRepetitions = useSettings.getState().isRemoveRepetitions;
    // const randomPackage = availablePackages[getRandomInt(0, availablePackages.length)];
    const randomPackage = pickByWeight(pickedPackages);

    if (!randomPackage) {
      resetWeight();
      return;
    }

    // console.log(pickedPackages.map(pkg => `${pkg.name} (weight: ${pkg.weight})\n`));

    decayWeight(randomPackage.id); // обязательно после удачного хода

    if (!randomPackage) {
      set({ currentTurn: null, currentDare: null });
      resetWeight;
      return;
    }

    const moves = useRouletteGame.getState().moves;

    if (!randomPackage) {
      set(() => ({
        currentTurn: null,
        currentDare: null,
      }));
      return;
    }

    // Фильтруем пакеты по типу
    const sortedDaresFromPackage = randomPackage.dares.filter(dare => dare.type === type);
    const sortedDares = isRemoveRepetitions
      ? sortedDaresFromPackage.filter(dare => !moves.some(move => move.dare.id === dare.id))
      : sortedDaresFromPackage;

    // Если нет доступных дач, то добавляем все дачи из пакета
    if (sortedDares.length === 0) sortedDares.push(...sortedDaresFromPackage);

    // Возможно имеет смысл сделать органичение по игроку/действию  move.player.id === player.id &&
    const randomDare = sortedDares[getRandomInt(0, sortedDares.length)];

    set(() => ({
      currentPackage: randomPackage,
      currentTurn: player,
      currentDare: randomDare,
    }));
  },
}));
