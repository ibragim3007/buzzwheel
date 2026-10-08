import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/src/shared/ui/buttons/Button';
import { navigate } from 'expo-router/build/global-state/routing';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { resolvePaywallPlans } from './helpers/paywallPlans';

export default function PaywallBlock() {
  const colors = useTheme();
  const { offering } = usePurchases();
  const { t } = useTranslation();

  // Берём именно недельный план: текст ниже говорит «в неделю»
  const weeklyPlan = useMemo(() => resolvePaywallPlans(offering).find(p => p.id === 'weekly') ?? null, [offering]);

  const onOpenPaywall = () => {
    navigate('/screens/paywall');
  };

  const priceText = weeklyPlan
    ? weeklyPlan.trialDays > 0
      ? t('paywall.day-trial-then', { days: weeklyPlan.trialDays, price: weeklyPlan.pkg.product.priceString })
      : t('paywall.price-per-week', { price: weeklyPlan.pkg.product.priceString })
    : null;

  return (
    <Grid space="md" align="center">
      {!!priceText && <Typography weight="light">{priceText}</Typography>}
      <Button
        gradientColors={[colors.accent.tertiary, colors.accent.secondary]}
        title={t('paywall.open-modes')}
        onPress={onOpenPaywall}
      />
    </Grid>
  );
}
