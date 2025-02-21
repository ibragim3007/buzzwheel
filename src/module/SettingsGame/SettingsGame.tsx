import { useTheme } from "@/src/shared/hooks/useTheme";
import Grid from "@/src/shared/ui/grid/Grid";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import RoulettePicker from "./RoulettePicker/RoulettePicker";
import GroupBy from "@/src/shared/ui/layout/GroupBy";
import { HORIZONTAL_PADDINGS } from "@/src/shared/config/constants/constants";
import ThemePicker from "./ThemePicker/ThemePicker";
import { ScrollView } from "react-native";

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
