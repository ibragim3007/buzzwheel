// constants.ts (или в том же файле рядом с INITIAL_WEIGHT)

export const weightMultiplier = (daresCount: number) => 1 - 1 / (daresCount * 1); // чем больше заданий, тем медленней спад
