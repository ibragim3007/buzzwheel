import { RouletteOptions, SegmentType } from "@/src/entities/Roulette/types";
import { useRoulette } from "@/src/module/Roulette/hooks/useRoulette";

import { Player } from "@/src/shared/types/globalTypes";
import Grid from "@/src/shared/ui/grid/Grid";
import Typography from "@/src/shared/ui/typography/Typography";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Svg, { Circle, Defs, G, Mask, Polygon, Rect } from "react-native-svg";

import { RouletteSegment } from "./RouletteSegment";
import CenterCircle from "./CenterCircle";

interface RouletteProps {
  segments: SegmentType[];
  options: RouletteOptions;
  currentTurn: Player | null;

  onCallback: (winner: SegmentType) => void;
  onChangeSpinStatus?: (isSpinning: boolean) => void;
}

export type RouletteRef = {
  spinRoulette: () => void;
};

const Roulette = forwardRef<RouletteRef, RouletteProps>(
  ({ segments, options, currentTurn, onCallback, onChangeSpinStatus }, ref) => {
    const {
      TOTAL_SIZE,
      BORDER_WIDTH,
      CENTER,
      RADIUS,
      WHEEL_SIZE,
      BORDER_COLOR,
    } = options;

    const {
      isSpinning,
      winner,
      animatedStyle,
      cursorAnimatedStyle,
      spinWheel,
    } = useRoulette(segments, onCallback);

    useEffect(() => {
      if (onChangeSpinStatus) onChangeSpinStatus(isSpinning);
    }, [isSpinning]);

    useImperativeHandle(ref, () => ({
      spinRoulette: () => {
        spinWheel();
      },
    }));

    return (
      <View style={[styles.container]}>
        {currentTurn && (
          <Animated.View entering={FadeIn}>
            <Grid>
              <Typography weight="medium" variant="title-1">
                Are you ready{" "}
                <Typography
                  style={{ color: currentTurn.color || "#fff" }}
                  weight="bold"
                  variant="title-1"
                >
                  {currentTurn?.name}
                </Typography>
                ?
              </Typography>
            </Grid>
          </Animated.View>
        )}

        <Animated.View
          style={[
            { height: WHEEL_SIZE, width: WHEEL_SIZE },
            styles.wheelContainer,
            animatedStyle,
          ]}
        >
          <Grid>
            <Svg
              width={TOTAL_SIZE}
              height={TOTAL_SIZE}
              viewBox={`-${BORDER_WIDTH} -${BORDER_WIDTH} ${
                TOTAL_SIZE + BORDER_WIDTH * 2
              } ${TOTAL_SIZE + BORDER_WIDTH * 2}`}
            >
              <Circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS + BORDER_WIDTH / 2}
                fill={winner !== null ? "#252525" : BORDER_COLOR || "#eaf4ff"}
              />

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
                      winner={winner}
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
                    r={CENTER - 15} // Радиус выреза
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

              <Polygon
                points={`${CENTER},${CENTER - RADIUS} ${CENTER},${
                  CENTER - RADIUS
                } ${CENTER},${CENTER - RADIUS * 0.9}`}
                fill="#ffffff"
              />
            </Svg>
          </Grid>
        </Animated.View>

        <Animated.View style={[cursorAnimatedStyle]}>
          <Grid
            width={60}
            height={60}
            color="blue"
            align="center"
            justfity="center"
            style={{ borderRadius: 50, top: "-50%", left: "40%" }}
          >
            <Grid
              color="#fff"
              width={30}
              height={30}
              style={{ borderRadius: 30 }}
            />
          </Grid>
          {/* <CenterCircle options={options} /> */}
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    width: "100%",
    position: "relative",
    // backgroundColor: "#5e3677",
  },
  wheelContainer: {
    transform: [{ translateY: 100 }],
  },

  centerOverlay: {
    // position: "absolute",
    // top: 145,
    // left: "42.5%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default Roulette;
