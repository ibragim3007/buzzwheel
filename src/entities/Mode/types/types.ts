export interface Mode {
  id: number;
  name: string;
  description: string;
  image: string;
  isFree: boolean;
  purchased: boolean;
  type: "two-players" | "default";
}
