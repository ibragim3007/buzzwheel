import { ModeType } from '@/src/entities/RouletteGame/roulette-game.repository';
import { getRandomInt } from '@/src/shared/helpers/getRandomInt';

export const getPenaltyAmount = (modeType: ModeType) => {
  if (modeType === 'drink') {
    return getRandomInt(1, 3);
  }

  if (modeType === 'no-penalty') {
    return 0;
  }

  if (modeType === 'push-ups') {
    return getRandomInt(4, 11);
  }

  return 0;
};
