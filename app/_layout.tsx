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
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import StackRoute from './stack';

import { Rubik_300Light } from '@expo-google-fonts/rubik/300Light';
import { Rubik_400Regular } from '@expo-google-fonts/rubik/400Regular';
import { Rubik_500Medium } from '@expo-google-fonts/rubik/500Medium';
import { Rubik_700Bold } from '@expo-google-fonts/rubik/700Bold';
import { Rubik_800ExtraBold } from '@expo-google-fonts/rubik/800ExtraBold';
import { Rubik_900Black } from '@expo-google-fonts/rubik/900Black';

import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import Purchases from 'react-native-purchases';
import { modesRu } from '@/assets/package_mock/modes';
import { preloadImages } from '@/src/shared/service/preload.service';
import { getActualImageLink } from '@/src/shared/helpers/getActualImageLink';

preloadImages(modesRu.map(mode => getActualImageLink(mode.imageEncoded)));

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
  });

  const { setCustomerInfo } = usePurchases();

  useEffect(() => {
    try {
      Purchases.addCustomerInfoUpdateListener(customerInfo => {
        // Handle customer info updates
        console.log('Customer info updated');
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider>
          <StatusBar hidden />
          <CustomModal />
          <StackRoute />
          <Toast position="top" config={toastConfig} />
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
