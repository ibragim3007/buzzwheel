import { RouletteOptions } from "@/src/entities/Roulette/types";

const EXTRA_PADDING = 5; // Дополнительное пространство для безопасности
const WHEEL_SIZE = 385; // Размер рулетки
const CENTER = WHEEL_SIZE / 2; // Центр рулетки
const RADIUS = CENTER; // Радиус рулетки
const TEXT_RADIUS = CENTER * 0.66; // Радиус для текста (уменьшен для визуального эффекта)
const BORDER_WIDTH = 20;
const TOTAL_SIZE = WHEEL_SIZE + BORDER_WIDTH; // Размер SVG с учётом обводки

export const DefaultRouletteOptions: RouletteOptions = {
  TOTAL_SIZE,
  BORDER_WIDTH,
  CENTER,
  WHEEL_SIZE,
  EXTRA_PADDING,
  RADIUS,
  TEXT_RADIUS,
};
