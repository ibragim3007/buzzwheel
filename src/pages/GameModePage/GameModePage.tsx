import Button from '@/src/shared/ui/buttons/Button';
import Grid from '@/src/shared/ui/grid/Grid';
import PageWrapper from '@/src/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/src/shared/ui/layout/SafeWrapper';
import Typography from '@/src/shared/ui/typography/Typography';
import Header from '@/src/widget/Header';
import GameModeItem from './ui/GameModeItem';
// import DryRunImage from '@/assets/images/game_mode_images/dry_run_image.png';
// import DrinkDareImage from '@/assets/images/game_mode_images/drink_dare_run.png';
import DrinkWaterImage from '@/assets/images/game_mode_images/drink_water.png';
import NoPenaltyImage from '@/assets/images/game_mode_images/no_penalty2.png';
import PushUpImage from '@/assets/images/game_mode_images/push_up.png';
import { usePackage } from '@/src/entities/Package/usePackage';
import { usePlayerStore } from '@/src/entities/Player/player.store';
import { ModeType, useRouletteGame } from '@/src/entities/RouletteGame/roulette-game.repository';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { analytics, Events } from '@/src/shared/service/analytics.service';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView } from 'react-native';
import { normalizedSize } from '@/src/shared/utils/size';
import * as StoreReview from 'expo-store-review';
import { useEffect } from 'react';

export default function GameModePage() {
  const colors = useTheme();
  const { mode, setMode } = useRouletteGame();
  const { navigate } = useRouter();
  const { players } = usePlayerStore();
  const { pickedPackages } = usePackage();
  const { vibrateSelection, vibrate } = useVibration();
  const { t } = useTranslation();

  const handleModeSelect = (selectedMode: ModeType) => {
    vibrateSelection();
    setMode(selectedMode);
  };

  useEffect(() => {
    const requestReview = async () => {
      await StoreReview.requestReview();
    };

    requestReview();
  }, []);

  const onPressStartGame = () => {
    if (mode === null) {
      Alert.alert(t('modePage.please-select-a-game-mode'), t('modePage.need-pick-mode-modal-desck'));
      return;
    }
    analytics.trackEvent(Events.pressStartGameAfterModePage, {
      mode: mode,
      playersAmount: players.length,
      pickedPackages: pickedPackages.map(p => p.id),
    });
    vibrate();

    if (mode !== 'no-penalty') {
      Alert.alert(
        t('modePage.warning'),
        t('modePage.warning-description'),
        [
          {
            text: t('common.cancel'),
            style: 'cancel',
          },
          {
            text: t('common.continue'),
            onPress: () => {
              navigate('/screens/game');
            },
          },
        ],
        { cancelable: true },
      );
      return;
    }

    navigate('/screens/game');
  };

  const isDisabled = mode === null;

  return (
    <PageWrapper flex={1}>
      <SafeWrapper style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: normalizedSize(30),
          }}
          showsVerticalScrollIndicator={false}
        >
          <Header back />
          <Grid flex={1} justfity="space-between">
            <Grid space="lg" flex={1}>
              <Grid space="sm">
                <Typography weight="bold" variant="title-1" textAlign="center">
                  {t('modePage.game-mode')}
                </Typography>
                <Typography variant="footnote" color="secondary" textAlign="center" marginTop={8}>
                  {t('modePage.description')}
                </Typography>
              </Grid>

              <Grid flex={1} justfity="center" gap={24}>
                <GameModeItem
                  gradientColors={['#30e561', '#4effea']}
                  currentMode={mode}
                  value="no-penalty"
                  image={NoPenaltyImage}
                  title={t('modePage.easy-mode')}
                  description={t('modePage.easy-mode-description')}
                  onPress={value => handleModeSelect(value as ModeType)}
                />
                <GameModeItem
                  currentMode={mode}
                  value="push-ups"
                  image={PushUpImage}
                  title={t('modePage.activity-mode')}
                  description={t('modePage.activity-mode-description')}
                  onPress={value => handleModeSelect(value as ModeType)}
                  gradientColors={[colors.accent.primary, colors.accent.quaternary]}
                />
                <GameModeItem
                  gradientColors={['#723fde', '#4effea']}
                  currentMode={mode}
                  value="drink"
                  image={DrinkWaterImage}
                  title={t('modePage.sip-mode')}
                  description={t('modePage.sip-mode-description')}
                  onPress={value => handleModeSelect(value as ModeType)}
                />
              </Grid>
            </Grid>
          </Grid>
        </ScrollView>
        <Grid marginTop={20}>
          <Button onPress={onPressStartGame} disabled={isDisabled} title={t('modePage.start-button')} />
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
