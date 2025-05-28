import { usePackage } from '@/src/entities/Package/usePackage';
import Packages from '@/src/module/Packages/Packages';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
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
import Animated from 'react-native-reanimated';

export default function PackagePage() {
  const colors = useTheme();
  const { pickedPackages } = usePackage();
  const { navigate } = useRouter();
  const { vibrate } = useVibration();
  const onPressPlay = () => {
    vibrate();
    navigate('/screens/gameModeScreen');
  };

  const [justMounted, setJustMounted] = useState(false);

  useEffect(() => {
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
                Pick your modes!
              </Typography>
              <Packages />
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
            <Button onPress={onPressPlay} title="Continue" />
          </Grid>
        </Animated.View>
      )}
    </Grid>
  );
}
