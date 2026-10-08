import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { shadeColor, WheelMetrics } from '../helpers/wheelGeometry';

interface WheelHubProps {
  metrics: WheelMetrics;
  rimColor: string;
  idle: boolean;
}

/** Неподвижная кнопка в центре колеса. Пока колесо ждёт — от неё расходится пульсирующее кольцо. */
export default function WheelHub({ metrics, rimColor, idle }: WheelHubProps) {
  const { center, hubRadius } = metrics;
  const d = hubRadius * 2;
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (idle) {
      pulse.value = 0;
      pulse.value = withRepeat(withTiming(1, { duration: 1600, easing: Easing.out(Easing.quad) }), -1, false);
    } else {
      cancelAnimation(pulse);
      pulse.value = withTiming(0, { duration: 200 });
    }
  }, [idle]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: idle ? 0.7 * (1 - pulse.value) : 0,
    transform: [{ scale: 1 + pulse.value * 0.55 }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    opacity: withTiming(idle ? 1 : 0.35, { duration: 250 }),
  }));

  const frame = { width: d, height: d, borderRadius: hubRadius, left: center - hubRadius, top: center - hubRadius };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View style={[styles.abs, frame, { borderColor: rimColor }, styles.pulse, pulseStyle]} />
      <LinearGradient
        colors={[shadeColor(rimColor, 0.5), rimColor, shadeColor(rimColor, -0.45)]}
        style={[styles.abs, styles.hub, frame]}
      >
        <LinearGradient
          colors={[shadeColor(rimColor, 0.15), shadeColor(rimColor, -0.25)]}
          style={[styles.inner, { width: d * 0.78, height: d * 0.78, borderRadius: d }]}
        >
          <Animated.View style={iconStyle}>
            <Ionicons name="sync" size={d * 0.42} color="#FFFFFF" />
          </Animated.View>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  abs: {
    position: 'absolute',
  },
  pulse: {
    borderWidth: 3,
  },
  hub: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
});
