import { RouletteOptions, SegmentType } from '@/src/entities/Roulette/types';
import { normalizedSize } from '@/src/shared/utils/size';
import { Path, Text as SvgText } from 'react-native-svg';
import { calculateCoordinates } from '../helpers/calculateCoordinates';

interface RouletteSegmentInterface {
  segment: SegmentType;
  startAngle: number;
  endAngle: number;
  winner: number | null;
  index: number;
  options: RouletteOptions;
}

export const RouletteSegment = ({
  segment,
  startAngle,
  endAngle,
  winner,
  index,
  options,
}: RouletteSegmentInterface) => {
  const { RADIUS, TEXT_RADIUS, CENTER } = options;
  const { x: x1, y: y1 } = calculateCoordinates(RADIUS, startAngle, options);
  const { x: x2, y: y2 } = calculateCoordinates(RADIUS, endAngle, options);
  const textPosition = calculateCoordinates(TEXT_RADIUS, (startAngle + endAngle) / 2, options);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  const pathData = `M${CENTER},${CENTER} L${x1},${y1} A${RADIUS},${RADIUS} 0 ${largeArcFlag},1 ${x2},${y2} Z`;

  const picked = winner === index;

  // Угол для выравнивания текста по центру сегмента
  const textRotation = (startAngle + endAngle) / 2;

  return (
    <>
      <Path
        d={pathData}
        stroke={picked ? '#fff' : 'none'}
        strokeWidth={picked ? 10 : 0}
        strokeDashoffset={18}
        strokeDasharray={16}
        strokeLinejoin="round"
        fill={segment.color}
        opacity={winner !== null && !picked ? 0.1 : 1}
      />
      <SvgText
        fill={segment.textColor ? segment.textColor : '#fff'}
        fontWeight="bold"
        fontSize={normalizedSize(25)}
        x={textPosition.x - 5}
        y={textPosition.y + 8}
        textAnchor="middle"
        opacity={winner !== null && !picked ? 0.1 : 1}
        transform={`rotate(${textRotation}, ${textPosition.x}, ${textPosition.y})`}
        textLength={RADIUS * 0.8} // Adjust this value as needed
        lengthAdjust="spacingAndGlyphs"
      >
        {segment.label.length > 8 ? segment.label.slice(0, 8) + '...' : segment.label}
      </SvgText>
    </>
  );
};
