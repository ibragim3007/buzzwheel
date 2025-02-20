import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useTheme } from "../../hooks/useTheme";

interface GradientShadowProps {
  height?: number;
  color?: string;
}

export default function GradientShadow({ height, color }: GradientShadowProps) {
  const colors = useTheme();
  return (
    <LinearGradient
      colors={["transparent", color || colors.background.primary]} // Цвет тени
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.3,
        height: height || 60, // Высота тени
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      }}
      pointerEvents="none"
    />
  );
}
