import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from './ui/CloseIcon';
import HeaderLogo from './ui/HeaderLogo';
import LogoText from './ui/LogoText';
import OfferingItem from './ui/OfferingItem';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { PurchasesPackage } from 'react-native-purchases';
import { localeVars } from '@/src/locales/localeVars';
import Button from '@/src/shared/ui/buttons/Button';

export default function PaywallNew() {
  const { offering } = usePurchases();

  const { t } = useTranslation();
  const [currentProduct, setCurrentProduct] = useState(offering?.availablePackages[0]);
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  const navigate = useNavigation();
  const goBack = () => {
    if (navigate.canGoBack()) {
      navigate.goBack();
    }
  };

  const { vibrateSelection } = useVibration();

  const onPressOffering = (offering: PurchasesPackage | null) => {
    if (offering) {
      void vibrateSelection();
      setCurrentProduct(offering);
    }
  };

  const priceStringForWeekly = localeVars('Weekly', {
    price: offering?.availablePackages[1]?.product.priceString ?? 'N/A',
  });

  const priceStringForYearly = localeVars('Per Year', {
    price: `${offering?.availablePackages[0]?.product.priceString}` || 'N/A',
  });
  const priceYearForYearly = offering?.availablePackages[0]?.product.pricePerYear || 1;
  const priceYearlyForWeekly = offering?.availablePackages[1]?.product.pricePerYear || 1;
  const priceDifferenceInPercantage = 100 - Math.round((priceYearForYearly * 100) / priceYearlyForWeekly);

  const priceWeekForYearly = offering?.availablePackages[0]?.product.pricePerWeekString || 1;

  const stringDiscount = localeVars('The best deal - save {{ discount }}', {
    discount: String(priceDifferenceInPercantage + '%'),
  });

  const titleYearly = localeVars('Only {{ price }} per week', {
    price: priceWeekForYearly,
  });

  if (!currentProduct) {
    return (
      <Grid justfity="center" height="100%" align="center">
        <Typography variant="title-3" weight="bold">
          {'error.loading.paywall'}
        </Typography>
        <Button title={'go back'} onPress={goBack} />
      </Grid>
    );
  }

  return (
    <Grid space="lg" height="100%">
      <CloseIcon goBack={goBack} showCloseIcon={showCloseIcon} setShowCloseIcon={setShowCloseIcon} />
      <HeaderLogo />
      <Grid space="lg" flex={1} justfity="flex-end">
        <LogoText />
      </Grid>
      <Grid space="md">
        <OfferingItem
          bestdeal
          onPress={onPressOffering}
          currentPicked={currentProduct}
          title={titleYearly}
          description={priceStringForYearly}
          bestdealText={stringDiscount}
          offering={(offering?.availablePackages || [])[0]}
        />

        <OfferingItem
          onPress={onPressOffering}
          currentPicked={currentProduct}
          title={'Weekly title'}
          description={priceStringForWeekly}
          subtext={'Weekly subtext'}
          offering={(offering?.availablePackages || [])[2]}
        />
      </Grid>
      <Button title="Buy" />
    </Grid>
  );
}
