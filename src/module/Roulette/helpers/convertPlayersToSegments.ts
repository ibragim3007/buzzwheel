import { SegmentType } from "@/src/entities/Roulette/types";
import { Player } from "@/src/shared/types/globalTypes";

const color1Segment = "#2E8B57";
const color2Segment = "#3CB371";

export function convertPlayersToSegments(players: Player[]): SegmentType[] {
  while (players.length < 8) {
    players = [...players, ...players].slice(0, 8);
  }

  return players.map((player, index) => ({
    id: player.id,
    label: player.name,
    color: index % 2 === 0 ? color1Segment : color2Segment,
  }));
}
