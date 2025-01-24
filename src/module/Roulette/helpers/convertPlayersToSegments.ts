import { SegmentType } from "@/src/entities/Roulette/types";
import { Player } from "@/src/shared/types/globalTypes";

export function convertPlayersToSegments(players: Player[]): SegmentType[] {
  while (players.length < 8) {
    players = [...players, ...players].slice(0, 8);
  }

  return players.map((player, index) => ({
    id: player.id,
    label: player.name,
    color: index % 2 === 0 ? "#3d7a3d" : "#39b844",
  }));
}
