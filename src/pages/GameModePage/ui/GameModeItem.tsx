import { ModeType } from '@/src/entities/RouletteGame/roulette-game.repository';
import { useTheme } from '@/src/shared/hooks/useTheme';
import AnimTouchWrapper from '@/src/shared/ui/animations/AnimTouchWrapper';
import GradientShadow from '@/src/shared/ui/elements/GradientShadow';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';

import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ColorValue, Pressable } from 'react-native';

interface GameModeItemProps {
  title: string;
  description: string;
  onPress?: (value: string) => void;
  image: string;
  value: ModeType;
  currentMode?: ModeType | null;
  gradientColors: [ColorValue, ColorValue, ...ColorValue[]];
}

export default function GameModeItem({
  title,
  description,
  image,
  value,
  currentMode,
  gradientColors,
  onPress,
}: GameModeItemProps) {
  const isPicked = currentMode === value;
  const colors = useTheme();

  const onPressWrapper = () => {
    if (onPress) {
      onPress(value);
    }
  };

  const borderColors: [ColorValue, ColorValue, ...ColorValue[]] = isPicked
    ? gradientColors
    : [colors.background.secondary, colors.background.secondary];

  return (
    <AnimTouchWrapper value={0.98}>
      <Pressable
        onPress={onPressWrapper}
        style={{
          shadowColor: isPicked ? gradientColors[0] : '#4f3fde',
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: isPicked ? 0.2 : 0,
          shadowRadius: 10,
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={borderColors}
          style={{
            borderRadius: colors.styles.borderRadiusDefault + normalizedSize(3),
            padding: normalizedSize(3),
          }}
        >
          <Grid
            row
            align="center"
            paddingVertical={18}
            color={isPicked ? colors.background.secondary : colors.background.primary}
            style={{ borderRadius: colors.styles.borderRadiusDefault }}
            space="md"
            paddingHorizontal={10}
          >
            <Grid width="38%">
              <Image source={image} style={{ width: '100%', height: 140 }} contentFit="contain" />
            </Grid>
            <Grid width="56%" space="sm">
              <Typography weight="bold" style={{ lineHeight: normalizedSize(29) }} variant="title-1">
                {title}
              </Typography>

              <Typography variant="footnote" color="secondary">
                {description}
              </Typography>
            </Grid>
            <GradientShadow />
          </Grid>
        </LinearGradient>
      </Pressable>
    </AnimTouchWrapper>
  );
}
