import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { AnimatedStyle, LinearTransition } from 'react-native-reanimated';

export interface AnimatedWrapperProps {
  duration?: number;
  children?: React.ReactNode;
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({ children, duration, style }) => {
  return (
    <Animated.View style={[{}, style]} layout={LinearTransition}>
      {children}
    </Animated.View>
  );
};

export default AnimatedWrapper;
