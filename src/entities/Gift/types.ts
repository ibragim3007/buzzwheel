export type GiftTypes =
  | "roulette-colors"
  | "app-theme"
  | "package"
  | "weekly-sub";

export interface IGift {
  id: number;
  probability: number;
  type: GiftTypes;
  segmentColor?: string;
}
