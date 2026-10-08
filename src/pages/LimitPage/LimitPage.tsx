import { usePackage } from '@/src/entities/Package/usePackage';
import { useRouletteGame } from '@/src/entities/RouletteGame/roulette-game.repository';
import { getActualImageLink } from '@/src/shared/helpers/getActualImageLink';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
import Button from '@/src/shared/ui/buttons/Button';
import Grid, { GridPressable } from '@/src/shared/ui/grid/Grid';
import PageWrapper from '@/src/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/src/shared/ui/layout/SafeWrapper';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

const IMAGE_SIZE = normalizedSize(64);

export default function LimitPage() {
  const colors = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const { vibrate } = useVibration();
  const { data } = usePackage();
  const { turnsPlayed } = useRouletteGame(state => state.limitOptions);

  const lockedPackages = useMemo(() => data.filter(pack => !pack.isFree), [data]);
  // Округляем вниз до десятков, чтобы «200+» выглядело честно
  const lockedDaresCount = Math.floor(lockedPackages.reduce((sum, pack) => sum + pack.dares.length, 0) / 10) * 10;

  const onUnlock = () => {
    vibrate();
    // replace — чтобы после покупки или закрытия пейвола вернуться сразу в игру
    router.replace('/screens/paywall');
  };

  const onContinueFree = () => {
    if (router.canGoBack()) router.back();
  };

  return (
    <PageWrapper flex={1}>
      <SafeWrapper style={{ flex: 1 }}>
        <Grid flex={1} justfity="space-between" paddingHorizontal={10}>
          <Grid space="sm" marginTop={30}>
            <Typography textAlign="center" style={{ fontSize: normalizedSize(56) }}>
              🔥
            </Typography>
            <Typography variant="title-1" weight="bold" textAlign="center">
              {t('limitPage.title')}
            </Typography>
            <Typography variant="callout" color="secondary" textAlign="center">
              {t('limitPage.description', {
                turns: turnsPlayed,
                packs: lockedPackages.length,
                dares: lockedDaresCount,
              })}
            </Typography>
          </Grid>

          <ScrollView style={{ flexGrow: 0, maxHeight: '55%' }} showsVerticalScrollIndicator={false}>
            <Grid row wrap justfity="center" gap={12}>
              {lockedPackages.map(pack => (
                <Grid
                  key={pack.id}
                  width="30%"
                  align="center"
                  paddingVertical={10}
                  space="sm"
                  color={colors.background.secondary}
                  style={{ borderRadius: colors.styles.borderRadiusDefault }}
                >
                  <Image
                    source={getActualImageLink(pack.imageEncoded)}
                    style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
                    contentFit="contain"
                    cachePolicy="memory-disk"
                  />
                  <Typography variant="caption-1" weight="medium" textAlign="center" numberOfLines={2}>
                    {pack.name}
                  </Typography>
                  <Grid style={{ position: 'absolute', top: 6, right: 8 }}>
                    <FontAwesome name="lock" size={14} color={colors.accent.primary} />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </ScrollView>

          <Grid space="md" marginBottom={20}>
            <Button title={t('limitPage.unlock')} onPress={onUnlock} />
            <GridPressable onPress={onContinueFree} paddingVertical={8} hitSlop={10}>
              <Typography color="secondary" textAlign="center" variant="callout">
                {t('limitPage.continue-free')}
              </Typography>
            </GridPressable>
          </Grid>
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
