import ShieldIcon from '@/assets/images/paywall_icons/shieldIcon.png';
import SmileFace from '@/assets/images/paywall_icons/smile_face.png';
import UnlockIcon from '@/assets/images/paywall_icons/unlock_icon.png';
import Grid from '@/src/shared/ui/grid/Grid';
import { Image } from 'expo-image';
import ItemPaywall from './ItemPaywall';
import { useTranslation } from 'react-i18next';

export default function PaywallItems() {
  const { t } = useTranslation();
  return (
    <Grid space="md" align="center">
      <ItemPaywall
        icon={<Image source={UnlockIcon} contentFit="cover" style={{ width: 40, height: 40 }} />}
        title={t('paywall.unlock-all-modes')}
      />
      <ItemPaywall
        icon={<Image source={ShieldIcon} contentFit="cover" style={{ width: 40, height: 40 }} />}
        title={t('paywall.cancel-any-time')}
      />
      <ItemPaywall
        icon={<Image source={SmileFace} contentFit="cover" style={{ width: 40, height: 40 }} />}
        title={t('paywall.unforgettable-emotions')}
      />
    </Grid>
  );
}
