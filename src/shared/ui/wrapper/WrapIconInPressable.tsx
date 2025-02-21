import React from "react";
import { Pressable, PressableProps } from "react-native-gesture-handler";
import { useTheme } from "../../hooks/useTheme";
import { normalizedSize } from "../../utils/size";

export default function WrapIconInPressable({ ...props }: PressableProps) {
  const colors = useTheme();
  return (
    <Pressable
      style={{
        padding: normalizedSize(7),
        // backgroundColor: colors.background.secondary,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#ffffff17",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    />
  );
}
