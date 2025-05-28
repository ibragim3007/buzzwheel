import { LINKS } from '@/src/shared/config/constants/constants';
import { useTheme } from '@/src/shared/hooks/useTheme';
import SettingItem from '@/src/shared/ui/elements/SettingsItem';
import GroupBy from '@/src/shared/ui/layout/GroupBy';
import Feather from '@expo/vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';

export default function LegalBlock() {
  const colors = useTheme();
  const { t } = useTranslation();

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
    <GroupBy title={t('settings.legal')}>
      <SettingItem
        onPress={onPressPrivacyPolicy}
        leftIcon={<Feather name="shield" size={24} color={colors.text.primary} />}
        title={t('settings.privacy')}
      />
      <SettingItem
        onPress={onPressTermsOfUse}
        leftIcon={<Feather name="book" size={24} color={colors.text.primary} />}
        title={t('paywall.terms')}
      />
    </GroupBy>
  );
}
