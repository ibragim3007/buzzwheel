import { useApp } from '@/src/entities/appStore/app.store';
import SwitchLabel from '@/src/shared/ui/layout/SwitchLabel';

export default function VibrationToggle() {
  const { isVibrationEnabled, setVibration } = useApp();

  return <SwitchLabel onValueChange={value => setVibration(value)} label="Vibration" value={isVibrationEnabled} />;
}
