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
        // backgroundColor: colors.accent.primary,
        borderColor: colors.accent.primary,
        borderRadius: 50,
      }}
    >
      <Typography weight="bold" style={{ color: colors.accent.primary }}>
        PRO
      </Typography>
    </Grid>
  );
}
