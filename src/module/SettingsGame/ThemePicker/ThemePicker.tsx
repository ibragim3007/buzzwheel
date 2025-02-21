import { useSettings } from "@/src/entities/Settings/settings.repository";
import { SettingsConstants } from "@/src/shared/config/constants/settingsOptions";
import { PalitraInterface } from "@/src/shared/config/theme/theme";
import { useTheme } from "@/src/shared/hooks/useTheme";
import { useVibration } from "@/src/shared/hooks/useVibration";
import SmallAppThemeElem from "@/src/shared/ui/elements/SmallAppThemeElem";
import Grid from "@/src/shared/ui/grid/Grid";
import HorizontalListPicker from "@/src/shared/ui/layout/HorizontalListPicker";
import React from "react";
import { Pressable } from "react-native";

export default function ThemePicker() {
  const colors = useTheme();
  const { setTheme } = useSettings();
  const { vibrateSelection } = useVibration();

  const onChangeTheme = (theme: PalitraInterface) => {
    setTheme(theme);
    vibrateSelection();
  };

  return (
    <Grid>
      <HorizontalListPicker
        ITEM_SIZE={100}
        data={SettingsConstants.themes}
        renderItem={({ item, index }) => {
          const isPicked = colors.id === item.id;
          return (
            <Pressable onPress={() => onChangeTheme(item)}>
              <Grid
                color={isPicked ? colors.background.secondary : "transparent"}
                padding={7}
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: isPicked ? "#ffffff23" : "transparent",
                }}
              >
                <SmallAppThemeElem theme={item} />
              </Grid>
            </Pressable>
          );
        }}
      />
    </Grid>
  );
}
