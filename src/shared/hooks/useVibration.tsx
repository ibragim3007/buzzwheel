import * as Haptics from "expo-haptics";

export function useVibration() {
  const vibrate = () => {
    Haptics.impactAsync();
  };

  const vibrateSelection = () => {
    Haptics.selectionAsync();
  };

  return { vibrate, vibrateSelection };
}
