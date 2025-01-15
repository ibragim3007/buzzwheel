import React from "react";
import Grid, { GridProps } from "../grid/Grid";
import { useTheme } from "../../hooks/useTheme";

interface PaperProps extends GridProps {}

export default function Paper({ ...props }: PaperProps) {
  const colors = useTheme();
  return (
    <Grid
      {...props}
      style={{
        padding: 16,
        borderRadius: 30,
        backgroundColor: colors.background.secondary,
      }}
    />
  );
}
