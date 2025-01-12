import { RouletteOptions } from "@/src/entities/Roulette/types";

// Вычисляет координаты точки на окружности
export const calculateCoordinates = (
  RADIUS: number,
  angle: number,
  options: RouletteOptions
) => ({
  x: options.CENTER + RADIUS * Math.cos((Math.PI * angle) / 180),
  y: options.CENTER + RADIUS * Math.sin((Math.PI * angle) / 180),
});
