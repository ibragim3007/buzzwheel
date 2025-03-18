import { getActualImageLink } from '@/src/shared/helpers/getActualImageLink';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { animationService } from '@/src/shared/service/animation.service';
import { Package } from '@/src/shared/types/globalTypes';
import AnimTouchWrapper from '@/src/shared/ui/animations/AnimTouchWrapper';
import Grid from '@/src/shared/ui/grid/Grid';
import Checked from '@/src/shared/ui/icons/Checked';
import Paper from '@/src/shared/ui/layout/Paper';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

const blurhash = 'AGN-D]z.oi?^';

interface PackageItemProps {
  pack: Package;
  picked: boolean;
  amountOfDares?: number;
  index: number;
  onPress: (pack: Package) => void;
}

export default function PackageItem({ pack, picked, amountOfDares, index, onPress }: PackageItemProps) {
  const colors = useTheme();

  return (
    <Animated.View entering={animationService.getAnimationForShowPackageItem(index)}>
      <AnimTouchWrapper>
        <Pressable onPress={() => onPress(pack)}>
          <Paper
            style={{
              backgroundColor: colors.background.secondary,
              borderRadius: 50,
              borderWidth: 3,
              height: 140,
              borderColor: picked ? colors.accent.primary : 'transparent',
            }}
            paddingVertical={10}
            paddingHorizontal={10}
            paddingRight={15}
          >
            {picked && <Checked />}
            <Grid flex={1} row space="md" align="center">
              <Grid width={75}>
                <Image
                  style={{ height: normalizedSize(80), width: normalizedSize(80), borderRadius: 100 }}
                  contentFit="contain"
                  source={getActualImageLink(pack.imageEncoded)}
                  transition={300}
                  placeholder={{ blurhash }}
                />
              </Grid>
              <Grid space="sm" flex={1}>
                <Grid>
                  <Typography variant="headline" weight="bold">
                    {pack.name} {`(${amountOfDares})`}
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
                          lineHeight: 19,
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
                <Typography variant="footnote" numberOfLines={3}>
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
