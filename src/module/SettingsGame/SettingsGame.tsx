import { useTheme } from "@/src/shared/hooks/useTheme";
import Grid from "@/src/shared/ui/grid/Grid";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import RoulettePicker from "./RoulettePicker/RoulettePicker";
import GroupBy from "@/src/shared/ui/layout/GroupBy";
import { HORIZONTAL_PADDINGS } from "@/src/shared/config/constants/constants";

export default function SettingsGame() {
  const colors = useTheme();
  return (
    <BottomSheetView style={{ flex: 1 }}>
      <Grid
        flex={1}
        paddingHorizontal={HORIZONTAL_PADDINGS}
        color={colors.background.secondary}
      >
        <GroupBy title="Выбор колеса">
          <RoulettePicker />
        </GroupBy>
      </Grid>
    </BottomSheetView>
  );
}
