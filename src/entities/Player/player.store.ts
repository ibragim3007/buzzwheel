import { StorageKeys } from "@/src/shared/config/constants/storageKeys";
import { Player } from "@/src/shared/types/globalTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type State = {
  players: Player[];
};
type Actions = {
  addNewPlayer: (name: string) => void;
  deletePlayer: (id: number) => void;
};

export const usePlayerStore = create<State & Actions>((set) => {
  const initialState: State = { players: [] };

  const loadInitialState = async () => {
    const storedPlayers = await AsyncStorage.getItem(StorageKeys.players);

    if (storedPlayers) {
      set({ players: JSON.parse(storedPlayers) });
    }
  };

  loadInitialState();

  return {
    ...initialState,

    addNewPlayer: async (name: string) => {
      set((state) => {
        const player: Player = {
          id: Date.now(),
          name,
        };

        const updatedPlayers = [...state.players, player];
        return { players: updatedPlayers };
      });
    },

    deletePlayer: (id: number) => {
      set((state) => {
        const updatedPlayers = state.players.filter(
          (player) => player.id !== id
        );
        return { players: updatedPlayers };
      });
    },
  };
});

usePlayerStore.subscribe(async (state) => {
  await AsyncStorage.setItem(
    StorageKeys.players,
    JSON.stringify(state.players)
  );
});
