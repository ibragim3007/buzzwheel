export function generateColorForPlayer(): string {
  const getBrightValue = () => Math.floor(128 + Math.random() * 127); // Значения от 128 до 255 для яркости
  const r = getBrightValue().toString(16).padStart(2, "0");
  const g = getBrightValue().toString(16).padStart(2, "0");
  const b = getBrightValue().toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
}

// Пример использования
// console.log(generateColorForPlayer());
