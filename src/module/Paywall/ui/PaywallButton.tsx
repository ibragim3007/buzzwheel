import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid, { GridPressable } from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { LinearGradient } from 'expo-linear-gradient';

export default function PaywallButton() {
  const colors = useTheme();
  return (
    <GridPressable>
      <LinearGradient
        start={[0, 0]}
        end={[1, 1]}
        style={{ borderRadius: 25 }}
        colors={[colors.accent.primary, colors.accent.secondary]}
      >
        <Grid paddingHorizontal={40} paddingVertical={20}>
          <Typography variant="title-2" weight="bold">
            Играть бесплатно
          </Typography>
        </Grid>
      </LinearGradient>
    </GridPressable>
  );
}
