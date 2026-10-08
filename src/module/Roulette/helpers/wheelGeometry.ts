// Геометрия колеса. Углы считаются по часовой стрелке от верхней точки (12 часов).

export type WheelMetrics = {
  size: number;
  center: number;
  radius: number;
  rimWidth: number;
  segmentRadius: number;
  hubRadius: number;
  pegOrbit: number;
  pegRadius: number;
  pointerWidth: number;
};

export const getWheelMetrics = (size: number): WheelMetrics => {
  const center = size / 2;
  const radius = center;
  const rimWidth = radius * 0.085;

  return {
    size,
    center,
    radius,
    rimWidth,
    segmentRadius: radius - rimWidth,
    hubRadius: radius * 0.19,
    pegOrbit: radius - rimWidth / 2,
    pegRadius: Math.max(2.5, rimWidth * 0.27),
    pointerWidth: size * 0.115,
  };
};

export const polar = (center: number, r: number, angle: number) => {
  const rad = (angle * Math.PI) / 180;
  return { x: center + r * Math.sin(rad), y: center - r * Math.cos(rad) };
};

export const wedgePath = (center: number, r: number, startAngle: number, endAngle: number) => {
  const p0 = polar(center, r, startAngle);
  const p1 = polar(center, r, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M${center},${center} L${p0.x},${p0.y} A${r},${r} 0 ${largeArc},1 ${p1.x},${p1.y} Z`;
};

export const circlePath = (center: number, r: number) =>
  `M${center - r},${center} A${r},${r} 0 1,0 ${center + r},${center} A${r},${r} 0 1,0 ${center - r},${center} Z`;

const CHAR_WIDTH = 0.62; // средняя ширина символа относительно размера шрифта

/**
 * Подбирает размер шрифта так, чтобы подпись поместилась в сектор целиком:
 * по длине (от края к центру) и по толщине сектора в самой узкой точке.
 * Если не влезает даже минимальным шрифтом — обрезает с многоточием.
 */
export const fitLabel = (
  label: string,
  segmentsCount: number,
  outerR: number,
  innerR: number,
  maxFont: number,
  minFont: number,
) => {
  const halfAngle = Math.PI / segmentsCount;

  const fits = (chars: number, font: number) => {
    const length = chars * font * CHAR_WIDTH;
    const innerEnd = outerR - length;
    if (innerEnd < innerR) return false;
    return 2 * innerEnd * Math.sin(halfAngle) >= font * 1.1;
  };

  const chars = Array.from(label);
  for (let font = Math.round(maxFont); font >= minFont; font--) {
    if (fits(chars.length, font)) return { text: label, fontSize: font };
  }

  let count = chars.length - 1;
  while (count > 1 && !fits(count + 1, minFont)) count--;
  return { text: chars.slice(0, count).join('').trimEnd() + '…', fontSize: minFont };
};

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
