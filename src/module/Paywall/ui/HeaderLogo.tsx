import { fontWeightSecondary } from '@/src/shared/styles/typography/typography';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import IconTransparent from '@/assets/images/icons_android/icon-transparent.png';
import { Image } from 'expo-image';
import { useTheme } from '@/src/shared/hooks/useTheme';

export default function HeaderLogo() {
  const colors = useTheme();
  return (
    <Grid align="center">
      <Image source={IconTransparent} style={{ width: 150, height: 150 }} />
      <Typography
        variant="largeTitle"
        style={{
          fontFamily: fontWeightSecondary.bold,
          shadowColor: colors.accent.primary,
          shadowRadius: 0,
          shadowOpacity: 1,
          letterSpacing: 3,
          shadowOffset: {
            width: 3,
            height: 0,
          },
        }}
      >
        BuzzWheel
      </Typography>
    </Grid>
  );
}
