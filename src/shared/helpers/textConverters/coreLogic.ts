import { PalitraInterface } from '../../config/theme/theme';
import { TypographyWeight } from '../../styles/typography/typography';

export const PLACEHOLDERS = {
  CURRENT_PLAYER: '${c_player}',
  RANDOM_PLAYER: '${r_player}',
  PREV_PLAYER: '${prev_player}',
  NEXT_PLAYER: '${next_player}',
  RANDOM_LETTER: '${r_letter}',
  RAND_REGEX: /\$\{rand\((\d+),(\d+)\)\}/,
  TOKEN_REGEX: /\$\{[^}]+\}|\$\{r_player\}|\$\{rand\(\d+,\d+\)\}|\$\{prev_player\}|\$\{next_player\}|\$\{r_letter\}/g,
};

export const getTransformedArrayOfString = (str: string): string[] => {
  let match;
  const result: string[] = [];
  let lastIndex = 0;

  while ((match = PLACEHOLDERS.TOKEN_REGEX.exec(str)) !== null) {
    if (match.index > lastIndex) {
      result.push(str.slice(lastIndex, match.index));
    }
    result.push(match[0]);
    lastIndex = PLACEHOLDERS.TOKEN_REGEX.lastIndex;
  }

  if (lastIndex < str.length) {
    result.push(str.slice(lastIndex));
  }

  return result;
};

type BasePlayerInterface = {
  id: number;
  name: string;
  color?: string;
};

type TransforeArrayItem = {
  value: string;
  color: string;
  weight: TypographyWeight;
};

export const updatedArray = (
  transformedArray: string[],
  currentPlayer: BasePlayerInterface,
  players: BasePlayerInterface[],
  theme: PalitraInterface,
): TransforeArrayItem[] => {
  const otherPlayers = players.filter(player => player.id !== currentPlayer.id);
  const randomPlayer = otherPlayers.length > 0 ? otherPlayers[Math.floor(Math.random() * otherPlayers.length)] : null;

  const currentIndex = players.findIndex(player => player.id === currentPlayer.id);
  const prevPlayer = players[(currentIndex - 1 + players.length) % players.length];
  const nextPlayer = players[(currentIndex + 1) % players.length];

  const getRandomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));

  const items: TransforeArrayItem[] = transformedArray.map(item => {
    if (item === PLACEHOLDERS.CURRENT_PLAYER)
      return { value: currentPlayer.name, color: currentPlayer.color || theme.text.secondary, weight: 'bold' };
    if (item === PLACEHOLDERS.RANDOM_PLAYER && randomPlayer)
      return { value: randomPlayer.name, color: theme.text.secondary, weight: 'bold' };
    if (item === PLACEHOLDERS.PREV_PLAYER)
      return { value: prevPlayer.name, color: theme.text.secondary, weight: 'bold' };
    if (item === PLACEHOLDERS.NEXT_PLAYER)
      return { value: nextPlayer.name, color: theme.text.secondary, weight: 'bold' };
    if (item === PLACEHOLDERS.RANDOM_LETTER)
      return { value: getRandomLetter(), color: theme.text.secondary, weight: 'bold' };

    const randMatch = item.match(PLACEHOLDERS.RAND_REGEX);
    if (randMatch) {
      const min = parseInt(randMatch[1], 10);
      const max = parseInt(randMatch[2], 10);
      return {
        value: (Math.floor(Math.random() * (max - min + 1)) + min).toString(),
        color: theme.text.secondary,
        weight: 'bold',
      };
    }

    return { value: item, color: theme.text.secondary, weight: 'regular' };
  });

  return items;
};

// const currentPlayer: BasePlayerInterface = {
//     id: 1,
//     name: "Ibragim"
// }

// const players: BasePlayerInterface[] = [
//     {
//         id: 1,
//         name: 'Ibragim'
//     },
//      {
//         id: 2,
//         name: 'Nikita'
//     },
//      {
//         id: 3,
//         name: 'Kirill'
//     },
// ]

// const sampleString = "${c_player}, расскажи три самых безумных поступов, за каждый не рассказаный выпивай по одной";
// console.log(updatedArray(getTransformedArrayOfString(sampleString), currentPlayer, players));

// const sampleString2 = "Игрок ${c_player} сделай ${rand(4,10)} прыжков с закрытыми глазами";
// console.log(updatedArray(getTransformedArrayOfString(sampleString2), currentPlayer, players));

// const sampleString3 = "${c_player} и ${r_player} сделай ${r_letter} прыжков с закрытыми глазами";
// console.log(updatedArray(getTransformedArrayOfString(sampleString3), currentPlayer, players));
