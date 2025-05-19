import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import { Image } from 'expo-image';
import NoUserYetImage from '@/assets/images/placeholders/no_user_yet.png';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';

export default function Placeholder() {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }],
    };
  });

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(rotation.value + 360, {
          duration: 800,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(rotation.value + 360, {
          duration: 8600,
          easing: Easing.linear,
        }),
      ),
      -1, // Infinite repeats
      false, // Do not reverse animation
    );
  }, [rotation]);

  return (
    <Grid style={{ opacity: 0.25 }} height={normalizedSize(300)} align="center" justfity="center">
      <Animated.View style={animatedStyle}>
        <Image source={NoUserYetImage as string} contentFit="contain" style={{ width: 200, height: 200 }} />
      </Animated.View>
      <Typography weight="medium" textAlign="center">
        No players yet
      </Typography>
    </Grid>
  );
}
