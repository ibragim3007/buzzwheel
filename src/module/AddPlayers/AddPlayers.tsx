import { usePlayerStore } from "@/src/entities/Player/player.store";
import { useTheme } from "@/src/shared/hooks/useTheme";
import Button from "@/src/shared/ui/buttons/Button";
import Grid from "@/src/shared/ui/grid/Grid";
import { normalizedSize } from "@/src/shared/utils/size";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView } from "react-native";
import Input from "./components/Input/Input";
import Players from "./components/Players/Players";
import { MAX_PLAYERS_FOR_FREE } from "@/src/shared/config/constants/constants";

export default function AddPlayers() {
  const colors = useTheme();
  const { players, addNewPlayer } = usePlayerStore();
  const { navigate } = useRouter();

  const isEnoughPlayers = players.length >= 2;

  const onAddNewPlayer = (name: string) => {
    if (players.length >= MAX_PLAYERS_FOR_FREE) {
      Alert.alert(
        "You have reached the maximum number of players for the free version"
      );
      return;
    }
    addNewPlayer(name);
  };

  const onPressStart = () => {
    if (!isEnoughPlayers) {
      Alert.alert("Add at least 2 players to start the game");
      return;
    }
    navigate("/screens/packages");
  };

  return (
    <Grid space="lg" height="100%">
      <Input onCall={onAddNewPlayer} />

      <Grid style={{ overflow: "hidden", position: "relative" }}>
        <ScrollView
          scrollIndicatorInsets={{ top: 40, bottom: 40 }}
          indicatorStyle="black"
          contentContainerStyle={{ paddingVertical: 15 }}
          style={{
            height: normalizedSize(360),
            backgroundColor: colors.background.secondary,
            paddingHorizontal: 10,
            borderRadius: 40,
          }}
        >
          <Players players={players} />
        </ScrollView>
        <LinearGradient
          colors={["transparent", colors.background.primary]} // Цвет тени
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.3,
            height: 60,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
          pointerEvents="none"
        />
      </Grid>

      <Button
        onPress={onPressStart}
        title={`Start Game ${
          players.length ? `(${players.length} players)` : ""
        }`}
        style={{
          backgroundColor: isEnoughPlayers
            ? colors.accent.primary
            : colors.background.secondary,
        }}
        startIcon={
          <Ionicons name="play" size={24} color={colors.text.primary} />
        }
      />
    </Grid>
  );
}
