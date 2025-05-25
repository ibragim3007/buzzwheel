import { useApp } from '@/src/entities/appStore/app.store';
import * as Haptics from 'expo-haptics';

export function useVibration() {
  const { isVibrationEnabled } = useApp();

  const vibrate = () => {
    if (!isVibrationEnabled) {
      return;
    }
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const vibrateError = () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const vibrateMedium = () => {
    if (!isVibrationEnabled) {
      return;
    }
    void Haptics.notificationAsync();
  };

  const vibrateSelection = () => {
    if (!isVibrationEnabled) {
      return;
    }
    void Haptics.selectionAsync();
  };

  return { vibrate, vibrateSelection, vibrateMedium, vibrateError };
}
