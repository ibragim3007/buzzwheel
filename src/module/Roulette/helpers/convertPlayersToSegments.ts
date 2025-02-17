import { SegmentType } from "@/src/entities/Roulette/types";
import { Player } from "@/src/shared/types/globalTypes";

const color1Segment = "#2E8B57";
const color2Segment = "#3CB371";

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

export function convertPlayersToSegments(players: Player[]): SegmentType[] {
  const totalSegments = players.length < 4 ? 8 : players.length * 2 + 2;
  const allSemgents = 2;
  const playerSegments = totalSegments - allSemgents;

  while (players.length < playerSegments) {
    players = [...players, ...players].slice(0, playerSegments);
  }

  const segments: SegmentType[] = players.map((player, index) => ({
    id: player.id,
    label: player.name,
    color: index % 2 === 0 ? color1Segment : color2Segment,
    type: "player",
  }));

  const allSegment: SegmentType = {
    id: 0,
    label: "Все",
    color: "#232323",
    type: "all",
  };
  const step = Math.floor(totalSegments / allSemgents);
  for (let i = 0; i < allSemgents; i++) {
    segments.splice((i + 1) * step - 1, 0, allSegment);
  }

  return segments;
}

// export function convertPlayersToSegments(players: Player[]): SegmentType[] {
//   let segments: SegmentType[] = [];
//   let playerCount = players.length;
//   let totalSegments = playerCount <= 4 || playerCount === 8 ? 10 : 8;
//   let allCount = totalSegments - playerCount;

//   if (playerCount < totalSegments - allCount) {
//     const repeatedPlayers: Player[] = [];
//     while (repeatedPlayers.length + playerCount < totalSegments - allCount) {
//       repeatedPlayers.push(...players);
//     }
//     repeatedPlayers.length = totalSegments - allCount - playerCount;
//     players = [...players, ...repeatedPlayers];
//   }

//   segments = players.map((player, index) => ({
//     id: player.id,
//     label: player.name,
//     color: index % 2 === 0 ? color1Segment : color2Segment,
//     type: "player",
//   }));

//   const allSegment: SegmentType = {
//     id: 0,
//     label: "All",
//     color: "#808080",
//     type: "all",
//   };
//   const step = Math.floor(totalSegments / allCount);
//   for (let i = 0; i < allCount; i++) {
//     segments.splice((i + 1) * step - 1, 0, allSegment);
//   }

//   return segments;
// }
