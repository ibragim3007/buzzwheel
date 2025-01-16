import { useMode } from "@/src/entities/Mode/useMode";
import Grid from "@/src/shared/ui/grid/Grid";
import React from "react";
import ModeItem from "./ModeItem";
import { Mode } from "@/src/entities/Mode/types/types";

export default function Modes() {
  const { modes, pickedModes, toggleMode } = useMode();

  const onToggleMode = (mode: Mode) => {
    toggleMode(mode);
  };

  return (
    <Grid space="md">
      {modes.map((mode) => {
        const isPicked = pickedModes.map((pM) => pM.id).includes(mode.id);
        return (
          <ModeItem
            onPress={onToggleMode}
            picked={isPicked}
            key={mode.id}
            mode={mode}
          />
        );
      })}
    </Grid>
  );
}
