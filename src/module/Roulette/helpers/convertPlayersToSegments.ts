import { Player } from "@/src/entities/Player/type";
import { SegmentType } from "@/src/entities/Roulette/types";

export function convertPlayersToSegments(players: Player[]): SegmentType[] {
  // Если массив меньше 8 элементов, зацикливаем его до 8
  while (players.length < 8) {
    players = [...players, ...players].slice(0, 8);
  }

  // Преобразование массива
  return players.map((player, index) => ({
    id: player.id.toString(),
    label: player.name,
    color: index % 2 === 0 ? "#3d7a3d" : "#39b844",
  }));
}
