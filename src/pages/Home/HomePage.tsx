import { AddPlayers } from '@/src/module/AddPlayers';
import { withOpacity } from '@/src/module/Paywall/helpers/withOpacity';
import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid from '@/src/shared/ui/grid/Grid';
import PageWrapper from '@/src/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/src/shared/ui/layout/SafeWrapper';
import { isTablet } from '@/src/shared/utils/size';
import Header from '@/src/widget/Header';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomePage() {
  const colors = useTheme();

  return (
    <PageWrapper>
      {/* Тёплое свечение сверху задаёт атмосферу вечеринки */}
      <LinearGradient
        pointerEvents="none"
        colors={[
          withOpacity(colors.accent.secondary, 0.16),
          withOpacity(colors.accent.primary, 0.08),
          withOpacity(colors.background.primary, 0),
        ]}
        locations={[0, 0.35, 1]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.3, y: 0.6 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60%' }}
      />
      <SafeWrapper style={{ backgroundColor: 'transparent' }}>
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
