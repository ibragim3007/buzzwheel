import { Player } from "@/src/entities/Player/type";
import Grid from "@/src/shared/ui/grid/Grid";
import Paper from "@/src/shared/ui/layout/Paper";
import Typography from "@/src/shared/ui/typography/Typography";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/src/shared/hooks/useTheme";
import { usePlayerStore } from "@/src/entities/Player/player.store";
import { Pressable } from "react-native";

interface PlayerItemProps {
  player: Player;
}

export default function PlayerItem({ player }: PlayerItemProps) {
  const colors = useTheme();

  const { deletePlayer } = usePlayerStore();

  return (
    <Paper>
      <Grid justfity="space-between" row>
        <Typography weight="medium" color="secondary">
          {player.name}
        </Typography>
        <Pressable
          style={{
            // backgroundColor: "red",
            width: 50,
            alignItems: "flex-end",
          }}
          onPress={() => deletePlayer(player.id)}
        >
          <Ionicons name="close" size={24} color={colors.text.secondary} />
        </Pressable>
      </Grid>
    </Paper>
  );
}
