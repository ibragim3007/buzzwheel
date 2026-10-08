import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import { Pressable } from 'react-native';
import { withOpacity } from '../helpers/withOpacity';

interface PlanOptionProps {
  title: string;
  caption?: string;
  badge?: string;
  price: string;
  period: string;
  selected: boolean;
  onPress: () => void;
}

// Минималистичная карточка плана: слева название и пояснение, справа цена
export default function PlanOption({ title, caption, badge, price, period, selected, onPress }: PlanOptionProps) {
  const colors = useTheme();
  const radio = normalizedSize(22);

  return (
    <Pressable onPress={onPress}>
      <Grid
        row
        align="center"
        gap={12}
        paddingHorizontal={16}
        paddingVertical={14}
        color={selected ? withOpacity(colors.accent.primary, 0.08) : colors.background.secondary}
        style={{
          borderRadius: colors.styles.borderRadiusDefault,
          borderWidth: 2,
          borderColor: selected ? colors.accent.primary : 'transparent',
        }}
      >
        <Grid
          align="center"
          justfity="center"
          style={{
            width: radio,
            height: radio,
            borderRadius: radio / 2,
            borderWidth: 2,
            borderColor: selected ? colors.accent.primary : withOpacity(colors.text.primary, 0.3),
          }}
        >
          {selected && (
            <Grid
              color={colors.accent.primary}
              style={{ width: radio / 2, height: radio / 2, borderRadius: radio / 4 }}
            />
          )}
        </Grid>

        <Grid flex={1} gap={2}>
          <Grid row align="center" gap={8}>
            <Typography variant="headline" weight="bold">
              {title}
            </Typography>
            {!!badge && (
              <Grid paddingHorizontal={7} paddingVertical={2} color={colors.accent.primary} style={{ borderRadius: 6 }}>
                <Typography variant="caption-2" weight="bold" color="white">
                  {badge}
                </Typography>
              </Grid>
            )}
          </Grid>
          {!!caption && (
            <Typography variant="footnote" color="secondary">
              {caption}
            </Typography>
          )}
        </Grid>

        <Grid align="flex-end">
          <Typography variant="headline" weight="bold">
            {price}
          </Typography>
          <Typography variant="caption-1" color="secondary">
            {period}
          </Typography>
        </Grid>
      </Grid>
    </Pressable>
  );
}
