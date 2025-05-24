import { HORIZONTAL_PADDINGS } from '@/src/shared/config/constants/constants';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { LocalStorage } from '@/src/shared/service/storage.service';
import Button from '@/src/shared/ui/buttons/Button';
import Grid from '@/src/shared/ui/grid/Grid';
import GroupBy from '@/src/shared/ui/layout/GroupBy';
import Paper from '@/src/shared/ui/layout/Paper';
import { formatBytes } from '@/src/shared/utils/formatBytes';
import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useEffect, useState } from 'react';
import LegalBlock from './Blocks/LegalBlock';
import SwitchRepetition from './SwitchRepetition/SwitchRepetition';
import RateBlock from './Blocks/RateBlock';

export default function SettingsGame() {
  const colors = useTheme();

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
          <GroupBy title="Настройки">
            <Paper paddingHorizontal={10} style={{ backgroundColor: colors.background.primary }}>
              <SwitchRepetition />
            </Paper>
          </GroupBy>
          {/* <GroupBy title="Выбор колеса">
            <RoulettePicker />
          </GroupBy> */}
          <RateBlock />
          <LegalBlock />
          {/* <GroupBy title={'Выбор темы'}>
            <ThemePicker />
          </GroupBy> */}
          {__DEV__ && (
            <GroupBy title="Dev">
              <Grid align="flex-start">
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
