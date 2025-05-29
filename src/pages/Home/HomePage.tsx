import { AddPlayers } from '@/src/module/AddPlayers';
import Grid from '@/src/shared/ui/grid/Grid';
import PageWrapper from '@/src/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/src/shared/ui/layout/SafeWrapper';
import { isTablet } from '@/src/shared/utils/size';
import Header from '@/src/widget/Header';

export default function HomePage() {
  return (
    <PageWrapper>
      <SafeWrapper>
        <Grid space="sm">
          <Header />

          <Grid height={isTablet() ? '96%' : '94%'}>
            <AddPlayers />
          </Grid>
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
