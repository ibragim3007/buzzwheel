import { HORIZONTAL_PADDINGS } from "@/src/shared/config/constants/constants";
import { useTheme } from "@/src/shared/hooks/useTheme";
import Grid from "@/src/shared/ui/grid/Grid";
import GroupBy from "@/src/shared/ui/layout/GroupBy";
import Paper from "@/src/shared/ui/layout/Paper";
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import RoulettePicker from "./RoulettePicker/RoulettePicker";
import SwitchRepetition from "./SwitchRepetition/SwitchRepetition";
import ThemePicker from "./ThemePicker/ThemePicker";
import Button from "@/src/shared/ui/buttons/Button";
import { LocalStorage } from "@/src/shared/service/storage.service";
import { formatBytes } from "@/src/shared/utils/formatBytes";

export default function SettingsGame() {
  const colors = useTheme();

  const [size, setSize] = useState(0);
  useEffect(() => {
    (async () => {
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
          <GroupBy title="Dev">
            <Grid align="flex-start">
              <Button
                onPress={() => void LocalStorage.clearStorage("key")}
                title={`Clear cache (${formatBytes(size)})`}
              />
            </Grid>
          </GroupBy>
        </Grid>
      </BottomSheetScrollView>
    </BottomSheetView>
  );
}
