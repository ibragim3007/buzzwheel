import { Pressable, PressableProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function WrapIconInCircle({ ...props }: PressableProps) {
  const colors = useTheme();
  return (
    <Pressable
      style={{
        borderWidth: 1,
        borderRadius: 100,
        padding: 0,
        width: 50,
        height: 50,
        borderColor: colors.accent.secondary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}
    />
  );
}
