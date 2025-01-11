import * as Haptics from 'expo-haptics';

export function useVibration() {
  const vibrate = () => {
    Haptics.impactAsync();
  };

  return { vibrate };
}
