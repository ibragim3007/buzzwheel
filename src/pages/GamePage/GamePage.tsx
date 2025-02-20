import { usePlayerStore } from "@/src/entities/Player/player.store";
import { SegmentType } from "@/src/entities/Roulette/types";
import { useRouletteGame } from "@/src/entities/RouletteGame/roulette-game.repository";
import DareDisplay from "@/src/module/DareDisplay/DareDisplay";
import { Roulette } from "@/src/module/Roulette";
import { DefaultRouletteOptions } from "@/src/module/Roulette/config/config";
import { convertPlayersToSegments } from "@/src/module/Roulette/helpers/convertPlayersToSegments";
import { useTheme } from "@/src/shared/hooks/useTheme";
import Grid from "@/src/shared/ui/grid/Grid";
import SafeWrapper from "@/src/shared/ui/layout/SafeWrapper";
import Header from "@/src/widget/Header";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";

export default function GamePage() {
  const colors = useTheme();
  const [isSpinning, setIsSpinning] = useState(false);
  const onUpdateSpinStatus = (status: boolean) => {
    setIsSpinning(status);
  };
  const { players } = usePlayerStore();
  const {
    currentTurn,
    currentDare,
    displayDare,
    groupColors,
    setTurn,
    showDare,
    hideDare,
    initRandomGroupColors,
  } = useRouletteGame();

  const segments = convertPlayersToSegments(players, groupColors);

  useEffect(() => {
    console.log("first");
    initRandomGroupColors();
  }, []);

  const callback = (winner: SegmentType) => {
    console.log(winner);
    if (winner.type === "player") {
      const player = players.find((player) => player.id === winner.id);
      if (player) setTurn(player, winner.type);
      setTimeout(() => {
        showDare();
      }, 1800);
    } else if (winner.type === "all") {
      setTurn({ id: 0, name: winner.label }, winner.type);
      setTimeout(() => {
        showDare();
      }, 1800);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background.primary,
      }}
    >
      {!isSpinning && (
        <Grid style={{ position: "absolute", zIndex: 100 }}>
          <SafeWrapper>
            <Header back />
          </SafeWrapper>
        </Grid>
      )}

      <Grid justfity="center" align="center" flex={1}>
        {currentDare && displayDare && currentTurn && (
          <Grid marginTop={50}>
            <DareDisplay
              dare={currentDare}
              hideDare={hideDare}
              currentTurn={currentTurn}
              players={players}
            />
          </Grid>
        )}

        {!displayDare && (
          <Animated.View
            entering={SlideInRight}
            exiting={SlideOutLeft}
            style={{ alignItems: "center" }}
          >
            <Roulette
              currentTurn={currentTurn}
              segments={segments}
              options={DefaultRouletteOptions}
              onCallback={callback}
              onChangeSpinStatus={onUpdateSpinStatus}
            />
          </Animated.View>
        )}
      </Grid>
    </View>
  );
}
