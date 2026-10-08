import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

// Реальная средняя оценка в App Store — обновлять вручную
export const APP_STORE_RATING = '5.0';

export default function RatingRow() {
  const { t } = useTranslation();

  return (
    <Grid row align="center" justfity="center" gap={6}>
      <Grid row gap={2}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Ionicons key={index} name="star" size={14} color="#FFC83D" />
        ))}
      </Grid>
      <Typography variant="footnote" color="secondary" weight="medium">
        {t('paywall.rating', { rating: APP_STORE_RATING })}
      </Typography>
    </Grid>
  );
}
