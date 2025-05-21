import * as Haptics from 'expo-haptics';

export function useVibration() {
  const vibrate = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const vibrateMedium = () => {
    void Haptics.notificationAsync();
  };

  const vibrateSelection = () => {
    void Haptics.selectionAsync();
  };

  return { vibrate, vibrateSelection, vibrateMedium };
}
