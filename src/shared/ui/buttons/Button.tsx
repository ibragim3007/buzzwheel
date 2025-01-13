import React from "react";
import { Pressable, PressableProps } from "react-native";
import Typography from "../typography/Typography";
import { useTheme } from "../../hooks/useTheme";
import Grid from "../grid/Grid";

interface ButtonProps extends PressableProps {
  title: string;
  startIcon?: React.ReactNode;
}

export default function Button({ title, startIcon, ...props }: ButtonProps) {
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
      <Grid row space="sm" justfity="center" align="center">
        {startIcon}
        <Typography
          variant="headline"
          textAlign="center"
          style={{ color: "#fff" }}
          weight="medium"
        >
          {title}
        </Typography>
      </Grid>
    </Pressable>
  );
}
