import { AddPlayers } from '@/src/module/AddPlayers';
import Grid from '@/src/shared/ui/grid/Grid';
import PageWrapper from '@/src/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/src/shared/ui/layout/SafeWrapper';
import Typography from '@/src/shared/ui/typography/Typography';
import Header from '@/src/widget/Header';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <PageWrapper>
      <SafeWrapper>
        <Grid space="sm">
          <Header />
          <Typography>{t('hello')}</Typography>
          <Grid height="95%">
            <AddPlayers />
          </Grid>
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
