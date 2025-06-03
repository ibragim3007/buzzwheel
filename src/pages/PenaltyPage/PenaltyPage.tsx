import DryRunImage from '@/assets/images/game_mode_images/dry_run_image.png';
import NoPenaltyImage from '@/assets/images/game_mode_images/no_penalty.png';
import PushUpImage from '@/assets/images/game_mode_images/push_up.png';

import Grid from '@/src/shared/ui/grid/Grid';
import PageWrapper from '@/src/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/src/shared/ui/layout/SafeWrapper';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import Header from '@/src/widget/Header';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import Animated, { interpolate, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import PenaltyItem, { ITEM_WIDTH } from './PenaltyItem';

type penaltyType = {
  image: string;
  title: string;
  description: string;
  colors: [string, string];
};

const penalties: penaltyType[] = [
  {
    image: NoPenaltyImage,
    title: 'No Penalty',
    description: 'Если вы не хотите ничего делать и просто чил',
    colors: ['#723fde', '#4effea'],
  },
  {
    image: PushUpImage,
    title: 'Push-Up',
    description: 'Если вам нужно немного разогреться',
    colors: ['#723fde', '#4effea'],
  },
  {
    image: DryRunImage,
    title: 'Dry Run',
    description: 'Если вам нужно немного разогреться',
    colors: ['#723fde', '#4effea'],
  },
];

/* —— размеры элементов —— */
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SPACING = normalizedSize(20); // промежуток между карточками
const SIDE_EMPTY_SPACE = (SCREEN_WIDTH - ITEM_WIDTH) / 2 + 10; // чтобы крайние карточки тоже центрировались
const SNAP_WIDTH = ITEM_WIDTH + SPACING + ITEM_WIDTH / 3 - 8; // шаг «прилипание»

export default function PenaltyPage() {
  const listRef = useRef<FlatList>(null);
  const [selected, setSelected] = useState(0); // индекс выбранного режима

  // Для анимации скролла
  const scrollX = useSharedValue(0);

  // При монтировании сразу устанавливаем selected и скроллим к нужному индексу
  useEffect(() => {
    setSelected(0);
    setTimeout(() => {
      listRef.current?.scrollToOffset({ offset: 0, animated: false });
    }, 0);
  }, []);

  // Обработчик скролла для FlatList
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  /* вычисляем индекс выбранного элемента после «долистали» */
  const handleMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = e.nativeEvent.contentOffset.x;
      const newIndex = Math.round(offsetX / SNAP_WIDTH);
      if (newIndex !== selected) setSelected(newIndex);
    },
    [selected],
  );

  /* при клике по элементу прокручиваем так, чтобы он стал центральным */
  const scrollToIndex = useCallback((index: number) => {
    listRef.current?.scrollToOffset({ offset: index * SNAP_WIDTH, animated: true });
    setSelected(index);
  }, []);

  return (
    <PageWrapper flex={1}>
      <SafeWrapper>
        <Grid space="md">
          <Header back />
          <Typography textAlign="center" weight="bold" variant="title-1">
            Choose penalty type
          </Typography>
        </Grid>
      </SafeWrapper>
      <Grid>
        <Animated.FlatList
          ref={listRef}
          data={penalties}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={SNAP_WIDTH}
          decelerationRate="fast"
          getItemLayout={(_, index) => ({
            length: SNAP_WIDTH,
            offset: SNAP_WIDTH * index,
            index,
          })}
          contentContainerStyle={{
            paddingHorizontal: SIDE_EMPTY_SPACE,
          }}
          ItemSeparatorComponent={() => <Grid width={SPACING} />}
          onMomentumScrollEnd={handleMomentumEnd}
          onScroll={onScroll}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => {
            // вычисляем анимированное значение для карточки
            const inputRange = [(index - 1) * SNAP_WIDTH, index * SNAP_WIDTH, (index + 1) * SNAP_WIDTH];
            const animatedValue = scrollX
              ? interpolate(
                  scrollX.value,
                  inputRange,
                  [0, 1, 0],
                  // clamp
                )
              : index === selected
                ? 1
                : 0;
            return (
              <PenaltyItem
                image={item.image}
                title={item.title}
                description={item.description}
                gradientColors={item.colors}
                selected={index === selected}
                onPress={() => scrollToIndex(index)}
                animatedValue={animatedValue}
              />
            );
          }}
        />
      </Grid>
    </PageWrapper>
  );
}
