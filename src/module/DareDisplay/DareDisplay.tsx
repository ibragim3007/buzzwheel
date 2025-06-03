import { useRouletteGame } from '@/src/entities/RouletteGame/roulette-game.repository';
import { HORIZONTAL_PADDINGS } from '@/src/shared/config/constants/constants';
import { getActualImageLink } from '@/src/shared/helpers/getActualImageLink';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { animationEngine, animationService } from '@/src/shared/service/animation.service';
import { Dare, Player } from '@/src/shared/types/globalTypes';
import Button from '@/src/shared/ui/buttons/Button';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import { Entypo } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRef } from 'react';
import { Alert, View } from 'react-native';
import Animated from 'react-native-reanimated';
import ActionPreproc from './ActionPreproc';
import ButtomTimerInCard from './ButtomTimerInCard';
import { useTranslation } from 'react-i18next';
import { analytics, Events } from '@/src/shared/service/analytics.service';
import { useSettings } from '@/src/entities/Settings/settings.repository';

interface DareDisplayProps {
  dare: Dare;
  currentTurn: Player;
  players: Player[];
  hideDare: (drunk: boolean) => void;
}

export default function DareDisplay({ dare, currentTurn, players, hideDare }: DareDisplayProps) {
  const ref = useRef<View | null>(null);
  const { t } = useTranslation();
  const { vibrate } = useVibration();

  const colors = useTheme();
  const { currentPackage } = useRouletteGame();
  const { isDrinkingMode } = useSettings();

  const onPressDrunk = () => {
    analytics.trackEvent(Events.pressAlcohol, {});
    vibrate();
    Alert.alert(t('gamePage.modal-drink-title'), t('gamePage.drink-modal-subtext'), [
      {
        text: t('gamePage.modal-active-button', { number: dare.alcohol }),
        onPress: () => {
          hideDare(true);
        },
      },
      {
        text: t('gamePage.modal-cancel-button'),
        style: 'cancel',
        onPress: () => {
          // Do nothing on cancel
        },
      },
    ]);
  };

  const onPressDry = () => {
    analytics.trackEvent(Events.pressDryRun, {});
    vibrate();
    hideDare(false);
  };

  return (
    <Animated.View
      style={{ width: '100%', marginHorizontal: HORIZONTAL_PADDINGS, flex: 1 }}
      entering={animationService.enteringDareCard(0)}
      exiting={animationEngine.slideOutLeft(0)}
    >
      <Grid flex={1} justfity="space-evenly">
        <Grid
          paddingVertical={30}
          paddingHorizontal={30}
          marginHorizontal={HORIZONTAL_PADDINGS}
          color={colors.text.white}
          style={{ borderRadius: colors.styles.borderRadiusDefault }}
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
                  weight="semiBold"
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
              bottom: normalizedSize(8),
              right: normalizedSize(17),
            }}
          >
            <Image
              style={{
                height: normalizedSize(70),
                width: normalizedSize(70),
              }}
              source={getActualImageLink(currentPackage?.imageEncoded || '')}
              contentFit="contain"
            />
          </Grid>
        </Grid>

        <Grid row width="100%" paddingHorizontal={HORIZONTAL_PADDINGS * 2} space="lg">
          {dare.alcohol && isDrinkingMode ? (
            <>
              <Grid flex={0.5} gap={13}>
                <Button
                  title={t('gamePage.drink-button')}
                  onPress={onPressDrunk}
                  gradientColors={[colors.background.secondary, colors.background.secondary]}
                  borderColor="transparent"
                />
                {/* <InGameButton onPress={onPressDrunk} color={colors.background.secondary} title="Alcohol" /> */}
                <Grid align="center" row justfity="center" space="sm">
                  <Entypo name="flag" size={15} color={colors.text.disabled} />
                  <Typography textAlign="center" variant="caption-1" color="disabled">
                    {t('gamePage.modal-active-button', { number: dare.alcohol })}
                  </Typography>
                </Grid>
              </Grid>
              <Grid flex={isDrinkingMode ? 0.5 : 1}>
                <Button title={t('gamePage.done-button')} onPress={onPressDry} />
                {/* <InGameButton title="Done" onPress={onPressDry} /> */}
              </Grid>
            </>
          ) : (
            <Grid width="100%">
              <Button onPress={onPressDry} title={t('gamePage.done-button')} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Animated.View>
  );
}
