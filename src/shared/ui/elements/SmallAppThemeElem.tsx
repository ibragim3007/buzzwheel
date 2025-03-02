import { PalitraInterface } from '../../config/theme/theme';
import Grid from '../grid/Grid';

interface SmallAppThemeElemProps {
  theme: PalitraInterface;
}

export default function SmallAppThemeElem({ theme }: SmallAppThemeElemProps) {
  return (
    <Grid
      width={65}
      height={100}
      color={theme.background.primary}
      justfity="space-between"
      paddingHorizontal={10}
      paddingVertical={10}
      style={{
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.accent.primary,
      }}
    >
      <Grid
        width="100%"
        height={8}
        color={theme.accent.primary}
        style={{
          borderRadius: 10,
        }}
      />
      <Grid
        width="100%"
        height={45}
        color={theme.background.secondary}
        paddingVertical={5}
        paddingHorizontal={5}
        style={{ borderRadius: 12 }}
        gap={3}
      >
        <Grid width="70%" height={8} color={theme.text.primary} style={{ borderRadius: 10 }} />
        <Grid width="40%" height={8} color={theme.text.primary} style={{ borderRadius: 10 }} />
      </Grid>

      <Grid width="100%" height={13} color={theme.accent.primary} style={{ borderRadius: 10 }} />
    </Grid>
  );
}
