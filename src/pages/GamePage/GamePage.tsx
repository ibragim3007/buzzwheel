import { Roulette } from "@/src/module/Roulette";
import { DefaultRouletteOptions } from "@/src/module/Roulette/config/config";
import React from "react";
import { View } from "react-native";

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

export default function GamePage() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0b0b0b",
      }}
    >
      <Roulette segments={segments} options={DefaultRouletteOptions} />
    </View>
  );
}
