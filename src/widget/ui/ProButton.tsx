import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';

export default function ProButton() {
  const colors = useTheme();
  return (
    <Grid
      paddingHorizontal={16}
      paddingVertical={6}
      style={{
        borderWidth: 1,
        borderColor: colors.accent.secondary,
        borderRadius: 50,
      }}
    >
      <Typography weight="medium" color="secondary-accent">
        PRO
      </Typography>
    </Grid>
  );
}
