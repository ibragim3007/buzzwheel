import { APP_STORE_LINK } from '@/src/shared/config/constants/constants';
import { useLang } from '@/src/shared/hooks/lang/useLangStore';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { analytics, Events } from '@/src/shared/service/analytics.service';
import SettingsItem from '@/src/shared/ui/elements/SettingsItem';
import GroupBy from '@/src/shared/ui/layout/GroupBy';
import { FontAwesome } from '@expo/vector-icons';
import * as StoreReview from 'expo-store-review';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';

export default function RateBlock() {
  const colors = useTheme();
  const [isAvailableReview, setIsAvailableReview] = useState(false);

  useEffect(() => {
    const checkReviewAvailability = async () => {
      const isAvailable = await StoreReview.isAvailableAsync();
      setIsAvailableReview(isAvailable);
    };

    checkReviewAvailability();
  }, []);

  const { t } = useTranslation();
  const { lang } = useLang();
  const handleRatePress = async () => {
    try {
      if (isAvailableReview) {
        analytics.trackEvent(Events.pressRateUs, {
          open: true,
          local: lang,
        });

        StoreReview.requestReview();
      } else {
        analytics.trackEvent(Events.pressRateUs, {
          open: false,
          local: lang,
        });
      }
    } catch (error) {
      console.error('Failed to request review:', error);
    }
  };

  const handleFeedbackPress = async () => {
    try {
      if (await Linking.canOpenURL(APP_STORE_LINK)) {
        analytics.trackEvent(Events.pressWriteReview, {
          open: true,
          local: lang,
        });
        await Linking.openURL(APP_STORE_LINK);
      } else {
        analytics.trackEvent(Events.pressWriteReview, {
          open: false,
          local: lang,
        });
      }
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  return (
    <GroupBy title={t('settings.feedback-title')}>
      <SettingsItem
        onPress={handleFeedbackPress}
        leftIcon={<FontAwesome name="commenting" size={24} color={colors.text.primary} />}
        title={t('settings.write-review')}
        prefix={t('settings.feedback-subtext')}
      />
      {isAvailableReview && (
        <SettingsItem
          textColor={colors.text.white}
          color={colors.accent.primary}
          onPress={handleRatePress}
          leftIcon={<FontAwesome name="star" size={24} color={colors.text.white} />}
          title={t('settings.rate-us-title')}
        />
      )}
    </GroupBy>
  );
}
