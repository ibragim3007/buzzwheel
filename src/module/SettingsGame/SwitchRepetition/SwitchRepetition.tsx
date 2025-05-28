import { useSettings } from '@/src/entities/Settings/settings.repository';
import SwitchLabel from '@/src/shared/ui/layout/SwitchLabel';
import { useTranslation } from 'react-i18next';

export default function SwitchRepetition() {
  const { setRemoveRepetitions, isRemoveRepetitions } = useSettings();
  const { t } = useTranslation();
  const onChange = (value: boolean) => setRemoveRepetitions(value);

  return (
    <SwitchLabel
      onValueChange={value => onChange(value)}
      label={t('settings.disable-action-repeats')}
      value={isRemoveRepetitions}
    />
  );
}
