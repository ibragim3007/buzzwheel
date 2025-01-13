import { Player } from "@/src/entities/Player/type";
import Grid from "@/src/shared/ui/grid/Grid";
import React from "react";
import PlayerItem from "./PlayerItem";
import { ScrollView } from "react-native";

interface PlayersProps {
  players: Player[];
}

export default function Players({ players }: PlayersProps) {
  return (
    <ScrollView style={{ height: 460 }}>
      <Grid space="md">
        {players.map((p) => (
          <PlayerItem key={p.id} player={p} />
        ))}
      </Grid>
    </ScrollView>
  );
}
