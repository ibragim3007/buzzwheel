import { Pressable, PressableProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { normalizedSize } from '../../utils/size';

export default function WrapIconInCircle({ ...props }: PressableProps) {
  const colors = useTheme();
  return (
    <Pressable
      style={{
        borderWidth: 2,
        borderRadius: 100,
        padding: 0,
        width: normalizedSize(45),
        height: normalizedSize(45),
        borderColor: colors.accent.secondary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}
    />
  );
}
