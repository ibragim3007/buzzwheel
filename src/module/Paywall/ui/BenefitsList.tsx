import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentProps } from 'react';

export type Benefit = {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
};

interface BenefitsListProps {
  items: Benefit[];
}

// Выгоды в одну строку: иконка + короткая подпись
export default function BenefitsList({ items }: BenefitsListProps) {
  const colors = useTheme();
  const size = normalizedSize(40);

  return (
    <Grid row justfity="space-between">
      {items.map(item => (
        <Grid key={item.icon} flex={1} align="center" gap={8}>
          <Grid
            align="center"
            justfity="center"
            color={colors.background.secondary}
            style={{ width: size, height: size, borderRadius: size / 2 }}
          >
            <Ionicons name={item.icon} size={size * 0.45} color={colors.accent.primary} />
          </Grid>
          <Typography variant="caption-1" color="secondary" textAlign="center">
            {item.title}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
