import { MAX_PLAYERS_FOR_FREE } from '@/src/shared/config/constants/constants';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { animationEngine } from '@/src/shared/service/animation.service';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Animated from 'react-native-reanimated';
import { Animated as AnimatedCore } from 'react-native';

interface UserLimitProps {
  currentPlayers: number;
}

export default function UserLimit({ currentPlayers }: UserLimitProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const [progress] = useState(new AnimatedCore.Value(0));

  useEffect(() => {
    const percentage = (currentPlayers / MAX_PLAYERS_FOR_FREE) * 100;
    AnimatedCore.timing(progress, {
      toValue: percentage,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [currentPlayers, progress]);

  const isPlayersGreaterThan0 = currentPlayers > 0;
  const isMaxPlayers = currentPlayers >= MAX_PLAYERS_FOR_FREE;

  return (
    <Grid space="sm" height={30} justfity="center">
      <Animated.View layout={animationEngine.layoutAnimation}>
        <Typography color="disabled" textAlign="center" variant="footnote">
          {isMaxPlayers
            ? t('homepage.max-players-reached', { max_players: MAX_PLAYERS_FOR_FREE })
            : isPlayersGreaterThan0
              ? t('homepage.current-max-players', { currentPlayers: currentPlayers, maxPlayers: MAX_PLAYERS_FOR_FREE })
              : t('homepage.need-at-least-players')}
          {/* {isPlayersGreaterThan0 ? `${currentPlayers}/${MAX_PLAYERS_FOR_FREE} players` : 'Add players to start the game'} */}
        </Typography>
      </Animated.View>

      {isPlayersGreaterThan0 && (
        <Animated.View exiting={animationEngine.fadeOutUp(0)} entering={animationEngine.fadeInUp(0)}>
          <Grid width="100%" align="center">
            <Grid
              height={5}
              width={'50%'}
              color={colors.background.secondary}
              style={{
                borderRadius: 10,
              }}
            >
              <AnimatedCore.View
                style={{
                  height: '100%',
                  backgroundColor: colors.accent.secondary,
                  borderRadius: 10,
                  width: progress.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                }}
              />
            </Grid>
          </Grid>
        </Animated.View>
      )}
    </Grid>
  );
}
