import { create } from "zustand";
import { Player } from "./type";

type State = {
  players: Player[];
};
type Actions = {
  addNewPlayer: (player: Player) => void;
  deletePlayer: (id: number) => void;
};

const usePlayerStore = create<State & Actions>((set) => {
  return {
    players: [],

    updatePlayer: (player: Player) => {
      set((state) => ({
        players: state.players.map((p) =>
          p.id === player.id ? { ...p, ...player } : p
        ),
      }));
    },

    addNewPlayer: (player: Player) => {
      set((state) => ({
        players: [...state.players, player],
      }));
    },

    deletePlayer: (id: number) => {
      set((state) => ({
        players: state.players.filter((player) => player.id !== id),
      }));
    },
  };
});
