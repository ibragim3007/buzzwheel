import { RouletteOptions, SegmentType } from "@/src/entities/Roulette/types";
import Grid from "@/src/shared/grid/Grid";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import Svg, { Circle, G } from "react-native-svg";
import CenterCircle from "./CenterCircle/CenterCircle";
import { useRoulette } from "./hooks/useRoulette";
import { RouletteSegment } from "./segment/RouletteSegment";

interface RouletteProps {
  segments: SegmentType[];
  options: RouletteOptions;
}

const Roulette = ({ segments, options }: RouletteProps) => {
  const { TOTAL_SIZE, BORDER_WIDTH, CENTER, RADIUS, WHEEL_SIZE } = options;

  const { isSpinning, winner, animatedStyle, cursorAnimatedStyle, spinWheel } =
    useRoulette(segments);

  return (
    <View style={styles.container}>
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
              fill={winner ? "#252525" : "#fff"}
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
          </Svg>
        </Grid>
      </Animated.View>

      <Animated.View style={[styles.centerOverlay, cursorAnimatedStyle]}>
        <CenterCircle options={options} />
      </Animated.View>

      <TouchableOpacity
        style={[{ opacity: isSpinning ? 0 : 1, top: 150 }, [styles.button]]}
        onPress={spinWheel}
        disabled={isSpinning}
      >
        <Text style={styles.buttonText}>Roll</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#5e3677",
  },
  wheelContainer: {
    transform: [{ translateY: 100 }],
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FF5722",
    borderRadius: 8,
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
