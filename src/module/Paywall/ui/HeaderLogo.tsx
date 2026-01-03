import Grid from '@/src/shared/ui/grid/Grid';
import IconTransparent from '@/assets/images/icons_ios/icon-e.png';

import { useTheme } from '@react-navigation/native';

import { Image } from 'expo-image';
import React from 'react';
import { normalizedSize } from '@/src/shared/utils/size';

interface HeaderLogoProps {
  image?: string;
}

export default function HeaderLogo({ image }: HeaderLogoProps) {
  const { colors } = useTheme();
  return (
    <Grid
      row
      justfity="center"
      align="center"
      space="md"
      style={{
        position: 'absolute',
        opacity: 0.07,
        transform: [{ rotate: '17deg' }],
      }}
    >
      <Image
        source={image || IconTransparent}
        style={{ width: normalizedSize(370), height: normalizedSize(370), borderRadius: 40 }}
      />
    </Grid>
  );
}
