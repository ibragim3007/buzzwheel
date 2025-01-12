import Typography from "@/src/shared/typography/Typography";
import { Link } from "expo-router";
import React from "react";
import Animated from "react-native-reanimated";

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
      <Typography>asd</Typography>
      <Link href="/screens/game">
        <Typography>Play</Typography>
      </Link>
    </Animated.View>
  );
}
