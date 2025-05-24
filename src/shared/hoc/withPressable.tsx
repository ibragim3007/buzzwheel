import { Pressable } from 'react-native';

export function withPressable<T>(Component: React.ComponentType<T>) {
  return function PressableComponent(props: T & { onPress?: () => void }) {
    return (
      <Pressable onPress={props.onPress}>
        <Component {...props} />
      </Pressable>
    );
  };
}
