import Grid from "@/src/shared/ui/grid/Grid";

import { AddPlayers } from "@/src/module/AddPlayers";
import SafeWrapper from "@/src/shared/ui/layout/SafeWrapper";
import Typography from "@/src/shared/ui/typography/Typography";
import Header from "@/src/widget/Header";
import React from "react";

export default function HomePage() {
  return (
    <SafeWrapper>
      <Header />

      <Grid space="lg">
        <Grid space="sm">
          <Typography textAlign="center" weight="bold" variant="largeTitle">
            Party Game
          </Typography>
          <Typography textAlign="center" variant="headline">
            Add players to start the fun!
          </Typography>
        </Grid>

        <AddPlayers />
      </Grid>
    </SafeWrapper>
  );
}
