import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
import GradientShadow from '@/src/shared/ui/elements/GradientShadow';
import Grid, { GridPressable } from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import { navigate } from 'expo-router/build/global-state/routing';
import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Purchases, { PurchasesPackage } from 'react-native-purchases';

interface PaywallButtonProps {
  product: PurchasesPackage;
}

export default function PaywallButton({ product }: PaywallButtonProps) {
  const colors = useTheme();
  const { setCustomerInfo } = usePurchases();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { vibrateMedium } = useVibration();
  const navigation = useNavigation();

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };

    pulse();
  }, [scaleAnim]);

  const pressBuyButton = async () => {
    vibrateMedium();
    try {
      if (!product) {
        throw new Error('No offering identifier found');
      }

      const res = await Purchases.purchasePackage(product);
      if (res.customerInfo) {
        setCustomerInfo(res.customerInfo);
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigate('/');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <GridPressable onPress={pressBuyButton}>
        <LinearGradient
          start={[0, 0]}
          end={[1, 1]}
          style={{ borderRadius: 25, borderWidth: 1, borderColor: '#ffffff5f' }}
          colors={[colors.accent.primary, colors.accent.secondary]}
        >
          <Grid paddingHorizontal={40} paddingVertical={20}>
            <GradientShadow color="#ffffff85" />
            <Typography
              style={{ shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 12 }}
              variant="title-2"
              weight="bold"
            >
              Играть бесплатно
            </Typography>
          </Grid>
        </LinearGradient>
      </GridPressable>
    </Animated.View>
  );
}
