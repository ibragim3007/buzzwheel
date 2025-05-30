import { usePackage } from '@/src/entities/Package/usePackage';
import { useRouletteGame } from '@/src/entities/RouletteGame/roulette-game.repository';
import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import Packages from '@/src/module/Packages/Packages';
import PaywallBlock from '@/src/module/Paywall/PaywallBlock';
import { useLang } from '@/src/shared/hooks/lang/useLangStore';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { analytics, Events } from '@/src/shared/service/analytics.service';
import { animationEngine } from '@/src/shared/service/animation.service';
import Button from '@/src/shared/ui/buttons/Button';
import GradientShadow from '@/src/shared/ui/elements/GradientShadow';
import Grid from '@/src/shared/ui/grid/Grid';
import SafeWrapper from '@/src/shared/ui/layout/SafeWrapper';
import ScrollPageWrapper from '@/src/shared/ui/layout/ScrollPageWrapper';
import Typography from '@/src/shared/ui/typography/Typography';
import Header from '@/src/widget/Header';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Animated from 'react-native-reanimated';

export default function PackagePage() {
  const { t } = useTranslation();
  const colors = useTheme();
  const { pickedPackages } = usePackage();
  const { resetGame } = useRouletteGame();
  const { isActiveSubscription } = usePurchases();
  const { navigate } = useRouter();
  const { vibrate } = useVibration();
  const { lang } = useLang();

  console.log(lang);

  const onPressPlay = () => {
    analytics.trackEvent(Events.pressContinueGameAfterPackagePage, {
      packages: pickedPackages.map(p => p.id),
    });
    vibrate();
    navigate('/screens/gameModeScreen');
  };

  const [justMounted, setJustMounted] = useState(false);

  useEffect(() => {
    // resetPackages();
    resetGame();
    setJustMounted(true);
  }, []);

  return (
    <Grid>
      <ScrollPageWrapper>
        <SafeWrapper style={{ paddingBottom: 200 }}>
          <Animated.View entering={animationEngine.zoomInDown(0)}>
            <Header back />

            <Grid space="lg">
              <Typography textAlign="center" weight="bold" variant="title-1">
                {t('packagePage.pick-your-modes')}
              </Typography>
              <Packages />
              {!isActiveSubscription && (
                <Grid paddingHorizontal={30}>
                  <PaywallBlock />
                </Grid>
              )}
            </Grid>
          </Animated.View>
        </SafeWrapper>
      </ScrollPageWrapper>

      {pickedPackages.length > 0 && (
        <Animated.View entering={justMounted ? undefined : animationEngine.zoomInDown(3)}>
          <GradientShadow color={colors.background.primary} height={250} />
          <Grid
            paddingHorizontal={30}
            style={{
              position: 'absolute',
              bottom: 45,
              width: '100%',
            }}
          >
            <Button onPress={onPressPlay} title={t('packagePage.continue')} />
          </Grid>
        </Animated.View>
      )}
    </Grid>
  );
}
