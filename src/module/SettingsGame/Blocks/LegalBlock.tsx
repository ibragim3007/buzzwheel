import { LINKS } from '@/src/shared/config/constants/constants';
import { useTheme } from '@/src/shared/hooks/useTheme';
import SettingItem from '@/src/shared/ui/elements/SettingsItem';
import GroupBy from '@/src/shared/ui/layout/GroupBy';
import Feather from '@expo/vector-icons/Feather';
import { Linking } from 'react-native';

export default function LegalBlock() {
  const colors = useTheme();

  const onPressPrivacyPolicy = async () => {
    if (await Linking.canOpenURL(LINKS.privacyPolicy)) {
      Linking.openURL(LINKS.privacyPolicy);
    }
  };
  const onPressTermsOfUse = async () => {
    if (await Linking.canOpenURL(LINKS.termsOfUse)) {
      Linking.openURL(LINKS.termsOfUse);
    }
  };

  return (
    <GroupBy title="Legal">
      <SettingItem
        onPress={onPressPrivacyPolicy}
        leftIcon={<Feather name="shield" size={24} color={colors.text.primary} />}
        title={'Privacy Policy'}
      />
      <SettingItem
        onPress={onPressTermsOfUse}
        leftIcon={<Feather name="book" size={24} color={colors.text.primary} />}
        title={'Terms of Use'}
      />
    </GroupBy>
  );
}
