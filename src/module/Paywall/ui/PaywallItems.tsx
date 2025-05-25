import Grid from '@/src/shared/ui/grid/Grid';
import { FontAwesome } from '@expo/vector-icons';
import ItemPaywall from './ItemPaywall';
import { useTheme } from '@/src/shared/hooks/useTheme';

export default function PaywallItems() {
  const colors = useTheme();
  return (
    <Grid space="lg" align="center">
      <ItemPaywall
        icon={<FontAwesome name="unlock-alt" size={24} color={colors.accent.primary} />}
        title="Доступ ко всем режимам"
      />
      <ItemPaywall
        icon={<FontAwesome name="unlock-alt" size={24} color={colors.accent.primary} />}
        title="Отмена в любой момент"
      />
      <ItemPaywall
        icon={<FontAwesome name="unlock-alt" size={24} color={colors.accent.primary} />}
        title="Незабываемые эмоции"
      />
    </Grid>
  );
}
