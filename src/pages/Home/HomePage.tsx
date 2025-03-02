import Grid from '@/src/shared/ui/grid/Grid';
import { usePlayerStore } from '@/src/entities/Player/player.store';
import { AddPlayers } from '@/src/module/AddPlayers';
import PageWrapper from '@/src/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/src/shared/ui/layout/SafeWrapper';
import Header from '@/src/widget/Header';
import React from 'react';

export default function HomePage() {
  const { players } = usePlayerStore();
  const asd = 'asd';
  return (
    <PageWrapper>
      <SafeWrapper>
        <Header />
        <Grid height="95%" space="lg">
          {/* <Grid space="md"></Grid> */}

          <AddPlayers />
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
