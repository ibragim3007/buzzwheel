import { SegmentType } from "../Roulette/types";
import { IGift } from "./types";

const generateLabelByTypeForGift = (gift: IGift) => {
  if (gift.type === "app-theme") {
    return "Theme";
  }
  if (gift.type === "roulette-colors") {
    return "Roulette";
  }
  if (gift.type === "package") {
    return "Пакет!";
  }
  if (gift.type === "weekly-sub") {
    return "Subscription";
  }

  return "Gift";
};

export function convertGiftsToSegments(gifts: IGift[]) {
  const segments: SegmentType[] = gifts.map((gift, index) => ({
    id: gift.id,
    label: generateLabelByTypeForGift(gift),
    color: gift.segmentColor || (index % 2 === 0 ? "#713" : "#959"),
    type: "gift",
    probability: gift.probability,
  }));

  return segments;
}
