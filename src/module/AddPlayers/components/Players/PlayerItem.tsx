import { usePlayerStore } from '@/src/entities/Player/player.store';
import { CustomAnimations } from '@/src/shared/config/theme/AnimationConfig';

import { useTheme } from '@/src/shared/hooks/useTheme';
import { Player } from '@/src/shared/types/globalTypes';
import AnimatedWrapper from '@/src/shared/ui/animations/AnimatedWrapper';
import Grid from '@/src/shared/ui/grid/Grid';
import Paper from '@/src/shared/ui/layout/Paper';
import Typography from '@/src/shared/ui/typography/Typography';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

interface PlayerItemProps {
  player: Player;
}

export default function PlayerItem({ player }: PlayerItemProps) {
  const colors = useTheme();

  const { deletePlayer } = usePlayerStore();

  return (
    <AnimatedWrapper>
      <Animated.View entering={CustomAnimations.enterItemShow(0)} exiting={CustomAnimations.exitItemShow(0)}>
        <Paper
          paddingHorizontal={25}
          paddingVertical={18}
          style={{
            backgroundColor: colors.background.primary,
            borderRadius: 30,
          }}
        >
          <Grid justfity="space-between" row>
            <Grid row justfity="center" space="md">
              <Typography
                style={{
                  color: player.color ? player.color : colors.text.primary,
                }}
                weight="medium"
                color="primary"
              >
                {player.name}
              </Typography>
            </Grid>
            <Pressable
              style={{
                width: 50,
                alignItems: 'flex-end',
              }}
              onPress={() => deletePlayer(player.id)}
            >
              <Ionicons name="close" size={26} color={colors.text.primary} />
            </Pressable>
          </Grid>
        </Paper>
      </Animated.View>
    </AnimatedWrapper>
  );
}
