import { REVENUE_CAT_API_ANDROID, REVENUE_CAT_API_IOS } from '@/src/shared/config/constants/constants';
import { Platform } from 'react-native';
import Purchases, { CustomerInfo, PurchasesOffering } from 'react-native-purchases';
import { create } from 'zustand';

interface State {
  customerInfo?: CustomerInfo;
  isActiveSubscription?: boolean;
  offering: PurchasesOffering | null;
}

interface Actions {
  setCustomerInfo: (customerInfo: CustomerInfo) => void;
}

export const usePurchases = create<State & Actions>(set => {
  const initValues = async () => {
    try {
      Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);

      // Configure RevenueCat based on the platform
      if (Platform.OS === 'ios') {
        Purchases.configure({
          apiKey: REVENUE_CAT_API_IOS,
        });
      } else if (Platform.OS === 'android') {
        Purchases.configure({
          apiKey: REVENUE_CAT_API_ANDROID,
        });
      }

      const customerInfo = await Purchases.getCustomerInfo();
      const offerings = await Purchases.getOfferings();
      const isActiveSubscription = customerInfo.activeSubscriptions.length > 0;
      set({ customerInfo, offering: offerings.current, isActiveSubscription });
    } catch (e) {
      console.error('Error fetching customer info:', e);
    }
  };

  initValues();

  return {
    customerInfo: undefined,
    offering: null,
    isActiveSubscription: false,

    setCustomerInfo: (customerInfo: CustomerInfo) => set({ customerInfo }),
  };
});
