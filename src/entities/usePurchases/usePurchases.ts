import Purchases, { CustomerInfo, PurchasesOffering } from 'react-native-purchases';
import { create } from 'zustand';

interface State {
  customerInfo?: CustomerInfo;
  offering: PurchasesOffering | null;
}

interface Actions {
  setCustomerInfo: (customerInfo: CustomerInfo) => void;
}

export const usePurchases = create<State & Actions>(set => {
  const initValues = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      const offerings = await Purchases.getOfferings();
      set({ customerInfo, offering: offerings.current });
    } catch (e) {
      console.error('Error fetching customer info:', e);
    }
  };

  initValues();

  return {
    customerInfo: undefined,
    offering: null,

    setCustomerInfo: (customerInfo: CustomerInfo) => set({ customerInfo }),
  };
});
