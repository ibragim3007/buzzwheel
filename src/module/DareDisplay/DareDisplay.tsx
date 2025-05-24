import { useRouletteGame } from '@/src/entities/RouletteGame/roulette-game.repository';
import { HORIZONTAL_PADDINGS } from '@/src/shared/config/constants/constants';
import { getActualImageLink } from '@/src/shared/helpers/getActualImageLink';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { animationEngine, animationService } from '@/src/shared/service/animation.service';
import { Dare, Player } from '@/src/shared/types/globalTypes';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import { Image } from 'expo-image';
import { useRef, useState } from 'react';
import { Alert, LayoutChangeEvent, View } from 'react-native';
import Animated from 'react-native-reanimated';
import ActionPreproc from './ActionPreproc';
import ButtomTimerInCard from './ButtomTimerInCard';
import InGameButton from './ui/InGameButton';
import { Entypo } from '@expo/vector-icons';

interface DareDisplayProps {
  dare: Dare;
  currentTurn: Player;
  players: Player[];
  hideDare: (drunk: boolean) => void;
}

export default function DareDisplay({ dare, currentTurn, players, hideDare }: DareDisplayProps) {
  const ref = useRef<View | null>(null);
  const [heightBlock, setHeightBlock] = useState(300);

  const colors = useTheme();
  const { currentPackage, mode } = useRouletteGame();

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeightBlock(height); // обновляем высоту
  };

  const onPressDrunk = () => {
    Alert.alert('Drunk Dare', 'Are you sure you want to take this dare?', [
      {
        text: `Drunk ${dare.alcohol} times`,
        onPress: () => {
          hideDare(true);
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => {
          // Do nothing on cancel
        },
      },
    ]);
  };

  const onPressDry = () => {
    hideDare(false);
  };

  return (
    <Animated.View
      style={{ width: '100%', marginHorizontal: HORIZONTAL_PADDINGS }}
      entering={animationService.enteringDareCard(0)}
      exiting={animationEngine.slideOutLeft(0)}
    >
      <Grid gap={80}>
        <View ref={ref} onLayout={handleLayout}>
          <Grid
            paddingVertical={30}
            paddingHorizontal={30}
            marginHorizontal={HORIZONTAL_PADDINGS}
            color={colors.text.white}
            style={{ borderRadius: 40 }}
          >
            <Grid align="center" space="lg">
              <Grid marginBottom={10} space="md">
                {dare.time ? <ButtomTimerInCard dare={dare} handleDone={onPressDry} /> : null}
                <Typography variant="title-2" weight="bold" color="secondary-accent" textAlign="center">
                  <ActionPreproc
                    textColor={colors.accent.secondary}
                    action={dare.title}
                    players={players}
                    currentTurn={currentTurn}
                    weight="medium"
                  />
                </Typography>
              </Grid>

              <Grid marginBottom={50}>
                <Typography style={{ lineHeight: 33, letterSpacing: 0.3 }} textAlign="center" variant="title-3">
                  <ActionPreproc action={dare.action} players={players} currentTurn={currentTurn} />
                </Typography>
              </Grid>
            </Grid>
            <Grid
              style={{
                position: 'absolute',
                bottom: 10,
                right: 20,
              }}
            >
              <Image
                style={{
                  height: normalizedSize(70),
                  width: normalizedSize(70),
                  transform: [{ rotate: '15deg' }],
                }}
                source={getActualImageLink(currentPackage?.imageEncoded || '')}
                contentFit="contain"
              />
            </Grid>
          </Grid>
        </View>

        <Grid row width="100%" paddingHorizontal={40} space="lg">
          {dare.alcohol && mode == 'drink' && (
            <Grid flex={0.5} gap={20}>
              <InGameButton onPress={onPressDrunk} color={colors.background.secondary} title="Alcohol" />
              <Grid align="center" row justfity="center" space="sm">
                <Entypo name="drink" size={15} color={colors.text.disabled} />
                <Typography textAlign="center" variant="caption-1" color="disabled">
                  Drunk {dare.alcohol} times
                </Typography>
              </Grid>
            </Grid>
          )}
          <Grid flex={mode == 'drink' ? 0.5 : 1}>
            <InGameButton title="Done" onPress={onPressDry} />
          </Grid>
        </Grid>
      </Grid>
    </Animated.View>
  );
}
