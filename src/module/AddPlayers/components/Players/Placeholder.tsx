import NoUserYetImage from '@/assets/images/placeholders/no_user_yet.png';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';

export default function Placeholder() {
  const { t } = useTranslation();

  return (
    <Grid style={{ opacity: 0.25 }} height={normalizedSize(300)} align="center" justfity="center">
      <Image source={NoUserYetImage as string} contentFit="contain" style={{ width: 200, height: 200 }} />

      <Typography weight="medium" textAlign="center">
        {t('homepage.no-players-placeholder')}
      </Typography>
    </Grid>
  );
}
