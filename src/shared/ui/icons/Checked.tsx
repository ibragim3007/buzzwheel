import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { useTheme } from "../../hooks/useTheme";
import Grid from "../grid/Grid";

interface CheckedProps {}

export default function Checked() {
  const colors = useTheme();
  return (
    <Grid
      style={{
        position: "absolute",
        right: 0,
        top: -5,
        borderRadius: 50,
        borderColor: colors.accent.tertiary,
      }}
      color={colors.accent.tertiary}
      padding={6}
    >
      <FontAwesome name="check" size={22} color={colors.text.primary} />
    </Grid>
  );
}
