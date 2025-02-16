import { usePlayerStore } from "@/src/entities/Player/player.store";
import { SegmentType } from "@/src/entities/Roulette/types";
import { useRouletteGame } from "@/src/entities/RouletteGame/roulette-game.repository";
import DareDisplay from "@/src/module/DareDisplay/DareDisplay";
import { Roulette } from "@/src/module/Roulette";
import { DefaultRouletteOptions } from "@/src/module/Roulette/config/config";
import { convertPlayersToSegments } from "@/src/module/Roulette/helpers/convertPlayersToSegments";
import { useTheme } from "@/src/shared/hooks/useTheme";
import React from "react";
import { View } from "react-native";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";

export default function GamePage() {
  const colors = useTheme();
  const { players } = usePlayerStore();
  const { currentTurn, currentDare, displayDare, setTurn, showDare, hideDare } =
    useRouletteGame();

  const segments = convertPlayersToSegments(players);

  const callback = (winner: SegmentType) => {
    const player = players.find((player) => player.id === winner.id);
    if (player) setTurn(player);
    setTimeout(() => {
      showDare();
    }, 1800);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background.primary,
      }}
    >
      {currentDare && displayDare && currentTurn && (
        <DareDisplay
          dare={currentDare}
          hideDare={hideDare}
          currentTurn={currentTurn}
          players={players}
        />
      )}

      {!displayDare && (
        <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
          <Roulette
            currentTurn={currentTurn}
            segments={segments}
            options={DefaultRouletteOptions}
            onCallback={callback}
          />
        </Animated.View>
      )}
    </View>
  );
}
