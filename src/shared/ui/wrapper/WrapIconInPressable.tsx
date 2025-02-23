import React from "react";
import { Pressable, PressableProps } from "react-native-gesture-handler";
import { useTheme } from "../../hooks/useTheme";
import { normalizedSize } from "../../utils/size";

interface WrapIconInPressableProps extends PressableProps {
  primaryColor?: string;
}

export default function WrapIconInPressable({
  primaryColor,
  ...props
}: WrapIconInPressableProps) {
  const colors = useTheme();
  return (
    <Pressable
      {...props}
      style={{
        padding: normalizedSize(7),
        // backgroundColor: colors.background.secondary,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: primaryColor || "#ffffff17",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
}
