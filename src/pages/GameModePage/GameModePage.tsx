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

export default function GameModePage() {
  const { mode, setMode } = useRouletteGame();
  const { navigate } = useRouter();
  const { vibrateSelection } = useVibration();

  const handleModeSelect = (selectedMode: ModeType) => {
    vibrateSelection();
    setMode(selectedMode);
  };

  const onPressStartGame = () => {
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
              Game Mode
            </Typography>
            <Typography variant="footnote" color="secondary" textAlign="center" marginTop={8}>
              Choose how you would like to spend this evening
            </Typography>
          </Grid>

          <Grid gap={24}>
            <GameModeItem
              currentMode={mode}
              value="drink"
              image={DrinkDareImage}
              title="Drink & Dare"
              description="Miss the mark? Bottoms up!"
              onPress={value => handleModeSelect(value as ModeType)}
            />
            <GameModeItem
              currentMode={mode}
              value="dry"
              image={DryRunImage}
              title="Dry Run"
              description="Play it clean, no booze needed."
              onPress={value => handleModeSelect(value as ModeType)}
            />
          </Grid>
          <Grid marginBottom={20}>
            <Button onPress={onPressStartGame} disabled={isDisabled} title="Start Game" />
          </Grid>
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
