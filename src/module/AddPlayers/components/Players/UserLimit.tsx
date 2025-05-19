import { MAX_PLAYERS_FOR_FREE } from '@/src/shared/config/constants/constants';
import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { useEffect, useState } from 'react';
import { Animated } from 'react-native';

interface UserLimitProps {
  currentPlayers: number;
}

export default function UserLimit({ currentPlayers }: UserLimitProps) {
  const colors = useTheme();
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    const percentage = (currentPlayers / MAX_PLAYERS_FOR_FREE) * 100;
    Animated.timing(progress, {
      toValue: percentage,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentPlayers, progress]);

  const isPlayersGreaterThan0 = currentPlayers > 0;

  return (
    <Grid space="sm">
      <Typography textAlign="center" variant="headline">
        {isPlayersGreaterThan0 ? `${currentPlayers}/${MAX_PLAYERS_FOR_FREE} players` : 'Add players to start the game'}
      </Typography>

      <Grid width="100%" align="center">
        <Grid
          height={10}
          width={'50%'}
          color={colors.background.secondary}
          style={{
            borderRadius: 10,
          }}
        >
          <Animated.View
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
    </Grid>
  );
}
