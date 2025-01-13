import Grid from "@/src/shared/ui/grid/Grid";
import Typography from "@/src/shared/ui/typography/Typography";

import React from "react";
import Input from "./components/Input/Input";
import { usePlayerStore } from "@/src/entities/Player/player.store";
import Players from "./components/Players/Players";
import Button from "@/src/shared/ui/buttons/Button";

export default function AddPlayers() {
  const { players, addNewPlayer } = usePlayerStore();

  return (
    <Grid space="lg">
      <Input onCall={(name) => addNewPlayer(name)} />

      <Players players={players} />
      <Button title="Start" />
    </Grid>
  );
}
