import { usePlayerStore } from '@/src/entities/Player/player.store';
import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import { withOpacity } from '@/src/module/Paywall/helpers/withOpacity';
import { MAX_PLAYERS_FOR_FREE } from '@/src/shared/config/constants/constants';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { Inform } from '@/src/shared/service/logger.service/logger.service';
import Button from '@/src/shared/ui/buttons/Button';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { ScrollView, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Input from './components/Input/Input';
import Placeholder from './components/Players/Placeholder';
import Players from './components/Players/Players';
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
  const isMaxPlayers = !isActiveSubscription && players.length >= MAX_PLAYERS_FOR_FREE;

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
        onPress: () => navigate('/screens/paywall'),
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

  const isEmpty = players.length === 0;

  const footerHint = isMaxPlayers
    ? t('homepage.max-players-reached', { max_players: MAX_PLAYERS_FOR_FREE })
    : isEnoughPlayers
      ? t('homepage.ready-to-play')
      : isEmpty
        ? ''
        : t('homepage.need-at-least-players');

  return (
    <Grid flex={1} space="lg" paddingTop={12}>
      <Grid space="sm">
        <Typography weight="bold" variant="title-0">
          {t('homepage.title')}
        </Typography>
        <Typography variant="callout" color="disabled">
          {t('homepage.subtitle')}
        </Typography>
      </Grid>

      <Input onCall={onAddNewPlayer} highlight={isEmpty} />

      <Grid flex={1} space="md">
        <Grid row align="center" justfity="space-between">
          <Typography
            weight="bold"
            variant="caption-1"
            color="disabled"
            style={{ textTransform: 'uppercase', letterSpacing: 1.2 }}
          >
            {t('homepage.players-title')}
          </Typography>

          <View
            style={{
              paddingHorizontal: normalizedSize(10),
              paddingVertical: normalizedSize(3),
              borderRadius: normalizedSize(12),
              backgroundColor: withOpacity(isMaxPlayers ? colors.accent.secondary : colors.accent.primary, 0.15),
            }}
          >
            <Typography
              weight="bold"
              variant="caption-1"
              style={{ color: isMaxPlayers ? colors.accent.secondary : colors.accent.primary }}
            >
              {isActiveSubscription ? players.length : `${players.length}/${MAX_PLAYERS_FOR_FREE}`}
            </Typography>
          </View>
        </Grid>

        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: normalizedSize(24), flexGrow: isEmpty ? 1 : undefined }}
          >
            {isEmpty ? (
              <Grid flex={1} justfity="center">
                <Placeholder />
              </Grid>
            ) : (
              <Players players={players} />
            )}
          </ScrollView>

          {/* Мягкое затухание списка у нижнего края */}
          <LinearGradient
            pointerEvents="none"
            colors={[withOpacity(colors.background.primary, 0), colors.background.primary]}
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: normalizedSize(28) }}
          />
        </View>
      </Grid>

      <Grid space="md" marginBottom={12}>
        <Grid height={normalizedSize(20)} justfity="center">
          {footerHint !== '' && (
            <Animated.View key={footerHint} entering={FadeIn.duration(250)}>
              <Typography
                variant="footnote"
                weight="medium"
                textAlign="center"
                style={{ color: isEnoughPlayers && !isMaxPlayers ? colors.accent.primary : colors.text.disabled }}
              >
                {footerHint}
              </Typography>
            </Animated.View>
          )}
        </Grid>

        <View
          style={{
            borderRadius: colors.styles.borderRadiusDefault,
            shadowColor: colors.accent.primary,
            shadowOpacity: isEnoughPlayers ? 0.45 : 0,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 6 },
          }}
        >
          <Button
            onPress={onPressStart}
            title={t('homepage.start-game')}
            disabled={!isEnoughPlayers}
            startIcon={
              <Ionicons name="play" size={24} color={!isEnoughPlayers ? colors.text.disabled : colors.text.primary} />
            }
          />
        </View>
      </Grid>
    </Grid>
  );
}
