import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import { LINKS } from '@/src/shared/config/constants/constants';
import Grid, { GridPressable } from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { Linking } from 'react-native';
import Purchases from 'react-native-purchases';

export default function FooterActions() {
  const { setCustomerInfo } = usePurchases();

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
  return (
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
  );
}
