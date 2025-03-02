import { getRandomInt } from '@/src/shared/helpers/getRandomInt';

class GiftService {
  getRandomLockedGift<T extends { id: number }>(allGifts: T[], unlockedGifts: number[]) {
    const lockedGifts = allGifts.filter(gift => !unlockedGifts.includes(gift.id));

    const randomIndex = getRandomInt(0, lockedGifts.length);
    return lockedGifts[randomIndex];
  }
}

export const giftService = new GiftService();
