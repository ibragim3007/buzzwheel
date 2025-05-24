import { Pressable, PressableProps } from 'react-native-gesture-handler';
import { normalizedSize } from '../../utils/size';

interface WrapIconInPressableProps extends PressableProps {
  primaryColor?: string;
  backgroundColor?: string;
}

export default function WrapIconInPressable({ primaryColor, backgroundColor, ...props }: WrapIconInPressableProps) {
  return (
    <Pressable
      {...props}
      style={{
        padding: normalizedSize(7),
        backgroundColor: backgroundColor || 'transparent',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: primaryColor || '#ffffff42',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
}
