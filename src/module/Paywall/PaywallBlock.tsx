import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/src/shared/ui/buttons/Button';
import { navigate } from 'expo-router/build/global-state/routing';
import { useTheme } from '@/src/shared/hooks/useTheme';

export default function PaywallBlock() {
  const colors = useTheme();
  const { offering } = usePurchases();
  const { t } = useTranslation();
  const [currentProduct, setCurrentProduct] = useState(offering?.availablePackages[0]);

  const onOpenPaywall = () => {
    navigate('/screens/paywall');
  };

  useEffect(() => {
    setCurrentProduct(offering?.availablePackages[0]);
  }, [offering]);

  if (!currentProduct) {
    return (
      <Grid justfity="center" align="center">
        <Typography variant="title-4" weight="bold">
          {t('paywall.error-to-load-product')}
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid space="md" align="center">
      <Typography weight="light">
        {t('paywall.day-trial-then', { price: currentProduct.product.priceString })}
      </Typography>
      <Button
        gradientColors={[colors.accent.tertiary, colors.accent.secondary]}
        title={t('paywall.open-modes')}
        onPress={onOpenPaywall}
      />
    </Grid>
  );
}
