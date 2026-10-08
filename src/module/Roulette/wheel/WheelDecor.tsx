import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, RadialGradient, Stop } from 'react-native-svg';
import { circlePath, shadeColor, WheelMetrics, wedgePath } from '../helpers/wheelGeometry';

interface DecorProps {
  metrics: WheelMetrics;
  rimColor: string;
}

/** Неподвижный обод под колесом: свет сверху, тень снизу — не крутится вместе с колесом. */
export const WheelRim = memo(({ metrics, rimColor }: DecorProps) => {
  const { size, center, radius, segmentRadius } = metrics;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View
        style={[
          styles.glow,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: shadeColor(rimColor, -0.5),
            shadowColor: rimColor,
          },
        ]}
      />
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="wheelRim" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={shadeColor(rimColor, 0.45)} />
            <Stop offset="0.45" stopColor={rimColor} />
            <Stop offset="1" stopColor={shadeColor(rimColor, -0.4)} />
          </LinearGradient>
        </Defs>
        <Circle cx={center} cy={center} r={radius} fill="url(#wheelRim)" />
        <Circle cx={center} cy={center} r={radius - 1} fill="none" stroke="#FFFFFF" strokeOpacity={0.35} />
        <Circle cx={center} cy={center} r={segmentRadius + 1} fill="#000000" fillOpacity={0.45} />
      </Svg>
    </View>
  );
});

/** Неподвижный блик и виньетка поверх секторов — придают колесу объём. */
export const WheelGloss = memo(({ metrics }: Pick<DecorProps, 'metrics'>) => {
  const { size, center, segmentRadius } = metrics;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id="wheelVignette" cx={center} cy={center} r={segmentRadius} gradientUnits="userSpaceOnUse">
            <Stop offset="0.5" stopColor="#000000" stopOpacity={0} />
            <Stop offset="1" stopColor="#000000" stopOpacity={0.38} />
          </RadialGradient>
          <LinearGradient id="wheelSheen" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.2} />
            <Stop offset="0.5" stopColor="#FFFFFF" stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Circle cx={center} cy={center} r={segmentRadius} fill="url(#wheelVignette)" />
        <Circle cx={center} cy={center} r={segmentRadius} fill="url(#wheelSheen)" />
      </Svg>
    </View>
  );
});

interface HighlightProps {
  metrics: WheelMetrics;
  index: number;
  count: number;
  color: string;
}

/** Затемняет все секторы, кроме выигравшего, и обводит его. Крутится вместе с колесом. */
export const WinnerHighlight = memo(({ metrics, index, count, color }: HighlightProps) => {
  const { size, center, segmentRadius } = metrics;
  const step = 360 / count;
  const wedge = wedgePath(center, segmentRadius, index * step, (index + 1) * step);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width={size} height={size}>
        <Path d={`${circlePath(center, segmentRadius)} ${wedge}`} fill="#000000" fillOpacity={0.6} fillRule="evenodd" />
        <Path d={wedge} fill="none" stroke={color} strokeOpacity={0.45} strokeWidth={10} strokeLinejoin="round" />
        <Path d={wedge} fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinejoin="round" />
      </Svg>
    </View>
  );
});

const styles = StyleSheet.create({
  glow: {
    position: 'absolute',
    shadowOpacity: 0.55,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
});
