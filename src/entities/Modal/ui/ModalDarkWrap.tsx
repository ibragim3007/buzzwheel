import { HORIZONTAL_PADDINGS } from '@/src/shared/config/constants/constants';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

interface ModalDarkWrapProps {
  children?: React.ReactNode;
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
  isTransparent?: boolean;
}

const ModalDarkWrap: React.FC<ModalDarkWrapProps> = ({ children, onClose, style, isTransparent = true }) => {
  const colors = useTheme();

  const backColor = isTransparent ? 'rgba(0, 0, 0, 0.769)' : colors.colors.background;
  return (
    <Pressable
      onPress={onClose}
      style={[
        {
          width: '100%',
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          backgroundColor: backColor,
          paddingHorizontal: HORIZONTAL_PADDINGS,
        },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
};

export default ModalDarkWrap;
