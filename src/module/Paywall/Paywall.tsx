import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid, { GridPressable } from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import Ionicons from '@expo/vector-icons/Ionicons';
import { navigate } from 'expo-router/build/global-state/routing';
import { Pressable } from 'react-native';
import HeaderLogo from './ui/HeaderLogo';
import PaywallButton from './ui/PaywallButton';
import PaywallItems from './ui/PaywallItems';
import { getWeeklyPurchaseCount } from './helpers/generatePeopleNumber';
import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import { useEffect, useState } from 'react';

export default function Paywall() {
  const { offering } = usePurchases();
  const [currentProduct, setCurrentProduct] = useState(offering?.availablePackages[0]);

  const [showCloseIcon, setShowCloseIcon] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowCloseIcon(true);
    }, 3000);
  }, []);

  useEffect(() => {
    setCurrentProduct(offering?.availablePackages[0]);
  }, [offering]);

  const colors = useTheme();
  const goBack = () => {
    navigate('..');
  };

  if (!currentProduct) {
    return (
      <Grid justfity="center" height="100%" align="center">
        <Typography variant="title-4" weight="bold">
          Ошибка загрузки продукта
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid justfity="space-between" height="100%">
      <Grid space="md">
        {showCloseIcon && (
          <Pressable style={{ position: 'absolute' }} onPress={goBack} hitSlop={10}>
            <Ionicons name="close" size={24} color={colors.text.primary} />
          </Pressable>
        )}
        <HeaderLogo />
        <Grid>
          <Typography weight="bold" textAlign="center" variant="title-4">
            Уже{' '}
            <Typography weight="bold" color="secondary-accent" textAlign="center" variant="title-4">
              {getWeeklyPurchaseCount()}
            </Typography>{' '}
            играют в статусе VIP
          </Typography>
          <Typography weight="bold" textAlign="center" variant="title-4">
            Вы с нами?
          </Typography>
        </Grid>
      </Grid>
      <PaywallItems />
      <Grid space="lg" align="center" width="100%">
        <Typography weight="light">3-Day Trial, then {currentProduct.product.priceString} per week</Typography>
        <PaywallButton product={currentProduct} />
        <Grid space="sm" align="center">
          <Grid align="center" row space="lg">
            <GridPressable>
              <Typography color="disabled" variant="caption-1">
                Terms of Use
              </Typography>
            </GridPressable>
            <GridPressable>
              <Typography color="disabled" variant="footnote">
                Restore
              </Typography>
            </GridPressable>
            <GridPressable>
              <Typography color="disabled" variant="caption-1">
                Privacy & Policy
              </Typography>
            </GridPressable>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
