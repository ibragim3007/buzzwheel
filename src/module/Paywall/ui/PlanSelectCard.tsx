import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, ViewStyle } from 'react-native';
import { Image, ImageSource } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { normalizedSize } from '@/src/shared/utils/size';
import { withOpacity } from '../helpers/withOpacity';

export type PlanBadgeVariant = 'gradient' | 'success' | 'outline';

export type PlanBadge = {
  text: string;
  variant?: PlanBadgeVariant;
};

type PlanSelectCardProps = {
  title: string;
  subtitle?: string;
  leftIcon?: ImageSource | number;
  badges?: PlanBadge[];
  topRibbon?: string;
  highlighted?: boolean;
  selected: boolean;
  onPress: () => void;
};

export default function PlanSelectCard({
  title,
  subtitle,
  leftIcon,
  badges,
  topRibbon,
  highlighted,
  selected,
  onPress,
}: PlanSelectCardProps) {
  const colors = useTheme();

  const chipRadius = normalizedSize(999);

  const accentBorder = withOpacity(colors.accent.primary, 0.7);
  const idleBorder = withOpacity(colors.text.primary, 0.12);

  const cardStyle: ViewStyle = {
    borderWidth: highlighted && !selected ? 2 : 1,
    borderColor: selected
      ? withOpacity(colors.text.primary, 0)
      : highlighted
        ? accentBorder
        : idleBorder,
    backgroundColor: selected ? colors.text.primary : withOpacity(colors.background.secondary, 0.55),
    borderRadius: colors.styles.borderRadiusDefault,
  };

  const titleColor = selected ? colors.background.primary : colors.text.primary;
  const subtitleColor = selected ? withOpacity(colors.background.primary, 0.7) : colors.text.secondary;

  const indicatorBg = selected ? colors.accent.primary : 'transparent';
  const indicatorBorder = selected ? colors.accent.primary : withOpacity(colors.text.primary, 0.4);

  const visibleBadges = (badges ?? []).filter(b => !!b.text);

  return (
    <Pressable onPress={onPress}>
      <Grid style={{ paddingTop: topRibbon ? normalizedSize(10) : 0 }}>
        {!!topRibbon && (
          <Grid
            style={{
              position: 'absolute',
              top: 0,
              alignSelf: 'center',
              zIndex: 2,
            }}
          >
            <LinearGradient
              start={[0, 0]}
              end={[1, 0]}
              colors={[colors.accent.secondary, colors.accent.primary]}
              style={{
                paddingHorizontal: 12,
                minHeight: normalizedSize(22),
                borderRadius: chipRadius,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="caption-2" weight="bold" color="white">
                {topRibbon}
              </Typography>
            </LinearGradient>
          </Grid>
        )}

        <Grid paddingVertical={14} paddingHorizontal={14} style={cardStyle}>
        <Grid row align="center" gap={12}>
          {!!leftIcon && (
            <Image
              source={leftIcon}
              style={{ width: normalizedSize(46), height: normalizedSize(46) }}
              contentFit="contain"
            />
          )}

          <Grid flex={1} gap={2}>
            <Typography variant="headline" weight="bold" style={{ color: titleColor }}>
              {title}
            </Typography>
            {!!subtitle && (
              <Typography variant="footnote" style={{ color: subtitleColor }}>
                {subtitle}
              </Typography>
            )}
          </Grid>

          <Grid
            style={{
              width: normalizedSize(24),
              height: normalizedSize(24),
              borderRadius: normalizedSize(12),
              borderWidth: selected ? 0 : 2,
              borderColor: indicatorBorder,
              backgroundColor: indicatorBg,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {selected && <Ionicons name="checkmark" size={normalizedSize(16)} color={colors.text.white} />}
          </Grid>
        </Grid>

        {visibleBadges.length > 0 && (
          <Grid row wrap gap={8} marginTop={12}>
            {visibleBadges.map(badge => {
              const text = badge.text;
              const variant = badge.variant ?? 'outline';

              if (variant === 'gradient') {
                return (
                  <LinearGradient
                    key={text}
                    start={[0, 0]}
                    end={[1, 0]}
                    colors={[colors.accent.secondary, colors.accent.primary]}
                    style={{
                      paddingHorizontal: 14,
                      minHeight: normalizedSize(28),
                      borderRadius: chipRadius,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption-1" weight="bold" color="white">
                      {text}
                    </Typography>
                  </LinearGradient>
                );
              }

              if (variant === 'success') {
                return (
                  <LinearGradient
                    key={text}
                    start={[0, 0]}
                    end={[1, 0]}
                    colors={['#3DD171', '#1FAE57']}
                    style={{
                      paddingHorizontal: 14,
                      minHeight: normalizedSize(28),
                      borderRadius: chipRadius,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption-1" weight="bold" color="white">
                      {text}
                    </Typography>
                  </LinearGradient>
                );
              }

              return (
                <Grid
                  key={text}
                  paddingHorizontal={14}
                  style={{
                    minHeight: normalizedSize(28),
                    borderRadius: chipRadius,
                    borderWidth: 1,
                    borderColor: withOpacity(colors.text.primary, 0.2),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption-1" weight="bold" style={{ color: titleColor }}>
                    {text}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        )}
        </Grid>
      </Grid>
    </Pressable>
  );
}
