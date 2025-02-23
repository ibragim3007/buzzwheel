import Grid from "@/src/shared/ui/grid/Grid";

import { AddPlayers } from "@/src/module/AddPlayers";
import SafeWrapper from "@/src/shared/ui/layout/SafeWrapper";
import Typography from "@/src/shared/ui/typography/Typography";
import Header from "@/src/widget/Header";
import React from "react";
import { usePlayerStore } from "@/src/entities/Player/player.store";
import { MAX_PLAYERS_FOR_FREE } from "@/src/shared/config/constants/constants";
import PageWrapper from "@/src/shared/ui/layout/PageWrapper";

export default function HomePage() {
  const { players } = usePlayerStore();
  return (
    <PageWrapper>
      <SafeWrapper>
        <Header />
        <Grid height="95%" space="lg">
          <Grid space="md"></Grid>

          <AddPlayers />
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
