import { usePlayerStore } from '@/src/entities/Player/player.store';
import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import { HORIZONTAL_PADDINGS } from '@/src/shared/config/constants/constants';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { LocalStorage } from '@/src/shared/service/storage.service';
import Grid from '@/src/shared/ui/grid/Grid';
import GroupBy from '@/src/shared/ui/layout/GroupBy';
import Paper from '@/src/shared/ui/layout/Paper';
import { formatBytes } from '@/src/shared/utils/formatBytes';
import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native';
import { LanguagePicker } from '../LanguagePicker';
import LegalBlock from './Blocks/LegalBlock';
import RateBlock from './Blocks/RateBlock';
import VibrationToggle from './VibrationToggle/VibrationToggle';

export default function SettingsGame() {
  const colors = useTheme();
  const { t } = useTranslation();
  const { customerInfo } = usePurchases();
  const { players } = usePlayerStore();
  const isDev = players[0]?.name === 'developer7';

  const copyToken = async () => {
    if (customerInfo?.originalAppUserId) {
      await Clipboard.setStringAsync(customerInfo?.originalAppUserId || 'undefiend');
      alert(t('settings.token-copied'));
    } else {
      alert(t('settings.no-token-available'));
    }
  };

  const [size, setSize] = useState(0);
  useEffect(() => {
    void (async () => {
      const size = await LocalStorage.calculateSize();
      setSize(size);
    })();
  }, []);
  return (
    <BottomSheetView style={{ flex: 1 }}>
      <BottomSheetScrollView>
        <Grid
          flex={1}
          paddingHorizontal={HORIZONTAL_PADDINGS}
          color={colors.background.secondary}
          paddingBottom={40}
          space="lg"
        >
          <GroupBy title={t('settings.title')}>
            <LanguagePicker />
            <Paper paddingHorizontal={15} style={{ backgroundColor: colors.background.primary }}>
              <VibrationToggle />
            </Paper>

            {/* <DrinkModeToggle /> */}
          </GroupBy>
          {/* <GroupBy title="Выбор колеса">
            <RoulettePicker />
          </GroupBy> */}
          <RateBlock />
          <LegalBlock />
          {/* <GroupBy title={'Выбор темы'}>
            <ThemePicker />
          </GroupBy> */}
          {isDev && (
            <GroupBy title="Dev">
              <Grid align="flex-start">
                <Button onPress={copyToken} title={t('settings.copy-token')} />
                <Button
                  onPress={() => void LocalStorage.clearStorage('key')}
                  title={`Clear cache (${formatBytes(size)})`}
                />
              </Grid>
            </GroupBy>
          )}
        </Grid>
      </BottomSheetScrollView>
    </BottomSheetView>
  );
}
