import { useTheme } from '../../hooks/useTheme';
import Grid from '../grid/Grid';

export default function HandleComponent() {
  const colors = useTheme();
  return (
    <Grid
      width="100%"
      height={50}
      color={colors.background.secondary}
      align="center"
      justfity="center"
      style={{ borderRadius: 20 }}
    >
      <Grid width={30} height={4} color={colors.text.primary} style={{ borderRadius: 50 }} />
    </Grid>
  );
}
