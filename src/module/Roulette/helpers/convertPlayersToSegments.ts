import { SegmentType } from "@/src/entities/Roulette/types";
import { Player } from "@/src/shared/types/globalTypes";

const color1Segment = "#990";
const color2Segment = "#350";

// 2 игрока: 8 сегментов, 6 игроков (повторяются), 2 - all
// 3 игроков:  8 сегментов, 6 – игроков (повторяются), 2 – all
// 4 игроков:  10 сегментов, 8 – игроков, 2 – all
// 5 игроков:  8 сегментов, 5 – игроков, 3 – all
// 6 игроков:   8 сегментов, 6 – игроков, 2 – all
// 7 игроков:   8 сегментов, 7 – игроков, 1 – all
// 8 игроков: 10 сегментов, 8 игроков, 2 - all

// 8 - 2 = 6 (2 – all)
// 8 - 4 = 4 (2 - all

//

// 8 - number

const calcTotalSegments = (players: Player[]) => {
  const totalSegments = players.length < 4 ? 8 : players.length * 2 + 2;
  if (players.length < 4) {
    return 8;
  }
  if (players.length >= 4 && players.length <= 7) {
    players.length * 2 + 2;
  }
  if (players.length === 8) {
    return 10;
  }
  if (players.length > 8) {
    if (players.length % 2 === 0) {
      return players.length + 2;
    }
    return players.length + 3;
  }
  return totalSegments;
};

const calcAllPlayerSegments = (players: Player[]) => {
  if (players.length <= 8) {
    return 2;
  }
  if (players.length > 8) {
    if (players.length % 2 === 0) {
      return 2;
    }
    return 3;
  }
  return 2;
};

export function convertPlayersToSegments(
  players: Player[],
  colorGroup: [string, string, string]
): SegmentType[] {
  const totalSegments = calcTotalSegments(players);

  const allSemgents = calcAllPlayerSegments(players);
  const playerSegments = totalSegments - allSemgents;

  while (players.length < playerSegments) {
    players = [...players, ...players].slice(0, playerSegments);
  }

  const segments: SegmentType[] = players.map((player, index) => ({
    id: player.id,
    label: player.name,
    color: index % 2 === 0 ? colorGroup[0] : colorGroup[1],
    type: "player",
  }));

  const allPlayerSegment: SegmentType = {
    id: 0,
    label: "Все",
    color: colorGroup[2],
    type: "all",
  };
  const step = Math.floor(totalSegments / allSemgents);
  for (let i = 0; i < allSemgents; i++) {
    segments.splice((i + 1) * step - 1, 0, allPlayerSegment);
  }

  return segments;
}
