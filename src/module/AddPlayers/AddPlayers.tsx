import { usePlayerStore } from '@/src/entities/Player/player.store';
import { MAX_PLAYERS_FOR_FREE } from '@/src/shared/config/constants/constants';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { Inform } from '@/src/shared/service/logger.service/logger.service';
import Button from '@/src/shared/ui/buttons/Button';
import Grid from '@/src/shared/ui/grid/Grid';
import { normalizedSize } from '@/src/shared/utils/size';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';
import Input from './components/Input/Input';
import Placeholder from './components/Players/Placeholder';
import Players from './components/Players/Players';
import UserLimit from './components/Players/UserLimit';

export default function AddPlayers() {
  const colors = useTheme();
  const { players, addNewPlayer } = usePlayerStore();
  const { navigate } = useRouter();
  const { vibrate } = useVibration();

  const isEnoughPlayers = players.length >= 2;

  const onAddNewPlayer = (name: string) => {
    if (players.length >= MAX_PLAYERS_FOR_FREE) {
      Inform.error('', {
        text1: `Limit of ${MAX_PLAYERS_FOR_FREE} players`,
        text2: 'You can increase this in full access',
        type: 'error',
        onShow: () => vibrate(),
        onPress: () => navigate('/screens/gift'),
      });
      return;
    }
    addNewPlayer(name);
  };

  const onPressStart = () => {
    if (!isEnoughPlayers) {
      Inform.error('', { text1: 'Need at least 2 players', position: 'bottom', type: 'error' });
      return;
    }
    navigate('/screens/packages');
  };

  return (
    <Grid flex={1} justfity="space-around" gap={16}>
      <Grid gap={24}>
        <Input onCall={onAddNewPlayer} />
        <UserLimit currentPlayers={players.length} />
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
          {players.length === 0 && <Placeholder />}
          <Players players={players} />
        </ScrollView>
        {/* <GradientShadow /> */}
      </Grid>

      <Grid marginBottom={30}>
        <Button
          onPress={onPressStart}
          title={'Start Game'}
          disabled={!isEnoughPlayers}
          startIcon={<Ionicons name="play" size={24} color={colors.text.primary} />}
        />
      </Grid>
    </Grid>
  );
}
