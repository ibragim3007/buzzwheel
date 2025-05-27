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

export default function Paywall() {
  const { offering } = usePurchases();
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
          Ошибка загрузки продукта
        </Typography>
        <Button title="Go back" onPress={goBack} />
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
          <FooterActions />
        </Grid>
      </Grid>
    </Grid>
  );
}
