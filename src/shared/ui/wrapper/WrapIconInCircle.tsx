import React from "react";
import { Pressable, PressableProps } from "react-native";
import { useTheme } from "../../hooks/useTheme";

export default function WrapIconInCircle({ ...props }: PressableProps) {
  const colors = useTheme();
  return (
    <Pressable
      style={{
        borderWidth: 3,
        borderRadius: 100,
        padding: 4,
        width: 60,
        height: 60,
        borderColor: colors.accent.primary,
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    />
  );
}
