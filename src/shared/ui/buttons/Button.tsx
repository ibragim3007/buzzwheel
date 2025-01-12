import React from "react";
import { Pressable, PressableProps } from "react-native";
import Typography from "../typography/Typography";
import { useTheme } from "../../hooks/useTheme";

interface ButtonProps extends PressableProps {
  title: string;
}

export default function Button({ title, ...props }: ButtonProps) {
  const colors = useTheme();
  return (
    <Pressable
      style={{
        backgroundColor: colors.accent.primary,

        paddingHorizontal: 25,
        paddingVertical: 13,
        borderRadius: 7,
      }}
      {...props}
    >
      <Typography
        variant="headline"
        textAlign="center"
        style={{ color: "#fff" }}
        weight="medium"
      >
        {title}
      </Typography>
    </Pressable>
  );
}
