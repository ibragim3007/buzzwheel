import IconTransparent from '@/assets/images/icons_ios/icon-a.png';
import Grid from '@/src/shared/ui/grid/Grid';

import { useTheme } from '@react-navigation/native';

import { normalizedSize } from '@/src/shared/utils/size';
import { Image } from 'expo-image';

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
        opacity: 0.04,
        transform: [{ rotate: '15deg' }],
      }}
    >
      <Image
        source={image || IconTransparent}
        style={{ width: normalizedSize(420), height: normalizedSize(420), borderRadius: normalizedSize(40) }}
      />
    </Grid>
  );
}
