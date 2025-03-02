import { AddPlayers } from '@/src/module/AddPlayers';
import Grid from '@/src/shared/ui/grid/Grid';
import PageWrapper from '@/src/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/src/shared/ui/layout/SafeWrapper';
import Header from '@/src/widget/Header';

export default function HomePage() {
  return (
    <PageWrapper>
      <SafeWrapper>
        <Header />
        <Grid height="95%" space="lg">
          <AddPlayers />
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
