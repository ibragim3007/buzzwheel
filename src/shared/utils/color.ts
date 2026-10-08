/** Осветляет (amount > 0) или затемняет (amount < 0) hex-цвет. amount в диапазоне -1..1 */
export const shadeColor = (hex: string, amount: number) => {
  let h = hex.replace('#', '');
  if (h.length === 3)
    h = h
      .split('')
      .map(ch => ch + ch)
      .join('');
  const num = parseInt(h.slice(0, 6), 16);
  if (Number.isNaN(num)) return hex;

  const mix = (ch: number) => Math.round(amount >= 0 ? ch + (255 - ch) * amount : ch * (1 + amount));
  const r = mix((num >> 16) & 255);
  const g = mix((num >> 8) & 255);
  const b = mix(num & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

/** hex → rgba с заданной прозрачностью */
export const withAlpha = (hex: string, alpha: number) => {
  let h = hex.replace('#', '');
  if (h.length === 3)
    h = h
      .split('')
      .map(ch => ch + ch)
      .join('');
  const num = parseInt(h.slice(0, 6), 16);
  if (Number.isNaN(num)) return hex;
  return `rgba(${(num >> 16) & 255},${(num >> 8) & 255},${num & 255},${alpha})`;
};
