import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Grid from '@/src/shared/ui/grid/Grid';
import { normalizedSize } from '@/src/shared/utils/size';
import { useTheme } from '@/src/shared/hooks/useTheme';

export default function CheckIcon() {
  const colors = useTheme();
  return (
    <Grid
      align="center"
      justfity="center"
      style={{
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: colors.accent.primary,
        borderRadius: 50,
        height: normalizedSize(20),
        width: normalizedSize(20),
        position: 'absolute',
        right: normalizedSize(12),
        top: normalizedSize(12),
      }}
    >
      <FontAwesome6 name="check" size={normalizedSize(13)} color={colors.accent.primary} />
    </Grid>
  );
}
