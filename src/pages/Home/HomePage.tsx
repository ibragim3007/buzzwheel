import Grid from "@/src/shared/ui/grid/Grid";

import { Link } from "expo-router";
import React from "react";
import PageWrapper from "@/src/shared/ui/layout/PageWrapper";
import SafeWrapper from "@/src/shared/ui/layout/SafeWrapper";
import Typography from "@/src/shared/ui/typography/Typography";
import { AddPlayers } from "@/src/module/AddPlayers";

export default function HomePage() {
  return (
    <PageWrapper flex={1}>
      <SafeWrapper>
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
        {/* <Link href="/screens/game">
          <Typography>Play</Typography>
        </Link> */}
      </SafeWrapper>
    </PageWrapper>
  );
}
