import PageWrapper from '@/src/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/src/shared/ui/layout/SafeWrapper';
import Typography from '@/src/shared/ui/typography/Typography';
import GameModeItem from './ui/GameModeItem';
import Grid from '@/src/shared/ui/grid/Grid';
import Button from '@/src/shared/ui/buttons/Button';
import Header from '@/src/widget/Header';
import DryRunImage from '@/assets/images/game_mode_images/dry_run_image.png';
import DrinkDareImage from '@/assets/images/game_mode_images/drink_dare_run.png';

export default function GameModePage() {
  return (
    <PageWrapper flex={1}>
      <SafeWrapper>
        <Header back />
        <Grid height="95%" justfity="space-between">
          <Grid>
            <Typography weight="bold" variant="title-1" textAlign="center">
              Game Mode
            </Typography>
            <Typography variant="footnote" color="disabled" textAlign="center" marginTop={8}>
              Choose how you would like to spend this evening
            </Typography>
          </Grid>

          <Grid space="lg">
            <GameModeItem image={DrinkDareImage} title="Drink & Dare" description="Miss the mark? Bottoms up!" />
            <GameModeItem image={DryRunImage} title="Dry Run" description="Play it clean, no booze needed." />
          </Grid>
          <Grid marginBottom={20}>
            <Button title="Start Game" />
          </Grid>
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
