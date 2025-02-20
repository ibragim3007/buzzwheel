import { RouletteOptions, SegmentType } from "@/src/entities/Roulette/types";
import Grid from "@/src/shared/ui/grid/Grid";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Svg, { Circle, ClipPath, Defs, G, Mask, Rect } from "react-native-svg";
import CenterCircle from "./CenterCircle/CenterCircle";
import { useRoulette } from "./hooks/useRoulette";
import { RouletteSegment } from "./segment/RouletteSegment";
import { useTheme } from "@/src/shared/hooks/useTheme";
import Button from "@/src/shared/ui/buttons/Button";
import Typography from "@/src/shared/ui/typography/Typography";
import { Player } from "@/src/shared/types/globalTypes";
import { normalizedSize } from "@/src/shared/utils/size";

interface RouletteProps {
  segments: SegmentType[];
  options: RouletteOptions;
  currentTurn: Player | null;
  onCallback: (winner: SegmentType) => void;
  onChangeSpinStatus?: (isSpinning: boolean) => void;
}

const Roulette = ({
  segments,
  options,
  currentTurn,
  onCallback,
  onChangeSpinStatus,
}: RouletteProps) => {
  const { TOTAL_SIZE, BORDER_WIDTH, CENTER, RADIUS, WHEEL_SIZE } = options;
  const { isSpinning, winner, animatedStyle, cursorAnimatedStyle, spinWheel } =
    useRoulette(segments, onCallback);

  useEffect(() => {
    if (onChangeSpinStatus) onChangeSpinStatus(isSpinning);
  }, [isSpinning]);

  return (
    <View style={[styles.container]}>
      {currentTurn && (
        <Animated.View entering={FadeIn}>
          <Grid>
            <Typography weight="medium" variant="title-1">
              Are you ready{" "}
              <Typography weight="bold" variant="title-1">
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
              fill={winner !== null ? "#252525" : "#eaf4ff"}
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
          </Svg>
        </Grid>
      </Animated.View>

      <Animated.View style={[styles.centerOverlay, cursorAnimatedStyle]}>
        <CenterCircle options={options} />
      </Animated.View>

      <Button
        title="Roll"
        onPress={spinWheel}
        disabled={isSpinning}
        style={[
          {
            opacity: isSpinning || currentTurn ? 0 : 1,
            top: normalizedSize(120),
            width: normalizedSize(250),
            paddingVertical: normalizedSize(20),
            shadowColor: "#FFB347",
            shadowOpacity: 0.45,
            shadowRadius: 30,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // backgroundColor: "#5e3677",
  },
  wheelContainer: {
    transform: [{ translateY: 100 }],
  },

  centerOverlay: {
    position: "absolute",
    // top: CENTER + 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default Roulette;
