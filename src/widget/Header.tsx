import React, { useCallback, useRef } from "react";
import Grid from "../shared/ui/grid/Grid";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../shared/hooks/useTheme";
import { useNavigation, useRouter } from "expo-router";
import WrapIconInCircle from "../shared/ui/wrapper/WrapIconInCircle";
import WrapIconInPressable from "../shared/ui/wrapper/WrapIconInPressable";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useVibration } from "../shared/hooks/useVibration";
import HandleComponent from "../shared/ui/elements/HandleComponent";
import { SettingsGame } from "../module/SettingsGame";

interface HeaderProps {
  back?: boolean;
  onPressSettings?: () => void;
}

export default function Header({ back, onPressSettings }: HeaderProps) {
  const colors = useTheme();
  const { navigate } = useRouter();
  const onPressBack = () => {
    navigate("..");
  };

  const { vibrateMedium } = useVibration();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    if (!bottomSheetModalRef.current) return;
    vibrateMedium();
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  return (
    <Grid>
      {back ? (
        <Grid width="100%" row justfity="space-between">
          <WrapIconInPressable onPress={onPressBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </WrapIconInPressable>

          {onPressSettings && (
            <WrapIconInPressable onPress={onPressSettings}>
              <Ionicons
                name="settings-sharp"
                size={24}
                color={colors.text.primary}
              />
            </WrapIconInPressable>
          )}
        </Grid>
      ) : (
        <Grid row>
          <WrapIconInPressable onPress={handlePresentModalPress}>
            <Ionicons
              name="settings-sharp"
              size={24}
              color={colors.text.primary}
            />
          </WrapIconInPressable>
        </Grid>
      )}
      <BottomSheetModal
        index={1}
        snapPoints={["40%"]}
        ref={bottomSheetModalRef}
        enablePanDownToClose={true}
        enableHandlePanningGesture={true}
        enableContentPanningGesture={true}
        keyboardBehavior="interactive"
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
