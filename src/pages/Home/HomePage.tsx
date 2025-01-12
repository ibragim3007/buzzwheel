import React from "react";
import Animated from "react-native-reanimated";
import { DefaultRouletteOptions } from "@/src/module/Roulette/config/config";
import { Roulette } from "@/src/module/Roulette";

const segments = [
  { label: "Player 1", color: "#3d7a3d" },
  { label: "Player 2", color: "#39b844" },
  { label: "Player 3", color: "#3d7a3d" },
  { label: "Player 4", color: "#39b844" },
  { label: "Player 5", color: "#3d7a3d" },
  { label: "Player 6", color: "#39b844" },
  { label: "Player 7", color: "#3d7a3d" },
  { label: "Player 8", color: "#39b844" },
];

export default function HomePage() {
  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0b0b0b",
      }}
    >
      <Roulette segments={segments} options={DefaultRouletteOptions} />
    </Animated.View>
  );
}
