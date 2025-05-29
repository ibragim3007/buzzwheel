import ArrowAnimation from '@/assets/lottie/arrow-pointer.json';
import { usePlayerStore } from '@/src/entities/Player/player.store';
import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import { MAX_PLAYERS_FOR_FREE } from '@/src/shared/config/constants/constants';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { Inform } from '@/src/shared/service/logger.service/logger.service';
import Button from '@/src/shared/ui/buttons/Button';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

import { ScrollView } from 'react-native';
import Input from './components/Input/Input';
import Placeholder from './components/Players/Placeholder';
import Players from './components/Players/Players';
import UserLimit from './components/Players/UserLimit';
import { useTranslation } from 'react-i18next';
import { analytics, Events } from '@/src/shared/service/analytics.service';

export default function AddPlayers() {
  const colors = useTheme();
  const { t } = useTranslation();
  const { players, addNewPlayer } = usePlayerStore();
  const { navigate } = useRouter();
  const { vibrate, vibrateSelection, vibrateError } = useVibration();
  const { isActiveSubscription } = usePurchases();
  const isEnoughPlayers = players.length >= 2;

  const onAddNewPlayer = (name: string) => {
    if (players.length >= MAX_PLAYERS_FOR_FREE && !isActiveSubscription) {
      analytics.trackEvent(Events.addPlayerRestricted, {
        limitRestricted: players.length >= MAX_PLAYERS_FOR_FREE,
        isSub: isActiveSubscription,
      });

      Inform.error('', {
        text1: t('homepage.limit_players', { max_players: MAX_PLAYERS_FOR_FREE }),
        text2: t('homepage.increase-in-full-access'),
        type: 'error',
        onShow: () => vibrate(),
        onPress: () => navigate('/screens/gift'),
      });
      return;
    }

    analytics.trackEvent(Events.pressAddPlayer, {
      nameLength: name.length,
    });
    vibrateSelection();
    addNewPlayer(name);
  };

  const onPressStart = () => {
    if (!isEnoughPlayers) {
      analytics.trackEvent(Events.notEnougthPlayers, {
        limitRestricted: players.length,
        isSub: isActiveSubscription,
      });

      vibrateError();
      Inform.error('', { text1: t('homepage.need-at-least-players'), position: 'bottom', type: 'error' });
      return;
    }

    analytics.trackEvent(Events.pressStartGame, {
      playersCount: players.length,
      players: players.map(player => player.name),
    });

    vibrate();
    navigate('/screens/packages');
  };

  const isShowArrow = players.length <= 0;

  const isPlayersGreaterThan0 = players.length > 0;

  return (
    <Grid flex={1} justfity="space-around">
      <Grid gap={12}>
        <Input onCall={onAddNewPlayer} />
      </Grid>

      <Grid style={{ overflow: 'hidden', position: 'relative' }}>
        <ScrollView
          scrollIndicatorInsets={{ top: normalizedSize(40), bottom: normalizedSize(40) }}
          indicatorStyle="black"
          contentContainerStyle={{ paddingVertical: normalizedSize(15) }}
          style={{
            height: normalizedSize(360),
            backgroundColor: colors.background.secondary,
            paddingHorizontal: normalizedSize(15),
            borderRadius: colors.styles.borderRadiusDefault + 15,
          }}
        >
          {players.length === 0 && <Placeholder />}
          <Players players={players} />
        </ScrollView>
      </Grid>
      <Grid space="lg" marginBottom={20}>
        {isActiveSubscription ? (
          <Typography color="disabled" textAlign="center" variant="footnote">
            {isPlayersGreaterThan0
              ? t('homepage.players-length-players', { amount: players.length })
              : t('homepage.need-at-least-players')}
          </Typography>
        ) : (
          <UserLimit currentPlayers={players.length} />
        )}
        <Button
          onPress={onPressStart}
          title={t('homepage.start-game')}
          disabled={!isEnoughPlayers}
          startIcon={
            <Ionicons name="play" size={24} color={!isEnoughPlayers ? colors.text.disabled : colors.text.primary} />
          }
        />
      </Grid>
      {isShowArrow && (
        <Grid
          pointerEvents="none"
          style={{ position: 'absolute', top: 30, right: 60, transform: [{ rotateY: '180deg' }, { rotate: '-30deg' }] }}
        >
          <LottieView autoPlay loop source={ArrowAnimation} style={{ width: 200, height: 200 }} />
        </Grid>
      )}
    </Grid>
  );
}
