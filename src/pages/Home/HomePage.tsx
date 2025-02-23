import Grid from "@/src/shared/ui/grid/Grid";

import { AddPlayers } from "@/src/module/AddPlayers";
import SafeWrapper from "@/src/shared/ui/layout/SafeWrapper";
import Typography from "@/src/shared/ui/typography/Typography";
import Header from "@/src/widget/Header";
import React from "react";
import { usePlayerStore } from "@/src/entities/Player/player.store";
import { MAX_PLAYERS_FOR_FREE } from "@/src/shared/config/constants/constants";

export default function HomePage() {
  const { players } = usePlayerStore();
  return (
    <SafeWrapper>
      <Header />
      <Grid space="lg">
        <Grid space="sm">
          <Typography textAlign="center" weight="bold" variant="largeTitle">
            Party Game
          </Typography>
          <Typography textAlign="center" variant="headline">
            {players.length > 0
              ? `${players.length}/${MAX_PLAYERS_FOR_FREE} players`
              : "Add players to start the fun!"}
          </Typography>
        </Grid>

        <AddPlayers />
      </Grid>
    </SafeWrapper>
  );
}
