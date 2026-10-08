import { PackageWithDaresIds } from '@/src/entities/Package/usePackage';
import { getActualImageLink } from '@/src/shared/helpers/getActualImageLink';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { normalizedSize } from '@/src/shared/utils/size';
import { Image } from 'expo-image';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const ITEM_SIZE = normalizedSize(76);
const GAP = normalizedSize(10);
const SECONDS_PER_ITEM = 2.2;

interface PacksMarqueeProps {
  packages: PackageWithDaresIds[];
  reverse?: boolean;
}

// Бесконечная лента обложек: рендерим список дважды и сдвигаем на ширину одного списка
export default function PacksMarquee({ packages, reverse }: PacksMarqueeProps) {
  const colors = useTheme();
  const rowWidth = packages.length * (ITEM_SIZE + GAP);
  const offset = useSharedValue(0);

  useEffect(() => {
    if (rowWidth === 0) return;
    offset.value = 0;
    offset.value = withRepeat(
      withTiming(1, { duration: packages.length * SECONDS_PER_ITEM * 1000, easing: Easing.linear }),
      -1,
    );
  }, [rowWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: reverse ? (offset.value - 1) * rowWidth : -offset.value * rowWidth }],
  }));

  if (packages.length === 0) return null;

  return (
    <View style={{ overflow: 'hidden', width: '100%' }}>
      <Animated.View style={[{ flexDirection: 'row', gap: GAP, paddingRight: GAP }, animatedStyle]}>
        {[...packages, ...packages].map((pack, index) => (
          <View
            key={`${pack.id}-${index}`}
            style={{
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              borderRadius: colors.styles.borderRadiusDefault,
              backgroundColor: colors.background.secondary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={getActualImageLink(pack.imageEncoded)}
              style={{ width: ITEM_SIZE * 0.78, height: ITEM_SIZE * 0.78 }}
              contentFit="contain"
              cachePolicy="memory-disk"
            />
          </View>
        ))}
      </Animated.View>
    </View>
  );
}
