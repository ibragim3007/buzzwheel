import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { useCallback, useRef } from 'react';
import { SettingsGame } from '../module/SettingsGame';
import { useTheme } from '../shared/hooks/useTheme';
import { useVibration } from '../shared/hooks/useVibration';
import HandleComponent from '../shared/ui/elements/HandleComponent';
import Grid from '../shared/ui/grid/Grid';
import WrapIconInPressable from '../shared/ui/wrapper/WrapIconInPressable';
import ProButton from './ui/ProButton';

interface HeaderProps {
  back?: boolean;
  onPressSettings?: () => void;
}

export default function Header({ back, onPressSettings }: HeaderProps) {
  const colors = useTheme();
  const { navigate } = useRouter();
  const onPressBack = () => {
    navigate('..');
  };

  const { vibrate } = useVibration();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    if (!bottomSheetModalRef.current) return;
    vibrate();
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  return (
    <Grid justfity="center">
      {back ? (
        <Grid width="100%" row justfity="space-between">
          <WrapIconInPressable onPress={onPressBack}>
            <Ionicons name="arrow-back" size={22} color={colors.text.primary} />
          </WrapIconInPressable>

          <WrapIconInPressable onPress={handlePresentModalPress}>
            <Ionicons name="settings-sharp" size={22} color={colors.text.primary} />
          </WrapIconInPressable>
        </Grid>
      ) : (
        <Grid row align="center" justfity="space-between">
          <WrapIconInPressable onPress={handlePresentModalPress}>
            <Ionicons name="settings-sharp" size={24} color={colors.text.primary} />
          </WrapIconInPressable>
          <Grid align="center" space="md" row>
            {/* <GiftIcon /> */}
            <ProButton />
          </Grid>
        </Grid>
      )}
      <BottomSheetModal
        index={0}
        snapPoints={['55%']}
        ref={bottomSheetModalRef}
        // enablePanDownToClose={true}
        // enableHandlePanningGesture={true}
        // enableContentPanningGesture={true}
        // keyboardBehavior="interactive"
        onChange={handleSheetChanges}
        handleComponent={HandleComponent}
        backgroundStyle={{
          backgroundColor: colors.background.secondary,
          borderRadius: 20,
        }}
      >
        <SettingsGame />
      </BottomSheetModal>
    </Grid>
  );
}
