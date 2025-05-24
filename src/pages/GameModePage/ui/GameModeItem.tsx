import { ModeType } from '@/src/entities/RouletteGame/roulette-game.repository';
import { useTheme } from '@/src/shared/hooks/useTheme';
import AnimTouchWrapper from '@/src/shared/ui/animations/AnimTouchWrapper';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';

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
}

export default function GameModeItem({ title, description, image, value, currentMode, onPress }: GameModeItemProps) {
  const isPicked = currentMode === value;
  const colors = useTheme();

  const onPressWrapper = () => {
    if (onPress) {
      onPress(value);
    }
  };

  const gradientColors: [ColorValue, ColorValue, ...ColorValue[]] = isPicked
    ? [colors.accent.primary, '#FF5E5E']
    : [colors.background.secondary, colors.background.secondary];

  return (
    <AnimTouchWrapper value={0.98}>
      <Pressable
        onPress={onPressWrapper}
        style={{
          shadowColor: colors.accent.primary,
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: isPicked ? 0.4 : 0,
          shadowRadius: 7,
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={gradientColors}
          style={{
            borderRadius: 20,
            padding: 3,
          }}
        >
          <Grid
            row
            align="center"
            paddingVertical={20}
            color={isPicked ? colors.background.secondary : colors.background.primary}
            style={{ borderRadius: 17 }}
            space="md"
            paddingHorizontal={6}
          >
            {/* <PressablePaper
          style={{
            borderWidth: 3,
            borderColor: isPicked ? colors.accent.primary : colors.background.secondary,
            backgroundColor: isPicked ? colors.background.secondary : colors.background.primary,
          }}
          onPress={onPressWrapper}
          align="center"
          justfity="space-around"
          row
        > */}
            <Grid width="35%">
              <Image source={image} style={{ width: 130, height: 140 }} contentFit="cover" />
            </Grid>
            <Grid width="65%" space="sm">
              <Typography weight="bold" variant="title-2">
                {title}
              </Typography>

              <Typography variant="footnote" color="secondary">
                {description}
              </Typography>
            </Grid>
            {/* </PressablePaper> */}
          </Grid>
        </LinearGradient>
      </Pressable>
    </AnimTouchWrapper>
  );
}
