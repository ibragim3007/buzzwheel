import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid, { GridPressable } from '@/src/shared/ui/grid/Grid';
import Paper from '@/src/shared/ui/layout/Paper';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface PenaltyItemProps {
  image: string;
  title: string;
  description: string;
  selected: boolean;
  gradientColors: [string, string];
  onPress: () => void;
  animatedValue?: number; // Новый проп для передачи позиции
}

export const ITEM_WIDTH = normalizedSize(220); // ширина карточки

export default function PenaltyItem({
  image,
  title,
  description,
  selected,
  gradientColors,
  onPress,
  animatedValue = selected ? 1 : 0, // по умолчанию если нет анимации
}: PenaltyItemProps) {
  const colors = useTheme();
  const currentGradientColors: [string, string] = selected ? gradientColors : ['transparent', 'transparent'];

  // Анимируем scale и opacity в зависимости от animatedValue
  const animatedStyle = useAnimatedStyle(() => {
    // animatedValue: 1 - выбран, 0 - не выбран
    const scale = withTiming(animatedValue ? 1 : 0.85, { duration: 250 });
    const opacity = withTiming(animatedValue ? 1 : 0.5, { duration: 250 });
    return {
      transform: [{ scale }],
      opacity,
    };
  }, [animatedValue]);

  return (
    <Animated.View style={animatedStyle}>
      <GridPressable width={ITEM_WIDTH} height={320} onPress={onPress}>
        <LinearGradient
          colors={currentGradientColors}
          style={{
            borderRadius: colors.styles.borderRadiusDefault + 3,
            padding: 3,
          }}
        >
          <Paper align="center" space="md" paddingVertical={20} justfity="center">
            <Image source={image} style={{ width: '100%', height: 200 }} />

            <Grid>
              <Typography weight="bold" variant="title-1">
                {title}
              </Typography>
              <Typography variant="caption-1" color="secondary">
                {description}
              </Typography>
            </Grid>
          </Paper>
        </LinearGradient>
      </GridPressable>
    </Animated.View>
  );
}
