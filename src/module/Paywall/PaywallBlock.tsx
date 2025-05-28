import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { useEffect, useState } from 'react';
import PaywallButton from './ui/PaywallButton';

interface PaywallBlockProps {
  title: string;
}

export default function PaywallBlock() {
  const { offering } = usePurchases();
  const [currentProduct, setCurrentProduct] = useState(offering?.availablePackages[0]);

  useEffect(() => {
    setCurrentProduct(offering?.availablePackages[0]);
  }, [offering]);

  if (!currentProduct) {
    return (
      <Grid justfity="center" align="center">
        <Typography variant="title-4" weight="bold">
          Ошибка загрузки продукта
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid space="md" align="center">
      <Typography weight="light">3-Day Trial, then {currentProduct.product.priceString} per week</Typography>
      <PaywallButton title="Открыть пакеты" product={currentProduct} />
    </Grid>
  );
}
