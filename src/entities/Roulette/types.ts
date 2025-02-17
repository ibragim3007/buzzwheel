export type SegmentType = {
  id: number;
  label: string;
  color: string;
  type: "player" | "all";
};

export type RouletteOptions = {
  TOTAL_SIZE: number;
  BORDER_WIDTH: number;
  CENTER: number;
  WHEEL_SIZE: number;
  EXTRA_PADDING: number;
  RADIUS: number;
  TEXT_RADIUS: number;
};
