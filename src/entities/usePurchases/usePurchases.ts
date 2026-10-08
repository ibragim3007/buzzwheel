import { REVENUE_CAT_API_ANDROID, REVENUE_CAT_API_IOS } from '@/src/shared/config/constants/constants';
import { Platform } from 'react-native';
import Purchases, { CustomerInfo, PurchasesOffering } from 'react-native-purchases';
import { create } from 'zustand';

const OFFERING_ID = 'new-offering-yearly-weekly';

interface State {
  customerInfo?: CustomerInfo;
  isActiveSubscription?: boolean;
  offering: PurchasesOffering | null;
  isOfferingLoading: boolean;
}

interface Actions {
  setCustomerInfo: (customerInfo: CustomerInfo) => void;
  loadOffering: () => Promise<void>;
}

export const usePurchases = create<State & Actions>((set, get) => {
  const configure = () => {
    try {
      void Purchases.setLogLevel(__DEV__ ? Purchases.LOG_LEVEL.DEBUG : Purchases.LOG_LEVEL.WARN);

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
    } catch (e) {
      console.error('Error configuring RevenueCat:', e);
    }
  };

  const loadCustomerInfo = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      get().setCustomerInfo(customerInfo);
    } catch (e) {
      console.error('Error fetching customer info:', e);
    }
  };

  // Можно вызывать повторно (например, при открытии пейвола), если первая загрузка упала без сети
  const loadOffering = async () => {
    if (get().isOfferingLoading) return;

    set({ isOfferingLoading: true });
    try {
      const offerings = await Purchases.getOfferings();
      set({ offering: offerings.all[OFFERING_ID] || null });
    } catch (e) {
      console.error('Error fetching offerings:', e);
    } finally {
      set({ isOfferingLoading: false });
    }
  };

  configure();
  // Откладываем, чтобы стор успел инициализироваться до первого get()
  setTimeout(() => {
    void loadCustomerInfo();
    void loadOffering();
  }, 0);

  return {
    customerInfo: undefined,
    offering: null,
    isOfferingLoading: false,
    isActiveSubscription: false,

    setCustomerInfo: (customerInfo: CustomerInfo) => {
      const isActiveSubscription = customerInfo.activeSubscriptions.length > 0;

      set({ customerInfo, isActiveSubscription });
    },

    loadOffering,
  };
});
