import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import { useTranslation } from 'react-i18next';

export default function LogoText() {
  const { local } = useTranslation();
  return (
    <Grid>
      <Typography
        weight="bold"
        style={{
          // height: normalizedSize(80),
          fontSize: normalizedSize(46),
        }}
      >
        BuzzWheel
      </Typography>
      <Typography variant="headline">Your gateway to endless fun</Typography>
    </Grid>
  );
}
