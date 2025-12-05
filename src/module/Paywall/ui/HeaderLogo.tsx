import PeopleImage from '@/assets/images/paywall_icons/paywall_people.png';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { fontWeightThird } from '@/src/shared/styles/typography/typography';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { Image } from 'expo-image';

export default function HeaderLogo() {
  const colors = useTheme();
  return (
    <Grid space="md" align="center">
      <Image
        contentFit="contain"
        source={PeopleImage}
        style={{ width: '100%', height: 180, shadowColor: colors.accent.primary, shadowOpacity: 0.5 }}
      />
      <Typography
        variant="largeTitle"
        style={{
          fontFamily: fontWeightThird.light,
          letterSpacing: 1.2,
        }}
      >
        BuzzWheel
      </Typography>
    </Grid>
  );
}
