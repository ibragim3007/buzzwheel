import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import { Image } from 'expo-image';
import AppIcon from '@/assets/images/icons_ios/icon-a.png';
import { useTranslation } from 'react-i18next';

export default function LogoText() {
  const { t } = useTranslation();
  return (
    <Grid align="center" gap={6}>
      <Image
        source={AppIcon}
        style={{
          width: normalizedSize(110),
          height: normalizedSize(110),
          borderRadius: normalizedSize(24),
        }}
      />
      <Typography
        weight="bold"
        textAlign="center"
        style={{
          fontSize: normalizedSize(40),
        }}
      >
        BuzzWheel
      </Typography>
      <Typography variant="callout" color="secondary" textAlign="center">
        {t('paywall.gateway_to_endless_fun')}
      </Typography>
    </Grid>
  );
}
