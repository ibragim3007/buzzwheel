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

export default function GameModePage() {
  const { mode, setMode } = useRouletteGame();
  const { navigate } = useRouter();
  const { vibrateSelection, vibrate } = useVibration();
  const { t } = useTranslation();

  const handleModeSelect = (selectedMode: ModeType) => {
    vibrateSelection();
    setMode(selectedMode);
  };

  const onPressStartGame = () => {
    vibrate();
    navigate('/screens/game');
  };

  const isDisabled = mode === null;

  return (
    <PageWrapper flex={1}>
      <SafeWrapper>
        <Header back />
        <Grid height="93%" justfity="space-between">
          <Grid marginTop={10} space="sm">
            <Typography weight="bold" variant="title-1" textAlign="center">
              {t('modePage.game-mode')}
            </Typography>
            <Typography variant="footnote" color="secondary" textAlign="center" marginTop={8}>
              {t('modePage.description')}
            </Typography>
          </Grid>

          <Grid gap={24}>
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
          <Grid marginBottom={20}>
            <Button onPress={onPressStartGame} disabled={isDisabled} title={t('modePage.start-button')} />
          </Grid>
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
