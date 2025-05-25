import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import { getActualImageLink } from '@/src/shared/helpers/getActualImageLink';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { animationEngine, animationService } from '@/src/shared/service/animation.service';
import { Package } from '@/src/shared/types/globalTypes';
import AnimTouchWrapper from '@/src/shared/ui/animations/AnimTouchWrapper';
import Grid from '@/src/shared/ui/grid/Grid';
import Checked from '@/src/shared/ui/icons/Checked';
import Paper from '@/src/shared/ui/layout/Paper';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image } from 'expo-image';
import { navigate } from 'expo-router/build/global-state/routing';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

interface PackageItemProps {
  pack: Package;
  picked: boolean;
  amountOfDares?: number;
  index: number;
  onPress: (pack: Package) => void;
}

export default function PackageItem({ pack, picked, amountOfDares, index, onPress }: PackageItemProps) {
  const colors = useTheme();

  const { isActiveSubscription } = usePurchases();
  const isLocked = !isActiveSubscription && pack.isFree === false;

  const onPressWrapper = () => {
    if (isLocked) {
      navigate('/screens/paywall');
      return;
    }
    onPress(pack);
  };

  return (
    <Animated.View
      layout={animationEngine.layoutAnimation}
      style={{ zIndex: index }}
      entering={animationService.getAnimationForShowPackageItem(index)}
    >
      <AnimTouchWrapper>
        <Pressable onPress={onPressWrapper}>
          <Paper
            style={{
              backgroundColor: colors.background.secondary,
              borderRadius: 25,
              borderWidth: 4,
              borderColor: picked ? colors.accent.primary : 'transparent',
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowRadius: 10,
              shadowOffset: {
                height: 0,
                width: 0,
              },
            }}
            paddingVertical={15}
            paddingHorizontal={13}
          >
            {isLocked && (
              <Grid style={{ position: 'absolute', top: 15, right: 15 }} align="center" justfity="center">
                <FontAwesome name="lock" size={24} color={colors.accent.primary} />
              </Grid>
            )}
            {picked && <Checked />}
            <Grid flex={1} row gap={15}>
              <Grid
                style={{
                  shadowColor: '#000',
                  shadowOpacity: picked ? 0.4 : 0,
                  shadowRadius: 20,
                }}
                align="center"
              >
                <Image
                  style={{
                    height: normalizedSize(70),
                    width: normalizedSize(70),
                  }}
                  contentFit="contain"
                  source={getActualImageLink(pack.imageEncoded)}
                  transition={300}
                  // placeholder={{ blurhash }}
                />
              </Grid>
              <Grid space="sm" flex={1}>
                <Grid marginRight={20}>
                  <Typography variant="title-3" weight="bold">
                    {pack.name}
                    {/* {`(${amountOfDares})`} */}
                  </Typography>
                  {pack.packageType === 'pair' && (
                    <Grid row space="sm" align="center">
                      <AntDesign name="heart" size={12} color={colors.accent.secondary} />
                      <Typography
                        weight="medium"
                        style={{
                          color: colors.accent.secondary,
                          shadowColor: colors.accent.secondary,
                          shadowOpacity: 0.8,
                          shadowRadius: 6,
                          // lineHeight: 19,
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                        }}
                        variant="footnote"
                      >
                        Для двоих
                      </Typography>
                    </Grid>
                  )}
                </Grid>
                <Typography
                  numberOfLines={picked ? 5 : 3}
                  color="secondary"
                  style={{ lineHeight: 19 }}
                  variant="footnote"
                >
                  {pack.description}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Pressable>
      </AnimTouchWrapper>
    </Animated.View>
  );
}
