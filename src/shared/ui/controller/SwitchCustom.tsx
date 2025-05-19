import { Switch, SwitchProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export interface SwitchCustomProps extends SwitchProps {}

export default function SwitchCustom({ ...props }: SwitchCustomProps) {
  const colors = useTheme();
  return (
    <Switch
      {...props}
      thumbColor={colors.accent.primary}
      ios_backgroundColor={colors.background.primary}
      trackColor={{
        false: colors.background.secondary,
        true: colors.background.tertiary,
      }}
    />
  );
}
