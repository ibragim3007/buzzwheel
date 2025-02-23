import React from "react";
import { Pressable, PressableProps } from "react-native-gesture-handler";
import { useTheme } from "../../hooks/useTheme";
import { normalizedSize } from "../../utils/size";

interface WrapIconInPressableProps extends PressableProps {
  primaryColor?: string;
  backgroundColor?: string;
}

export default function WrapIconInPressable({
  primaryColor,
  backgroundColor,
  ...props
}: WrapIconInPressableProps) {
  return (
    <Pressable
      {...props}
      style={{
        padding: normalizedSize(7),
        backgroundColor: backgroundColor || "transparent",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: primaryColor || "#ffffff17",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
}
