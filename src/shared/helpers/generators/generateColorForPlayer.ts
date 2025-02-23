export function generateColorForPlayer(): string {
  const getColorComponent = () => Math.floor(100 + Math.random() * 155); // 100–255 для ярких оттенков
  const r = getColorComponent().toString(16).padStart(2, "0");
  const g = getColorComponent().toString(16).padStart(2, "0");
  const b = getColorComponent().toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
}

// Пример использования
// console.log(generateColorForPlayer());
