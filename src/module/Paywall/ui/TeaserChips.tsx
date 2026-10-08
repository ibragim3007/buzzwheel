import { PackageWithDaresIds } from '@/src/entities/Package/usePackage';
import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo } from 'react';

const TEASERS_COUNT = 2;

interface TeaserChipsProps {
  pack: PackageWithDaresIds;
}

// Названия заданий из закрытого пака — без текста, чтобы сохранить интригу
export default function TeaserChips({ pack }: TeaserChipsProps) {
  const colors = useTheme();

  const teasers = useMemo(() => {
    const titles = Array.from(new Set(pack.dares.map(dare => dare.title).filter(Boolean)));
    const step = Math.max(1, Math.floor(titles.length / TEASERS_COUNT));
    return titles.filter((_, index) => index % step === 0).slice(0, TEASERS_COUNT);
  }, [pack]);

  return (
    <Grid row wrap justfity="center" gap={6}>
      {teasers.map(title => (
        <Grid
          key={title}
          row
          align="center"
          gap={5}
          paddingHorizontal={10}
          paddingVertical={5}
          color={colors.background.secondary}
          style={{ borderRadius: 999 }}
        >
          <Ionicons name="lock-closed" size={11} color={colors.text.disabled} />
          <Typography variant="caption-1" color="secondary" numberOfLines={1}>
            {title}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
