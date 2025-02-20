import { useTheme } from "@/src/shared/hooks/useTheme";
import Grid from "@/src/shared/ui/grid/Grid";
import PageWrapper from "@/src/shared/ui/layout/PageWrapper";
import Typography from "@/src/shared/ui/typography/Typography";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";

export default function SettingsGame() {
  const colors = useTheme();
  return (
    <BottomSheetView style={{ flex: 1 }}>
      <Grid flex={1} color={colors.background.secondary}>
        <Typography>AWESOME</Typography>
      </Grid>
    </BottomSheetView>
  );
}
