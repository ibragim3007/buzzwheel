import PageWrapper from '@/src/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/src/shared/ui/layout/SafeWrapper';
import Typography from '@/src/shared/ui/typography/Typography';
import GameModeItem from './ui/GameModeItem';
import Grid from '@/src/shared/ui/grid/Grid';
import Button from '@/src/shared/ui/buttons/Button';
import Header from '@/src/widget/Header';
import DryRunImage from '@/assets/images/game_mode_images/dry_run_image.png';
import DrinkDareImage from '@/assets/images/game_mode_images/drink_dare_run.png';
import { ModeType, useRouletteGame } from '@/src/entities/RouletteGame/roulette-game.repository';
import { useRouter } from 'expo-router';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { useTranslation } from 'react-i18next';
import { analytics, Events } from '@/src/shared/service/analytics.service';
import { usePlayerStore } from '@/src/entities/Player/player.store';
import { usePackage } from '@/src/entities/Package/usePackage';
import { Alert } from 'react-native';

export default function GameModePage() {
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
    navigate('/screens/game');
  };

  const isDisabled = mode === null;

  return (
    <PageWrapper flex={1}>
      <SafeWrapper style={{ flex: 1 }}>
        <Header back />
        <Grid flex={1} justfity="space-between">
          <Grid flex={1}>
            <Grid marginTop={10} space="sm">
              <Typography weight="bold" variant="title-1" textAlign="center">
                {t('modePage.game-mode')}
              </Typography>
              <Typography variant="footnote" color="secondary" textAlign="center" marginTop={8}>
                {t('modePage.description')}
              </Typography>
            </Grid>

            <Grid flex={1} justfity="center" gap={24}>
              <GameModeItem
                currentMode={mode}
                value="drink"
                image={DrinkDareImage}
                title={t('modePage.drink-and-dare')}
                description={t('modePage.drink-mode-description')}
                onPress={value => handleModeSelect(value as ModeType)}
              />
              <GameModeItem
                currentMode={mode}
                value="dry"
                image={DryRunImage}
                title={t('modePage.dry-mode-title')}
                description={t('modePage.dry-mode-description')}
                onPress={value => handleModeSelect(value as ModeType)}
              />
            </Grid>
          </Grid>
          <Grid>
            <Button onPress={onPressStartGame} disabled={isDisabled} title={t('modePage.start-button')} />
          </Grid>
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
