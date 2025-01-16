import { Mode } from "@/src/entities/Mode/types/types";
import { useTheme } from "@/src/shared/hooks/useTheme";
import Grid from "@/src/shared/ui/grid/Grid";
import Checked from "@/src/shared/ui/icons/Checked";

import Paper from "@/src/shared/ui/layout/Paper";
import Typography from "@/src/shared/ui/typography/Typography";
import React from "react";
import { Image, Pressable } from "react-native";

interface ModeItemProps {
  mode: Mode;
  picked: boolean;
  onPress: (mode: Mode) => void;
}

export default function ModeItem({ mode, picked, onPress }: ModeItemProps) {
  const colors = useTheme();
  return (
    <Pressable onPress={() => onPress(mode)}>
      <Paper
        style={{
          backgroundColor: colors.background.secondary,
          borderRadius: 50,
          borderWidth: 3,
          borderColor: picked ? colors.accent.primary : "transparent",
        }}
        paddingVertical={10}
        paddingHorizontal={25}
      >
        {picked && <Checked />}
        <Grid row space="md" align="center">
          <Image height={50} width={50} source={{ uri: mode.image }} />
          <Grid space="sm" flex={1}>
            <Typography variant="headline" weight="bold">
              {mode.name}
            </Typography>
            <Typography variant="callout" numberOfLines={3}>
              {mode.description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Pressable>
  );
}
