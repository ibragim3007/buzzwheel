import { HORIZONTAL_PADDINGS } from "@/src/shared/config/constants/constants";
import { useTheme } from "@/src/shared/hooks/useTheme";
import Grid from "@/src/shared/ui/grid/Grid";
import GroupBy from "@/src/shared/ui/layout/GroupBy";
import Paper from "@/src/shared/ui/layout/Paper";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { ScrollView } from "react-native";
import RoulettePicker from "./RoulettePicker/RoulettePicker";
import SwitchRepetition from "./SwitchRepetition/SwitchRepetition";
import ThemePicker from "./ThemePicker/ThemePicker";

export default function SettingsGame() {
  const colors = useTheme();
  return (
    <BottomSheetView style={{ flex: 1 }}>
      <ScrollView>
        <Grid
          flex={1}
          paddingHorizontal={HORIZONTAL_PADDINGS}
          color={colors.background.secondary}
          paddingBottom={40}
          space="lg"
        >
          <GroupBy title="Настройки">
            <Paper
              paddingHorizontal={10}
              style={{ backgroundColor: colors.background.primary }}
            >
              <SwitchRepetition />
            </Paper>
          </GroupBy>
          <GroupBy title="Выбор колеса">
            <RoulettePicker />
          </GroupBy>
          <GroupBy title={"Выбор темы"}>
            <ThemePicker />
          </GroupBy>
        </Grid>
      </ScrollView>
    </BottomSheetView>
  );
}
