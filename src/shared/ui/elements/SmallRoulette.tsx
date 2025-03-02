import { RouletteOptions, SegmentType } from '@/src/entities/Roulette/types';
import { RouletteSegment } from '@/src/module/Roulette/segment/RouletteSegment';
import Grid from '@/src/shared/ui/grid/Grid';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, Mask, Rect } from 'react-native-svg';

interface SmallRouletteProps {
  segments: SegmentType[];
  options: RouletteOptions;
}

const SmallRoulette = ({ segments, options }: SmallRouletteProps) => {
  const { TOTAL_SIZE, BORDER_WIDTH, CENTER, RADIUS } = options;

  return (
    <View style={[styles.container]}>
      <Grid>
        <Svg
          width={TOTAL_SIZE}
          height={TOTAL_SIZE}
          // viewBox={`-${0} -${BORDER_WIDTH + 10} ${
          //   TOTAL_SIZE + BORDER_WIDTH * 2
          // } ${TOTAL_SIZE + BORDER_WIDTH * 2}`}
        >
          <Circle cx={CENTER} cy={CENTER} r={RADIUS + BORDER_WIDTH / 2} fill={'#eaf4ff'} />
          {/* Рулетка */}
          <G rotation={-90} origin={`${CENTER}, ${CENTER}`}>
            {segments.map((segment, index) => {
              const startAngle = (index * 360) / segments.length;
              const endAngle = ((index + 1) * 360) / segments.length;
              return (
                <RouletteSegment
                  key={index}
                  segment={segment}
                  startAngle={startAngle}
                  endAngle={endAngle}
                  winner={null}
                  index={index}
                  options={options}
                />
              );
            })}
          </G>

          <Defs>
            <Mask id="holeMask">
              <Rect width={TOTAL_SIZE} height={TOTAL_SIZE} fill="white" />
              {/* Вырезаем центр */}
              <Circle
                cx={CENTER}
                cy={CENTER}
                r={CENTER - 20} // Радиус выреза
                fill="black"
              />
            </Mask>
          </Defs>

          {/* Тень с вырезом */}
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS} // Радиус тени
            fill="black"
            opacity={0.25}
            mask="url(#holeMask)" // Применяем маску
          />
        </Svg>
      </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // width: "100%",
    height: 105,
    width: 105,
    // backgroundColor: "#5e3677",
  },
  wheelContainer: {
    backgroundColor: 'red',
  },

  centerOverlay: {
    position: 'absolute',
    // top: CENTER + 10,
  },
});
export default SmallRoulette;
