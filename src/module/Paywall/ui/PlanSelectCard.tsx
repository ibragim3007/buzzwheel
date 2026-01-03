import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, ViewStyle } from 'react-native';
import { normalizedSize } from '@/src/shared/utils/size';
import { withOpacity } from '../helpers/withOpacity';

type PlanSelectCardProps = {
  title: string;
  subtitle?: string;
  badgeText?: string;
  rightLabel?: string;
  selected: boolean;
  onPress: () => void;
};

export default function PlanSelectCard({
  title,
  subtitle,
  badgeText,
  rightLabel,
  selected,
  onPress,
}: PlanSelectCardProps) {
  const colors = useTheme();

  const borderColor = selected ? colors.accent.primary : withOpacity(colors.text.primary, 0.18);
  const backgroundColor = selected
    ? withOpacity(colors.accent.primary, 0.12)
    : withOpacity(colors.background.secondary, 0.55);

  const cardStyle: ViewStyle = {
    borderWidth: 1,
    borderColor,
    backgroundColor,
    borderRadius: colors.styles.borderRadiusSmall,
  };

  const iconName = selected ? 'checkmark-circle' : 'ellipse-outline';
  const iconColor = selected ? colors.accent.primary : withOpacity(colors.text.primary, 0.35);

  return (
    <Pressable onPress={onPress}>
      <Grid paddingVertical={16} paddingHorizontal={16} style={cardStyle}>
        <Grid row align="center" justfity="space-between" gap={12}>
          <Grid flex={1} gap={3}>
            <Typography variant="headline" weight="bold">
              {title}
            </Typography>
            {!!subtitle && (
              <Typography variant="footnote" color="secondary">
                {subtitle}
              </Typography>
            )}
          </Grid>

          <Grid row align="center" gap={10}>
            {!!badgeText && (
              <Grid
                paddingVertical={6}
                paddingHorizontal={10}
                style={{
                  borderRadius: normalizedSize(10),
                  backgroundColor: colors.accent.secondary,
                }}
              >
                <Typography variant="caption-1" weight="bold" color="white">
                  {badgeText}
                </Typography>
              </Grid>
            )}

            {!!rightLabel && (
              <Typography variant="title-3" weight="bold">
                {rightLabel}
              </Typography>
            )}

            <Ionicons name={iconName} size={normalizedSize(22)} color={iconColor} />
          </Grid>
        </Grid>
      </Grid>
    </Pressable>
  );
}
