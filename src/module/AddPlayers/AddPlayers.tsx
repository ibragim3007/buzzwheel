import { usePlayerStore } from "@/src/entities/Player/player.store";
import Button from "@/src/shared/ui/buttons/Button";
import Grid from "@/src/shared/ui/grid/Grid";
import React from "react";
import Input from "./components/Input/Input";
import Players from "./components/Players/Players";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/src/shared/hooks/useTheme";
import { useRouter } from "expo-router";

export default function AddPlayers() {
  const colors = useTheme();
  const { players, addNewPlayer } = usePlayerStore();
  const { navigate } = useRouter();

  const onPressStart = () => {
    navigate("/screens/game");
  };

  return (
    <Grid space="lg">
      <Input onCall={(name) => addNewPlayer(name)} />

      <Players players={players} />
      <Button
        onPress={onPressStart}
        title={`Start Game ${
          players.length ? `(${players.length} players)` : ""
        }`}
        startIcon={
          <Ionicons name="play" size={24} color={colors.background.primary} />
        }
      />
    </Grid>
  );
}
