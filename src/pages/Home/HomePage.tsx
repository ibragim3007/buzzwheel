import Typography from "@/src/shared/typography/Typography";
import React from "react";
import Animated from "react-native-reanimated";
import Roulette from "./Roulette";

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
      <Roulette />
    </Animated.View>
  );
}
