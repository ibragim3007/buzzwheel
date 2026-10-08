import { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const COLORS = ['#FFD66B', '#FF7A7F', '#FFFFFF', '#7CF2B0', '#7FB8FF', '#FFB000'];
const PARTICLES = 18;

interface WinBurstProps {
  x: number;
  y: number;
  spread: number;
}

/** Короткий салют из точки над выигравшим сектором. */
export default function WinBurst({ x, y, spread }: WinBurstProps) {
  const progress = useSharedValue(0);

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLES }, (_, i) => {
        // Веер вверх и в стороны, немного вниз — получается «фонтан» над язычком
        const angle = -Math.PI / 2 + (i / (PARTICLES - 1) - 0.5) * Math.PI * 1.5 + (Math.random() - 0.5) * 0.25;
        const distance = spread * (0.55 + Math.random() * 0.6);
        return {
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          size: 5 + Math.random() * 5,
          color: COLORS[i % COLORS.length],
          round: i % 3 !== 0,
          spin: (Math.random() - 0.5) * 540,
        };
      }),
    [spread],
  );

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1100, easing: Easing.out(Easing.cubic) });
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p, i) => (
        <Particle key={i} particle={p} progress={progress} x={x} y={y} />
      ))}
    </View>
  );
}

type ParticleData = {
  dx: number;
  dy: number;
  size: number;
  color: string;
  round: boolean;
  spin: number;
};

function Particle({
  particle,
  progress,
  x,
  y,
}: {
  particle: ParticleData;
  progress: SharedValue<number>;
  x: number;
  y: number;
}) {
  const style = useAnimatedStyle(() => {
    const t = progress.value;
    const gravity = t * t * 40;
    return {
      opacity: t < 0.6 ? 1 : 1 - (t - 0.6) / 0.4,
      transform: [
        { translateX: particle.dx * t },
        { translateY: particle.dy * t + gravity },
        { rotate: `${particle.spin * t}deg` },
        { scale: 1 - t * 0.4 },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: x - particle.size / 2,
          top: y - particle.size / 2,
          width: particle.size,
          height: particle.round ? particle.size : particle.size * 0.45,
          borderRadius: particle.round ? particle.size / 2 : 1,
          backgroundColor: particle.color,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
  },
});
