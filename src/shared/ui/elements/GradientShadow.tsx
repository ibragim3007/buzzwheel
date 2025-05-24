import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';

interface GradientShadowProps {
  height?: number;
  color?: string;
  secondColor?: string;
}

export default function GradientShadow({ height, color, secondColor }: GradientShadowProps) {
  const colors = useTheme();
  return (
    <LinearGradient
      colors={[secondColor || 'transparent', color || colors.background.primary]} // Цвет тени
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.3,
        height: height || 60, // Высота тени
      }}
      pointerEvents="none"
    />
  );
}
