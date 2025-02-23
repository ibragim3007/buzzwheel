let lastHue = 0; // Сохраняет последний оттенок для контрастности

export function generateColorForPlayer(contrastMode = false): string {
  if (contrastMode) {
    // Для контрастных цветов меняем оттенок с шагом 137° (почти золотое сечение для равномерного распределения)
    lastHue = (lastHue + 137) % 360;
    return hslToHex(lastHue, 80, 50); // Высокая насыщенность и средняя яркость
  } else {
    // Случайные яркие цвета
    const getColorComponent = () => Math.floor(100 + Math.random() * 155); // 100–255
    const r = getColorComponent().toString(16).padStart(2, "0");
    const g = getColorComponent().toString(16).padStart(2, "0");
    const b = getColorComponent().toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }
}

// 🔄 Преобразование HSL → HEX для React Native
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    Math.round(
      255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))
    );
  return `#${f(0).toString(16).padStart(2, "0")}${f(8)
    .toString(16)
    .padStart(2, "0")}${f(4).toString(16).padStart(2, "0")}`;
}

// 📌 Пример использования
console.log(generateColorForPlayer()); // Случайный яркий цвет
console.log(generateColorForPlayer(true)); // Контрастный цвет
console.log(generateColorForPlayer(true)); // Ещё один контрастный цвет
