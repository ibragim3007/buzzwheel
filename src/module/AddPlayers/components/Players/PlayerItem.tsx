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
    <Paper paddingHorizontal={25} paddingVertical={18}>
      <Grid justfity="space-between" row>
        <Typography weight="medium" color="primary">
          {player.name}
        </Typography>
        <Pressable
          style={{
            width: 50,
            alignItems: "flex-end",
          }}
          onPress={() => deletePlayer(player.id)}
        >
          <Ionicons name="close" size={26} color={colors.text.primary} />
        </Pressable>
      </Grid>
    </Paper>
  );
}
