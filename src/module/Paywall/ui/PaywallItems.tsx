import ShieldIcon from '@/assets/images/paywall_icons/shieldIcon.png';
import SmileFace from '@/assets/images/paywall_icons/smile_face.png';
import UnlockIcon from '@/assets/images/paywall_icons/unlock_icon.png';
import Grid from '@/src/shared/ui/grid/Grid';
import { Image } from 'expo-image';
import ItemPaywall from './ItemPaywall';

export default function PaywallItems() {
  return (
    <Grid space="md" align="center">
      <ItemPaywall
        icon={<Image source={UnlockIcon} contentFit="cover" style={{ width: 40, height: 40 }} />}
        title="Доступ ко всем режимам"
      />
      <ItemPaywall
        icon={<Image source={ShieldIcon} contentFit="cover" style={{ width: 40, height: 40 }} />}
        title="Отмена в любой момент"
      />
      <ItemPaywall
        icon={<Image source={SmileFace} contentFit="cover" style={{ width: 40, height: 40 }} />}
        title="Незабываемые эмоции"
      />
    </Grid>
  );
}
