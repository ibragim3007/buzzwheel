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
import { useTranslation } from 'react-i18next';
import PaywallNew from '@/src/module/Paywall/PaywallNew';

export default function PaywallPage() {
  const { t } = useTranslation();
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
                {t('paywall.alread-sub-message')}
              </Typography>
              <Image source={ThanksImage} style={{ width: 270, height: 270 }} />
              <Button title={t('paywall.go-back')} onPress={onGoBack} />
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
        <PaywallNew />
        {/* <Paywall /> */}
      </SafeWrapper>
    </PageWrapper>
  );
}
