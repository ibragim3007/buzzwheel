import { Player } from "../../types/globalTypes";

const REGEX_PLACEHOLDER =
  /\$\{[^}]+\}|\$\{r_player\}|\$\{rand\(\d+,\d+\)\}|\$\{prev_player\}|\$\{next_player\}/g;
const PLACEHOLDER_C_PLAYER = "${c_player}";
const PLACEHOLDER_R_PLAYER = "${r_player}";
const PLACEHOLDER_PREV_PLAYER = "${prev_player}";
const PLACEHOLDER_NEXT_PLAYER = "${next_player}";
const REGEX_RAND = /\$\{rand\((\d+),(\d+)\)\}/;

export const getTransformedArrayOfString = (str: string): string[] => {
  let match;
  const result: string[] = [];
  let lastIndex = 0;

  while ((match = REGEX_PLACEHOLDER.exec(str)) !== null) {
    if (match.index > lastIndex) {
      result.push(str.slice(lastIndex, match.index));
    }
    result.push(match[0]);
    lastIndex = REGEX_PLACEHOLDER.lastIndex;
  }

  if (lastIndex < str.length) {
    result.push(str.slice(lastIndex));
  }

  return result;
};

export const updatedArray = (
  transformedArray: string[],
  currentPlayer: Player,
  players: Player[]
): string[] => {
  const otherPlayers = players.filter(
    (player) => player.id !== currentPlayer.id
  );
  const randomPlayer =
    otherPlayers.length > 0
      ? otherPlayers[Math.floor(Math.random() * otherPlayers.length)]
      : null;

  const currentIndex = players.findIndex(
    (player) => player.id === currentPlayer.id
  );
  const prevPlayer =
    players[(currentIndex - 1 + players.length) % players.length];
  const nextPlayer = players[(currentIndex + 1) % players.length];

  return transformedArray.map((item) => {
    if (item === PLACEHOLDER_C_PLAYER) return currentPlayer.name;
    if (item === PLACEHOLDER_R_PLAYER && randomPlayer) return randomPlayer.name;
    if (item === PLACEHOLDER_PREV_PLAYER) return prevPlayer.name;
    if (item === PLACEHOLDER_NEXT_PLAYER) return nextPlayer.name;

    const randMatch = item.match(REGEX_RAND);
    if (randMatch) {
      const min = parseInt(randMatch[1], 10);
      const max = parseInt(randMatch[2], 10);
      return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    }

    return item;
  });
};

// Пример данных
const currentPlayer: Player = {
  id: 1,
  name: "Ibragim",
};

const players: Player[] = [
  { id: 1, name: "Ibragim" },
  { id: 2, name: "Nikita" },
  { id: 3, name: "Kirill" },
];

const sampleString2 =
  "Игрок ${c_player} сделай ${rand(4,10)} прыжков с закрытыми глазами вокруг игрока ${prev_player}";

console.log(
  updatedArray(
    getTransformedArrayOfString(sampleString2),
    currentPlayer,
    players
  )
);
