import { useTheme } from '@/src/shared/hooks/useTheme';
import { GridPressable } from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { navigate } from 'expo-router/build/global-state/routing';

export default function ProButton() {
  const colors = useTheme();

  const onPressPro = () => {
    navigate('/screens/paywall');
  };

  return (
    <GridPressable
      onPress={onPressPro}
      paddingHorizontal={16}
      paddingVertical={6}
      style={{
        borderWidth: 1,
        // backgroundColor: colors.accent.primary,
        borderColor: colors.accent.primary,
        borderRadius: colors.styles.borderRadiusDefault / 1.5,
      }}
    >
      <Typography weight="bold" style={{ color: colors.accent.primary }}>
        PRO
      </Typography>
    </GridPressable>
  );
}
