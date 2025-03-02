import { usePlayerStore } from '@/src/entities/Player/player.store';
import { MAX_PLAYERS_FOR_FREE } from '@/src/shared/config/constants/constants';
import { useTheme } from '@/src/shared/hooks/useTheme';
import Button from '@/src/shared/ui/buttons/Button';
import GradientShadow from '@/src/shared/ui/elements/GradientShadow';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Alert, ScrollView } from 'react-native';
import Input from './components/Input/Input';
import Players from './components/Players/Players';

export default function AddPlayers() {
  const colors = useTheme();
  const { players, addNewPlayer } = usePlayerStore();
  const { navigate } = useRouter();

  const isEnoughPlayers = players.length >= 2;

  const onAddNewPlayer = (name: string) => {
    if (players.length >= MAX_PLAYERS_FOR_FREE) {
      Alert.alert('You have reached the maximum number of players for the free version');
      return;
    }
    addNewPlayer(name);
  };

  const onPressStart = () => {
    if (!isEnoughPlayers) {
      Alert.alert('Add at least 2 players to start the game');
      return;
    }
    navigate('/screens/packages');
  };

  return (
    <Grid flex={1} justfity="space-around" space="sm">
      <Grid space="md">
        <Input onCall={onAddNewPlayer} />
        {/* <Typography textAlign="center" weight="bold" variant="largeTitle">
            Party Game
          </Typography> */}
        <Typography textAlign="center" variant="headline">
          {players.length > 0 ? `${players.length}/${MAX_PLAYERS_FOR_FREE} players` : 'Add players to start the fun!'}
        </Typography>
      </Grid>

      <Grid style={{ overflow: 'hidden', position: 'relative' }}>
        <ScrollView
          scrollIndicatorInsets={{ top: 40, bottom: 40 }}
          indicatorStyle="black"
          contentContainerStyle={{ paddingVertical: 15 }}
          style={{
            height: normalizedSize(360),
            backgroundColor: colors.background.secondary,
            paddingHorizontal: 10,
            borderRadius: 40,
          }}
        >
          {players.length === 0 && (
            <Grid height={normalizedSize(300)} align="center" justfity="center">
              <Typography weight="medium" textAlign="center">
                Players will{'\n'}be displayed here
              </Typography>
            </Grid>
          )}
          <Players players={players} />
        </ScrollView>
        <GradientShadow />
      </Grid>

      <Button
        onPress={onPressStart}
        title={`Start Game ${players.length ? `(${players.length} players)` : ''}`}
        disabled={!isEnoughPlayers}
        // style={{
        //   backgroundColor: isEnoughPlayers
        //     ? colors.accent.primary
        //     : colors.background.secondary,
        // }}
        startIcon={<Ionicons name="play" size={24} color={colors.text.primary} />}
      />
    </Grid>
  );
}
