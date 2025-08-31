import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import { useLang } from '@/src/shared/hooks/lang/useLangStore';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { analytics, Events } from '@/src/shared/service/analytics.service';
import GradientShadow from '@/src/shared/ui/elements/GradientShadow';
import Grid, { GridPressable } from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import { navigate } from 'expo-router/build/global-state/routing';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing } from 'react-native';
import Purchases, { PurchasesPackage } from 'react-native-purchases';

interface PaywallButtonProps {
  product: PurchasesPackage;
  title: string;
}

export default function PaywallButton({ product, title }: PaywallButtonProps) {
  const colors = useTheme();
  const { setCustomerInfo } = usePurchases();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { vibrateMedium } = useVibration();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };

    pulse();
  }, [scaleAnim]);

  const { lang } = useLang();
  const pressBuyButton = async () => {
    analytics.trackEvent(Events.pressBuyButtonInPaywall, {
      value: 'start',
      productId: product.product.identifier,
      local: lang,
    });
    setIsLoading(true);
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
      analytics.trackEvent(Events.pressBuyButtonInPaywall, {
        value: 'error (dismissed)',
        productId: product.product.identifier,
        local: lang,
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: isLoading ? 1 : scaleAnim }], width: '85%' }}>
      <GridPressable onPress={pressBuyButton}>
        <LinearGradient
          start={[0, 0]}
          end={[1, 1]}
          style={{ borderRadius: 25, borderWidth: 1, borderColor: '#ffffff5f' }}
          colors={[colors.accent.primary, colors.accent.secondary]}
        >
          <Grid height={70} justfity="center" paddingHorizontal={10} paddingVertical={20}>
            <GradientShadow color="#ffffff85" />
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Typography
                style={{ shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 12 }}
                variant="title-2"
                weight="bold"
                textAlign="center"
              >
                {title}
              </Typography>
            )}
          </Grid>
        </LinearGradient>
      </GridPressable>
    </Animated.View>
  );
}
