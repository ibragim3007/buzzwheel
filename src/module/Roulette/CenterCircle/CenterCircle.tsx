import { RouletteOptions } from '@/src/entities/Roulette/types';
import { normalizedSize } from '@/src/shared/utils/size';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Polygon } from 'react-native-svg';

interface CenterCircleProps {
  options: RouletteOptions;
}

export default function CenterCircle({ options }: CenterCircleProps) {
  const { WHEEL_SIZE, CENTER, RADIUS } = options;
  return (
    <Svg width={WHEEL_SIZE} height={WHEEL_SIZE} viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}>
      <Circle cx={CENTER + 3} cy={CENTER + 6} r={RADIUS * 0.21} fill="#00000027" />
      <Polygon
        points={`${CENTER + 10},${CENTER - RADIUS * 0.15} ${CENTER + 25},${
          CENTER - RADIUS * 0.15
        } ${CENTER},${CENTER - RADIUS * 0.3}`}
        fill="#00000021"
      />
      <Polygon
        points={`${CENTER - 15},${CENTER - RADIUS * 0.15} ${CENTER + 15},${
          CENTER - RADIUS * 0.15
        } ${CENTER},${CENTER - RADIUS * 0.3}`}
        fill="#FEF331"
      />

      <LinearGradient
        colors={['#FEF331', '#E77801']}
        style={{
          width: normalizedSize(84),
          height: normalizedSize(84),
          borderRadius: 100,
          position: 'absolute',
          top: WHEEL_SIZE / 2 - normalizedSize(42),
          left: WHEEL_SIZE / 2 - normalizedSize(42),
          shadowColor: '#01e705',
          shadowOpacity: 1,
          shadowRadius: 10,
        }}
      />
      <LinearGradient
        colors={['#FD9901', '#f0ae20']}
        style={{
          width: normalizedSize(70),
          height: normalizedSize(70),
          borderRadius: 100,
          position: 'absolute',
          top: WHEEL_SIZE / 2 - normalizedSize(35),
          left: WHEEL_SIZE / 2 - normalizedSize(35),
        }}
      />

      {/* <Circle cx={CENTER} cy={CENTER} r={RADIUS * 0.12} fill="#a18014" /> */}
    </Svg>
  );
}
