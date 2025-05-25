import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import { AddPlayers } from '@/src/module/AddPlayers';
import Grid from '@/src/shared/ui/grid/Grid';
import PageWrapper from '@/src/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/src/shared/ui/layout/SafeWrapper';
import Header from '@/src/widget/Header';

export default function HomePage() {
  const { customerInfo } = usePurchases();

  console.log(customerInfo?.entitlements.active);
  return (
    <PageWrapper>
      <SafeWrapper>
        <Grid space="sm">
          <Header />
          <Grid height="95%">
            <AddPlayers />
          </Grid>
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
