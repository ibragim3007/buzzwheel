import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import { Text } from 'react-native';

export default function LogoText() {
  return (
    <Grid align="center" gap={6}>
      <Text style={{ fontSize: normalizedSize(96), lineHeight: normalizedSize(110) }}>🎡</Text>
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
        Your gateway to endless fun
      </Typography>
    </Grid>
  );
}
