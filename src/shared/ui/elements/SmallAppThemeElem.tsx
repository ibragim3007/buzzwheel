import React from "react";
import Grid from "../grid/Grid";
import { PalitraInterface } from "../../config/theme/theme";

interface SmallAppThemeElemProps {
  theme: PalitraInterface;
}

export default function SmallAppThemeElem({ theme }: SmallAppThemeElemProps) {
  return (
    <Grid
      width={65}
      height={100}
      color={theme.background.primary}
      justfity="space-between"
      paddingHorizontal={10}
      paddingVertical={10}
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.accent.primary,
      }}
    >
      <Grid
        width="100%"
        height={10}
        color={theme.accent.primary}
        style={{ borderRadius: 10 }}
      />
      <Grid
        width="100%"
        height={40}
        color={theme.background.secondary}
        paddingVertical={5}
        paddingHorizontal={5}
      >
        <Grid
          width="80%"
          height={10}
          color={theme.accent.secondary}
          style={{ borderRadius: 10 }}
        />
      </Grid>

      <Grid
        width="100%"
        height={15}
        color={theme.accent.primary}
        style={{ borderRadius: 10 }}
      />
    </Grid>
  );
}
