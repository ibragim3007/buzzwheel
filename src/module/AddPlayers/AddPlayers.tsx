import { usePlayerStore } from "@/src/entities/Player/player.store";
import { useTheme } from "@/src/shared/hooks/useTheme";
import Button from "@/src/shared/ui/buttons/Button";
import Grid from "@/src/shared/ui/grid/Grid";
import { normalizedSize } from "@/src/shared/utils/size";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import Input from "./components/Input/Input";
import Players from "./components/Players/Players";

export default function AddPlayers() {
  const colors = useTheme();
  const { players, addNewPlayer } = usePlayerStore();
  const { navigate } = useRouter();

  const onPressStart = () => {
    navigate("/screens/packages");
  };

  return (
    <Grid space="lg" color={colors.background.primary} height="100%">
      <Input onCall={(name) => addNewPlayer(name)} />

      <Grid style={{ overflow: "hidden", position: "relative" }}>
        <ScrollView
          scrollIndicatorInsets={{ top: 40, bottom: 40 }}
          style={{
            height: normalizedSize(360),
            backgroundColor: colors.background.secondary,
            paddingHorizontal: 15,
            paddingVertical: 20,
            borderRadius: 30,
          }}
        >
          <Players players={players} />
        </ScrollView>
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.4)"]} // Цвет тени
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 30, // Высота тени
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
        startIcon={
          <Ionicons name="play" size={24} color={colors.text.primary} />
        }
      />
    </Grid>
  );
}
