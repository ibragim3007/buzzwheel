import { APP_STORE_LINK } from '@/src/shared/config/constants/constants';
import { useTheme } from '@/src/shared/hooks/useTheme';
import SettingsItem from '@/src/shared/ui/elements/SettingsItem';
import GroupBy from '@/src/shared/ui/layout/GroupBy';
import { FontAwesome } from '@expo/vector-icons';
// import * as StoreReview from 'expo-store-review';
import { Linking } from 'react-native';

export default function RateBlock() {
  const colors = useTheme();

  // const { subscriptionStatus } = useSubscription();

  // const handleRatePress = async () => {
  //   if (await StoreReview.isAvailableAsync()) {
  //     StoreReview.requestReview();
  //   }
  // };

  const handleFeedbackPress = async () => {
    if (await Linking.canOpenURL(APP_STORE_LINK)) {
      await Linking.openURL(APP_STORE_LINK);
    }
  };

  return (
    <GroupBy title={'Give us feedback'}>
      <SettingsItem
        onPress={handleFeedbackPress}
        leftIcon={<FontAwesome name="commenting" size={24} color={colors.text.primary} />}
        title={'Write review'}
        prefix={'Your feedback is important for us!'}
      />
      <SettingsItem
        textColor={colors.background.primary}
        color={colors.accent.primary}
        // onPress={handleRatePress}
        leftIcon={<FontAwesome name="star" size={24} color={colors.text.black} />}
        title={'Rate us'}
      />
    </GroupBy>
  );
}
