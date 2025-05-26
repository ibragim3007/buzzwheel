import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid, { GridPressable } from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import Ionicons from '@expo/vector-icons/Ionicons';
import { navigate } from 'expo-router/build/global-state/routing';
import { Linking, Pressable } from 'react-native';
import HeaderLogo from './ui/HeaderLogo';
import PaywallButton from './ui/PaywallButton';
import PaywallItems from './ui/PaywallItems';
import { getWeeklyPurchaseCount } from './helpers/generatePeopleNumber';
import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import LoadingAnimation from '@/assets/lottie/loading_animation.json';
import { LINKS } from '@/src/shared/config/constants/constants';
import Purchases from 'react-native-purchases';

export default function Paywall() {
  const { offering, setCustomerInfo } = usePurchases();
  const [currentProduct, setCurrentProduct] = useState(offering?.availablePackages[0]);

  const [showCloseIcon, setShowCloseIcon] = useState(false);

  useEffect(() => {
    setCurrentProduct(offering?.availablePackages[0]);
  }, [offering]);

  const colors = useTheme();
  const goBack = () => {
    navigate('..');
  };

  const onPressTerms = async () => {
    if (await Linking.canOpenURL(LINKS.termsOfUse)) {
      Linking.openURL(LINKS.termsOfUse);
    }
  };

  const onPressPrivacy = async () => {
    if (await Linking.canOpenURL(LINKS.eula)) {
      Linking.openURL(LINKS.eula);
    }
  };

  const restorePurchases = async () => {
    try {
      const res = await Purchases.restorePurchases();
      setCustomerInfo(res);
    } catch (e) {
      console.log(e);
    }
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
            <GridPressable onPress={onPressTerms}>
              <Typography color="disabled" variant="caption-1">
                Terms of Use
              </Typography>
            </GridPressable>
            <GridPressable>
              <Typography onPress={restorePurchases} color="disabled" variant="footnote">
                Restore
              </Typography>
            </GridPressable>
            <GridPressable>
              <Typography onPress={onPressPrivacy} color="disabled" variant="caption-1">
                Privacy & Policy
              </Typography>
            </GridPressable>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
