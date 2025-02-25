import { useGiftRepositroy } from "@/src/entities/Gift/gift.repository";
import { useSettings } from "@/src/entities/Settings/settings.repository";
import { SettingsConstants } from "@/src/shared/config/constants/settingsOptions";
import { PalitraInterface } from "@/src/shared/config/theme/theme";
import { useTheme } from "@/src/shared/hooks/useTheme";
import { useVibration } from "@/src/shared/hooks/useVibration";
import LockElement from "@/src/shared/ui/elements/LockElement";
import SmallAppThemeElem from "@/src/shared/ui/elements/SmallAppThemeElem";
import Grid from "@/src/shared/ui/grid/Grid";
import HorizontalListPicker from "@/src/shared/ui/layout/HorizontalListPicker";
import React from "react";
import { Alert, Pressable } from "react-native";

export default function ThemePicker() {
  const colors = useTheme();
  const { setTheme } = useSettings();
  const { vibrateSelection } = useVibration();
  const { unlockedThemes } = useGiftRepositroy();

  const onChangeTheme = (theme: PalitraInterface, isUnlocked: boolean) => {
    if (!theme.isFree && !isUnlocked) {
      Alert.alert("Available in the full version");
      return;
    }
    setTheme(theme);
    vibrateSelection();
  };

  const initialScrollIndex =
    SettingsConstants.themes.findIndex((t) => t.id === colors.id) || 0;

  return (
    <Grid>
      <HorizontalListPicker
        ITEM_SIZE={100}
        data={SettingsConstants.themes}
        initialScrollIndex={initialScrollIndex}
        renderItem={({ item }) => {
          const isPicked = colors.id === item.id;
          const isUnlocked = unlockedThemes.includes(item.id);
          const isAvaialble = item.isFree || isUnlocked;
          return (
            <Pressable onPress={() => onChangeTheme(item, isAvaialble)}>
              <Grid
                color={isPicked ? colors.background.secondary : "transparent"}
                justfity="center"
                padding={7}
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: isPicked ? "#ffffff23" : "transparent",
                }}
              >
                {!isAvaialble && <LockElement />}
                <SmallAppThemeElem theme={item} />
              </Grid>
            </Pressable>
          );
        }}
      />
    </Grid>
  );
}
