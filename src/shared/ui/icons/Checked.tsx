import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../../hooks/useTheme';
import Grid from '../grid/Grid';

export default function Checked() {
  const colors = useTheme();
  return (
    <Grid
      style={{
        position: 'absolute',
        right: 10,
        top: 13,
        borderRadius: 50,
        borderColor: colors.accent.primary,
      }}
      color={colors.accent.primary}
      padding={5}
    >
      <FontAwesome name="check" size={19} color={colors.text.primary} />
    </Grid>
  );
}
