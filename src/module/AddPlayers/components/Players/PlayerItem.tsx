import { usePlayerStore } from '@/src/entities/Player/player.store';
import { CustomAnimations } from '@/src/shared/config/theme/AnimationConfig';

import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { Player } from '@/src/shared/types/globalTypes';
import AnimatedWrapper from '@/src/shared/ui/animations/AnimatedWrapper';
import Grid from '@/src/shared/ui/grid/Grid';
import Paper from '@/src/shared/ui/layout/Paper';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

interface PlayerItemProps {
  player: Player;
}

export default function PlayerItem({ player }: PlayerItemProps) {
  const colors = useTheme();
  const { vibrateSelection } = useVibration();
  const { deletePlayer } = usePlayerStore();

  const onPressDeletePlayer = () => {
    deletePlayer(player.id);
    vibrateSelection();
  };

  return (
    <AnimatedWrapper>
      <Animated.View entering={CustomAnimations.enterItemShow(0)} exiting={CustomAnimations.exitItemShow(0)}>
        <Paper
          paddingHorizontal={25}
          paddingVertical={20}
          style={{
            backgroundColor: colors.background.primary,
            borderRadius: colors.styles.borderRadiusDefault,
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
              hitSlop={{
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              }}
              style={{
                width: normalizedSize(50),
                alignItems: 'flex-end',
                opacity: 0.7,
              }}
              onPress={onPressDeletePlayer}
            >
              <Ionicons name="close" size={normalizedSize(24)} color={colors.text.primary} />
            </Pressable>
          </Grid>
        </Paper>
      </Animated.View>
    </AnimatedWrapper>
  );
}
