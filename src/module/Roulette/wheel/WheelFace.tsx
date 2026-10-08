import { SegmentType } from '@/src/entities/Roulette/types';
import { memo, useMemo } from 'react';
import Svg, { Circle, G, Line, Path, Text as SvgText } from 'react-native-svg';
import { fitLabel, polar, WheelMetrics, wedgePath } from '../helpers/wheelGeometry';

const ALL_LABEL_COLOR = '#FFD66B';

interface WheelFaceProps {
  segments: SegmentType[];
  metrics: WheelMetrics;
}

/** Вращающаяся часть колеса: секторы, подписи и гвоздики на ободе. */
function WheelFace({ segments, metrics }: WheelFaceProps) {
  const { size, center, segmentRadius, hubRadius, pegOrbit, pegRadius, radius } = metrics;
  const count = segments.length;
  const step = 360 / count;

  const labels = useMemo(() => {
    const dotRadius = Math.max(3, radius * 0.028);
    const maxFont = radius * 0.125;
    const minFont = Math.max(10, radius * 0.07);

    return segments.map((segment, index) => {
      const mid = index * step + step / 2;
      const hasDot = segment.type === 'player' && !!segment.textColor;
      const dotR = segmentRadius - radius * 0.07;
      const outerR = hasDot ? dotR - dotRadius * 2.4 : segmentRadius - radius * 0.07;
      const label = segment.type === 'all' ? segment.label.toUpperCase() : segment.label;
      const { text, fontSize } = fitLabel(label, count, outerR, hubRadius * 1.3, maxFont, minFont);

      // Правая половина читается от центра к краю, левая — от края к центру,
      // чтобы в исходном положении ни одна подпись не была вверх ногами.
      const isLeft = mid > 180;
      const anchor = polar(center, outerR, mid);
      const dot = polar(center, dotR, mid);

      return {
        key: index,
        text,
        fontSize,
        anchor,
        rotation: isLeft ? mid + 90 : mid - 90,
        textAnchor: isLeft ? ('start' as const) : ('end' as const),
        color: segment.type === 'all' ? ALL_LABEL_COLOR : '#FFFFFF',
        dot: hasDot ? { ...dot, r: dotRadius, color: segment.textColor ?? '#FFFFFF' } : null,
      };
    });
  }, [segments, count, step, center, segmentRadius, hubRadius, radius]);

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((segment, index) => (
        <Path
          key={`s-${index}`}
          d={wedgePath(center, segmentRadius, index * step, (index + 1) * step)}
          fill={segment.color}
        />
      ))}

      {segments.map((_, index) => {
        const from = polar(center, hubRadius, index * step);
        const to = polar(center, segmentRadius, index * step);
        return (
          <Line
            key={`l-${index}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#FFFFFF"
            strokeOpacity={0.14}
            strokeWidth={1.5}
          />
        );
      })}

      {labels.map(label => (
        <G
          key={`t-${label.key}`}
          transform={`translate(${label.anchor.x} ${label.anchor.y}) rotate(${label.rotation})`}
        >
          <SvgText
            x={0}
            y={label.fontSize * 0.36}
            fill={label.color}
            fontSize={label.fontSize}
            fontFamily="Manrope_700Bold"
            fontWeight="bold"
            textAnchor={label.textAnchor}
          >
            {label.text}
          </SvgText>
        </G>
      ))}

      {labels.map(label =>
        label.dot ? (
          <Circle
            key={`d-${label.key}`}
            cx={label.dot.x}
            cy={label.dot.y}
            r={label.dot.r}
            fill={label.dot.color}
            stroke="#FFFFFF"
            strokeWidth={1.5}
          />
        ) : null,
      )}

      {segments.map((_, index) => {
        const peg = polar(center, pegOrbit, index * step);
        return (
          <Circle
            key={`p-${index}`}
            cx={peg.x}
            cy={peg.y}
            r={pegRadius}
            fill="#FFF8E6"
            stroke="#000000"
            strokeOpacity={0.25}
            strokeWidth={1}
          />
        );
      })}
    </Svg>
  );
}

export default memo(WheelFace);
