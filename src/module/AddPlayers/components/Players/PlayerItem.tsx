import { usePlayerStore } from '@/src/entities/Player/player.store';
import { withOpacity } from '@/src/module/Paywall/helpers/withOpacity';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { Player } from '@/src/shared/types/globalTypes';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, View } from 'react-native';
import Animated, { LinearTransition, ZoomIn, ZoomOut } from 'react-native-reanimated';

const AVATAR_SIZE = normalizedSize(34);

// Яркая палитра для аватаров — цвет стабилен для игрока, т.к. зависит от его id
const AVATAR_COLORS = ['#FF8C00', '#EF2FB9', '#7C5CFF', '#20C997', '#3DA5FF', '#FF5A5F', '#FFC233', '#A3E635'];

export function getPlayerColor(player: Player) {
  return player.color ?? AVATAR_COLORS[player.id % AVATAR_COLORS.length];
}

interface PlayerItemProps {
  player: Player;
}

export default function PlayerItem({ player }: PlayerItemProps) {
  const colors = useTheme();
  const { vibrateSelection } = useVibration();
  const { deletePlayer } = usePlayerStore();

  const avatarColor = getPlayerColor(player);
  const initial = player.name.trim().charAt(0).toUpperCase();

  const onPressDeletePlayer = () => {
    deletePlayer(player.id);
    vibrateSelection();
  };

  return (
    <Animated.View
      entering={ZoomIn.springify().mass(0.6)}
      exiting={ZoomOut.duration(150)}
      layout={LinearTransition.springify().mass(0.6)}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: normalizedSize(10),
          backgroundColor: colors.background.secondary,
          borderRadius: AVATAR_SIZE,
          borderWidth: 1,
          borderColor: withOpacity(avatarColor, 0.25),
          paddingLeft: normalizedSize(5),
          paddingRight: normalizedSize(8),
          paddingVertical: normalizedSize(5),
        }}
      >
        <View
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: AVATAR_SIZE / 2,
            backgroundColor: avatarColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography weight="bold" variant="callout" style={{ color: colors.text.white }}>
            {initial}
          </Typography>
        </View>

        <Typography weight="semiBold" variant="callout" numberOfLines={1} style={{ maxWidth: normalizedSize(190) }}>
          {player.name}
        </Typography>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${player.name}`}
          hitSlop={10}
          onPress={onPressDeletePlayer}
          style={({ pressed }) => ({ opacity: pressed ? 0.4 : 0.6 })}
        >
          <Ionicons name="close-circle" size={normalizedSize(22)} color={colors.text.secondary} />
        </Pressable>
      </View>
    </Animated.View>
  );
}
