import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import CustomModal from '@/src/entities/Modal/ui/CustomModal';
import { toastConfig } from '@/src/shared/config/toast';
import ThemeProvider from '@/src/shared/providers/ThemeProvider';

import { Manrope_300Light } from '@expo-google-fonts/manrope/300Light';
import { Manrope_400Regular } from '@expo-google-fonts/manrope/400Regular';
import { Manrope_500Medium } from '@expo-google-fonts/manrope/500Medium';
import { Manrope_600SemiBold } from '@expo-google-fonts/manrope/600SemiBold';
import { Manrope_700Bold } from '@expo-google-fonts/manrope/700Bold';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { I18nManager, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import StackRoute from './stack';

import { Rubik_300Light } from '@expo-google-fonts/rubik/300Light';
import { Rubik_400Regular } from '@expo-google-fonts/rubik/400Regular';
import { Rubik_500Medium } from '@expo-google-fonts/rubik/500Medium';
import { Rubik_700Bold } from '@expo-google-fonts/rubik/700Bold';
import { Rubik_800ExtraBold } from '@expo-google-fonts/rubik/800ExtraBold';
import { Rubik_900Black } from '@expo-google-fonts/rubik/900Black';

import { PassionOne_400Regular } from '@expo-google-fonts/passion-one/400Regular';
import { PassionOne_700Bold } from '@expo-google-fonts/passion-one/700Bold';
import { PassionOne_900Black } from '@expo-google-fonts/passion-one/900Black';

import { modesRu } from '@/assets/package_mock/modes';
import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import { getActualImageLink } from '@/src/shared/helpers/getActualImageLink';
import { preloadImages } from '@/src/shared/service/preload.service';
import { I18nextProvider, useTranslation } from 'react-i18next';
import Purchases from 'react-native-purchases';
import i18n from '@/src/shared/providers/i18n';
import { vexo } from 'vexo-analytics';
import * as Sentry from '@sentry/react-native';
import Grid from '@/src/shared/ui/grid/Grid';
import { customTheme } from '@/src/shared/config/theme/theme';

Sentry.init({
  dsn: 'https://663038e91c353db48e2d250a8446f0b7@o4509188089708544.ingest.us.sentry.io/4509407262670848',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  spotlight: __DEV__,
});

if (!__DEV__) {
  vexo('1aea5fc9-e226-4e8f-b22f-7e86b51c5c7d');
}

preloadImages(modesRu.map(mode => getActualImageLink(mode.imageEncoded)));

const isRTL = i18n.language.startsWith('ar');
I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);
// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();

export default Sentry.wrap(function RootLayout() {
  const { i18n } = useTranslation(); // автоматический re-render при смене языка
  const [loaded] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,

    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
    Rubik_800ExtraBold,
    Rubik_900Black,

    PassionOne_400Regular,
    PassionOne_700Bold,
    PassionOne_900Black,
  });

  const { setCustomerInfo } = usePurchases();

  useEffect(() => {
    try {
      Purchases.addCustomerInfoUpdateListener(customerInfo => {
        // Handle customer info updates
        setCustomerInfo(customerInfo);
      });
    } catch (error) {
      console.error('Error configuring RevenueCat:', error);
    }
  }, []);

  // AppState.addEventListener('change', async nextAppState => {
  //   if (nextAppState === 'active') {
  //     try {
  //       Purchases.addCustomerInfoUpdateListener(customerInfo => {
  //         // Handle customer info updates
  //         console.log('Customer info updated');
  //         setCustomerInfo(customerInfo);
  //       });
  //     } catch (error) {
  //       console.error('Error configuring RevenueCat:', error);
  //     }
  //   }
  // });

  useEffect(() => {
    if (loaded) void SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <I18nextProvider i18n={i18n}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <BottomSheetModalProvider>
            <StatusBar hidden />
            <CustomModal />
            <StackRoute />
            <Toast position="top" config={toastConfig} />
          </BottomSheetModalProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </I18nextProvider>
  );
});
