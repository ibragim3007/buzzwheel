import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

interface WheelPointerProps {
  width: number;
  style: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

export const POINTER_HEIGHT_RATIO = 1.38;

/** Язычок-«булавка» над колесом. Вращается вокруг центра головки, когда задевает гвоздики. */
export default function WheelPointer({ width: w, style }: WheelPointerProps) {
  const h = w * POINTER_HEIGHT_RATIO;
  const r = w / 2 - 2;
  const cx = w / 2;
  const cy = w / 2;
  const side = Math.sqrt(r * r - (r * 0.76) ** 2);

  const d = `M${cx},${h - 2} L${cx - r * 0.76},${cy + side} A${r},${r} 0 1,1 ${cx + r * 0.76},${cy + side} Z`;

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.shadow, { width: w, height: h, transformOrigin: [cx, cy, 0] }, style]}
    >
      <Svg width={w} height={h}>
        <Defs>
          <LinearGradient id="wheelPointer" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FF7A7F" />
            <Stop offset="1" stopColor="#D7263D" />
          </LinearGradient>
        </Defs>
        <Path d={d} fill="url(#wheelPointer)" stroke="#FFFFFF" strokeWidth={2.5} strokeLinejoin="round" />
        <Circle cx={cx} cy={cy} r={r * 0.32} fill="#FFFFFF" />
        <Circle cx={cx} cy={cy} r={r * 0.14} fill="#D7263D" />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    position: 'absolute',
    shadowColor: '#000000',
    shadowOpacity: 0.45,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },
});
