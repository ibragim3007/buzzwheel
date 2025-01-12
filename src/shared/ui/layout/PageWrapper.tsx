import React from "react";
import { useTheme } from "../../hooks/useTheme";
import Grid, { GridProps } from "../grid/Grid";

interface PageWrapper extends GridProps {}

export default function PageWrapper({ ...props }: PageWrapper) {
  const colors = useTheme();
  return (
    <Grid {...props} style={{ backgroundColor: colors.background.primary }} />
  );
}
