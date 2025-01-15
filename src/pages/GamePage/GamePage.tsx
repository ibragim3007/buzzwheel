import { usePlayerStore } from "@/src/entities/Player/player.store";
import { SegmentType } from "@/src/entities/Roulette/types";
import { Roulette } from "@/src/module/Roulette";
import { DefaultRouletteOptions } from "@/src/module/Roulette/config/config";
import { convertPlayersToSegments } from "@/src/module/Roulette/helpers/convertPlayersToSegments";
import React from "react";
import { Alert, View } from "react-native";

// const segments = [
//   { id: 1, label: "Player 1", color: "#3d7a3d" },
//   { id: 2, label: "Player 2", color: "#39b844" },
//   { id: 3, label: "Player 3", color: "#3d7a3d" },
//   { id: 4, label: "Player 4", color: "#39b844" },
//   { id: 5, label: "Player 5", color: "#3d7a3d" },
//   { id: 6, label: "Player 6", color: "#39b844" },
//   { id: 7, label: "Player 7", color: "#3d7a3d" },
//   { id: 8, label: "Player 8", color: "#39b844" },
// ];

export default function GamePage() {
  const { players } = usePlayerStore();

  const segments = convertPlayersToSegments(players);

  const callback = (winner: SegmentType) => {
    Alert.alert(winner.label);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0b0b0b",
      }}
    >
      <Roulette
        segments={segments}
        options={DefaultRouletteOptions}
        onCallback={callback}
      />
    </View>
  );
}
