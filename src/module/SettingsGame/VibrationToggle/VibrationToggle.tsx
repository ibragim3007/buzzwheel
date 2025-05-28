import { useApp } from '@/src/entities/appStore/app.store';
import SwitchLabel from '@/src/shared/ui/layout/SwitchLabel';
import { useTranslation } from 'react-i18next';

export default function VibrationToggle() {
  const { isVibrationEnabled, setVibration } = useApp();
  const { t } = useTranslation();
  return (
    <SwitchLabel
      onValueChange={value => setVibration(value)}
      label={t('settings.vibration')}
      value={isVibrationEnabled}
    />
  );
}
