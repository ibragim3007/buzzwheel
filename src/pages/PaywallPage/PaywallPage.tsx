import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import { Paywall } from '@/src/module/Paywall';
import FooterActions from '@/src/module/Paywall/ui/FooterActions';
import Grid from '@/src/shared/ui/grid/Grid';
import PageWrapper from '@/src/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/src/shared/ui/layout/SafeWrapper';
import Typography from '@/src/shared/ui/typography/Typography';
import Header from '@/src/widget/Header';
import ThanksImage from '@/assets/images/paywall_icons/thanks_icon.png';
import { Image } from 'expo-image';
import Button from '@/src/shared/ui/buttons/Button';
import { navigate } from 'expo-router/build/global-state/routing';

export default function PaywallPage() {
  const { offering, isActiveSubscription, setCustomerInfo } = usePurchases();
  const onGoBack = () => {
    navigate('..');
  };

  if (isActiveSubscription) {
    return (
      <PageWrapper flex={1}>
        <SafeWrapper>
          <Header back />
          <Grid height="90%" justfity="space-between" align="center">
            <Grid gap={50} align="center" marginTop={50}>
              <Typography weight="bold" textAlign="center" variant="title-2">
                You already have an active subscription. Thank you for your support!
              </Typography>
              <Image source={ThanksImage} style={{ width: 270, height: 270 }} />
              <Button title="Go Back" onPress={onGoBack} />
            </Grid>

            <FooterActions />
          </Grid>
        </SafeWrapper>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper flex={1}>
      <SafeWrapper>
        <Paywall />
      </SafeWrapper>
    </PageWrapper>
  );
}
