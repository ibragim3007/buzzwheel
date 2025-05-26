/**
 * Выбирает случайный элемент из массива с учетом весов.
 * @param items Массив объектов, каждый из которых должен иметь свойство `weight`.
 * @returns Случайный элемент из массива или `undefined`, если все веса равны 0.
 */

export function pickByWeight<T extends { weight: number }>(items: T[]): T | undefined {
  const sum = items.reduce((acc, i) => acc + i.weight, 0);
  if (sum === 0) return undefined; // все веса = 0
  let r = Math.random() * sum;
  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item;
  }
  return items[items.length - 1]; // fallback
}
