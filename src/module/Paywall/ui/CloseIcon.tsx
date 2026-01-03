import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';

import LoadingAnimation from '@/assets/lottie/loading_animation.json';
import LottieView from 'lottie-react-native';

import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid from '@/src/shared/ui/grid/Grid';

interface CloseIconProps {
  showCloseIcon: boolean;
  setShowCloseIcon: (value: boolean) => void;
  goBack: () => void;
}

export default function CloseIcon({ setShowCloseIcon, showCloseIcon, goBack }: CloseIconProps) {
  const colors = useTheme();
  return (
    <Grid style={{ position: 'absolute' }}>
      {showCloseIcon ? (
        <Pressable onPress={goBack} hitSlop={10}>
          <Ionicons name="close" size={24} color={colors.text.secondary} />
        </Pressable>
      ) : (
        <LottieView
          resizeMode="cover"
          source={LoadingAnimation}
          autoPlay
          loop={false}
          speed={2.7}
          style={{ width: 25, height: 25, position: 'absolute' }}
          onAnimationFinish={() => setShowCloseIcon(true)}
        />
      )}
    </Grid>
  );
}
