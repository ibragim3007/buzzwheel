import React from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import Typography from "../typography/Typography";
import { useTheme } from "../../hooks/useTheme";
import Grid from "../grid/Grid";

interface ButtonProps extends PressableProps {
  title: string;
  startIcon?: React.ReactNode;
}

export default function Button({ title, startIcon, ...props }: ButtonProps) {
  const colors = useTheme();

  const styles = StyleSheet.flatten([
    {
      backgroundColor: colors.accent.primary,
      paddingHorizontal: 25,
      paddingVertical: 13,
      borderRadius: 30,
    },
    props.style,
  ]);

  return (
    <Pressable {...props} style={styles}>
      <Grid row space="sm" justfity="center" align="center">
        {startIcon}
        <Typography
          variant="headline"
          textAlign="center"
          style={{ color: colors.text.primary }}
          weight="bold"
        >
          {title}
        </Typography>
      </Grid>
    </Pressable>
  );
}
