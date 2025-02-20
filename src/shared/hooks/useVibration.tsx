import * as Haptics from "expo-haptics";

export function useVibration() {
  const vibrate = () => {
    Haptics.impactAsync();
  };

  const vibrateMedium = () => {
    Haptics.notificationAsync();
  };

  const vibrateSelection = () => {
    Haptics.selectionAsync();
  };

  return { vibrate, vibrateSelection, vibrateMedium };
}
