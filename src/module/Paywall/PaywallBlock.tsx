import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { useEffect, useState } from 'react';
import PaywallButton from './ui/PaywallButton';
import { useTranslation } from 'react-i18next';

interface PaywallBlockProps {
  title: string;
}

export default function PaywallBlock() {
  const { offering } = usePurchases();
  const { t } = useTranslation();
  const [currentProduct, setCurrentProduct] = useState(offering?.availablePackages[0]);

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
      <PaywallButton title={t('paywall.open-modes')} product={currentProduct} />
    </Grid>
  );
}
