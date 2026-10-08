import { withOpacity } from '@/src/module/Paywall/helpers/withOpacity';
import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const SEAT_SIZE = normalizedSize(56);

// Пустые «места за столом»: третье подсвечено акцентом — туда приглашаем первого игрока
export default function Placeholder() {
  const colors = useTheme();
  const { t } = useTranslation();

  const seats = [
    { color: colors.text.disabled, rotate: '-10deg', offsetY: 6 },
    { color: colors.text.disabled, rotate: '0deg', offsetY: -4 },
    { color: colors.accent.primary, rotate: '10deg', offsetY: 6 },
  ];

  return (
    <Animated.View entering={FadeIn.duration(300)}>
      <Grid align="center" justfity="center" space="lg" paddingVertical={30}>
        <View style={{ flexDirection: 'row' }}>
          {seats.map((seat, index) => (
            <View
              key={index}
              style={{
                width: SEAT_SIZE,
                height: SEAT_SIZE,
                borderRadius: SEAT_SIZE / 2,
                marginLeft: index === 0 ? 0 : -normalizedSize(10),
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: withOpacity(seat.color, 0.6),
                backgroundColor: colors.background.primary,
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ rotate: seat.rotate }, { translateY: seat.offsetY }],
              }}
            >
              <Ionicons
                name={index === 2 ? 'add' : 'person'}
                size={normalizedSize(index === 2 ? 26 : 22)}
                color={withOpacity(seat.color, 0.8)}
              />
            </View>
          ))}
        </View>

        <Grid align="center" space="sm">
          <Typography weight="semiBold" variant="callout" textAlign="center">
            {t('homepage.no-players-placeholder')}
          </Typography>
          <Typography variant="footnote" color="disabled" textAlign="center" style={{ maxWidth: normalizedSize(280) }}>
            {t('homepage.empty-hint')}
          </Typography>
        </Grid>
      </Grid>
    </Animated.View>
  );
}
