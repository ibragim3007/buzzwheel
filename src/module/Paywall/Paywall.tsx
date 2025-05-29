import LoadingAnimation from '@/assets/lottie/loading_animation.json';
import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import Ionicons from '@expo/vector-icons/Ionicons';
import { navigate } from 'expo-router/build/global-state/routing';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { getWeeklyPurchaseCount } from './helpers/generatePeopleNumber';
import FooterActions from './ui/FooterActions';
import HeaderLogo from './ui/HeaderLogo';
import PaywallButton from './ui/PaywallButton';
import PaywallItems from './ui/PaywallItems';
import Button from '@/src/shared/ui/buttons/Button';
import { Trans, useTranslation } from 'react-i18next';
import { HORIZONTAL_PADDINGS } from '@/src/shared/config/constants/constants';

export default function Paywall() {
  const { offering } = usePurchases();
  const { t } = useTranslation();
  const [currentProduct, setCurrentProduct] = useState(offering?.availablePackages[0]);

  const [showCloseIcon, setShowCloseIcon] = useState(false);

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
          {t('paywall.error-to-load-product')}
        </Typography>
        <Button title="Go back" onPress={goBack} />
      </Grid>
    );
  }

  return (
    <Grid justfity="space-between" height="100%" paddingHorizontal={HORIZONTAL_PADDINGS / 2}>
      <Grid space="md">
        <Grid style={{ position: 'absolute' }}>
          {showCloseIcon ? (
            <Pressable onPress={goBack} hitSlop={10}>
              <Ionicons name="close" size={24} color={colors.text.primary} />
            </Pressable>
          ) : (
            <LottieView
              resizeMode="cover"
              source={LoadingAnimation}
              autoPlay
              loop={false}
              speed={1.2}
              style={{ width: 25, height: 25, position: 'absolute' }}
              onAnimationFinish={() => setShowCloseIcon(true)}
            />
          )}
        </Grid>
        <HeaderLogo />
        <Grid>
          <Typography textAlign="center" weight="bold">
            <Trans
              i18nKey="paywall.vip_status_message"
              values={{ count: getWeeklyPurchaseCount() }}
              components={{
                bold: <Typography weight="bold" textAlign="center" variant="title-4" />,
                accent: <Typography weight="bold" color="secondary-accent" textAlign="center" variant="title-4" />,
              }}
            />
          </Typography>
        </Grid>
      </Grid>
      <PaywallItems />
      <Grid space="lg" align="center" width="100%">
        <Typography textAlign="center" weight="light">
          {t('paywall.day-trial-then', { price: currentProduct.product.priceString })}
        </Typography>
        <PaywallButton title={t('paywall.button-text-play-for-free')} product={currentProduct} />
        <Grid space="sm" align="center">
          <FooterActions />
        </Grid>
      </Grid>
    </Grid>
  );
}
