import { create } from "zustand";
import { Player } from "./type";

type State = {
  players: Player[];
};
type Actions = {
  addNewPlayer: (name: string) => void;
  deletePlayer: (id: number) => void;
};

export const usePlayerStore = create<State & Actions>((set) => {
  return {
    players: [],

    updatePlayer: (player: Player) => {
      set((state) => ({
        players: state.players.map((p) =>
          p.id === player.id ? { ...p, ...player } : p
        ),
      }));
    },

    addNewPlayer: (name: string) => {
      set((state) => {
        const player: Player = {
          id: Date.now(),
          name,
        };
        return { players: [...state.players, player] };
      });
    },

    deletePlayer: (id: number) => {
      set((state) => ({
        players: state.players.filter((player) => player.id !== id),
      }));
    },
  };
});
