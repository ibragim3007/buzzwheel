import { DareType } from "@/src/shared/types/globalTypes";

export type SegmentType = {
  id: number;

  label: string;
  color: string;
  type: DareType;
  textColor?: string;
  probability: number;
};

export type RouletteOptions = {
  TOTAL_SIZE: number;
  BORDER_WIDTH: number;
  CENTER: number;
  WHEEL_SIZE: number;
  EXTRA_PADDING: number;
  RADIUS: number;
  TEXT_RADIUS: number;
  BORDER_COLOR?: string;
};
