import IconTransparent from '@/assets/images/icons_android/icon-transparent.png';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { fontWeightThird } from '@/src/shared/styles/typography/typography';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { Image } from 'expo-image';

export default function HeaderLogo() {
  const colors = useTheme();
  return (
    <Grid align="center">
      <Image source={IconTransparent} style={{ width: 150, height: 150 }} />
      <Typography
        variant="largeTitle"
        style={{
          fontFamily: fontWeightThird.light,
          shadowColor: colors.accent.primary,
          shadowOpacity: 1,
          letterSpacing: 1,

          textShadowColor: colors.accent.primary,

          textShadowOffset: {
            width: 0,
            height: 3,
          },
        }}
      >
        BuzzWheel
      </Typography>
    </Grid>
  );
}
