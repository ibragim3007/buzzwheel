import { usePlayerStore } from "@/src/entities/Player/player.store";
import { SegmentType } from "@/src/entities/Roulette/types";
import { useRouletteGame } from "@/src/entities/RouletteGame/roulette-game.repository";
import { useSettings } from "@/src/entities/Settings/settings.repository";
import DareDisplay from "@/src/module/DareDisplay/DareDisplay";
import { Roulette } from "@/src/module/Roulette";
import { DefaultRouletteOptions } from "@/src/module/Roulette/config/config";
import { convertPlayersToSegments } from "@/src/module/Roulette/helpers/convertPlayersToSegments";
import { SettingsGame } from "@/src/module/SettingsGame";
import { groupsOfColors } from "@/src/shared/config/constants/constants";
import { useTheme } from "@/src/shared/hooks/useTheme";
import { useVibration } from "@/src/shared/hooks/useVibration";
import HandleComponent from "@/src/shared/ui/elements/HandleComponent";
import Grid from "@/src/shared/ui/grid/Grid";
import SafeWrapper from "@/src/shared/ui/layout/SafeWrapper";
import Header from "@/src/widget/Header";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";

export default function GamePage() {
  const colors = useTheme();
  const [isSpinning, setIsSpinning] = useState(false);
  const onUpdateSpinStatus = (status: boolean) => setIsSpinning(status);

  const { players } = usePlayerStore();
  const { currentTurn, currentDare, displayDare, setTurn, showDare, hideDare } =
    useRouletteGame();

  const { rouletteColor } = useSettings();

  const segments = convertPlayersToSegments(
    players,
    rouletteColor?.colors || groupsOfColors[0]
  );

  const callback = (winner: SegmentType) => {
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

  const { vibrateMedium } = useVibration();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    if (!bottomSheetModalRef.current) return;
    vibrateMedium();
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        alignItems: "center",
        backgroundColor: colors.background.primary,
      }}
    >
      {!isSpinning && (
        <Grid style={{ position: "absolute", zIndex: 100 }}>
          <SafeWrapper>
            <Header back onPressSettings={handlePresentModalPress} />
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
      <BottomSheetModal
        index={1}
        snapPoints={["40%"]}
        ref={bottomSheetModalRef}
        enablePanDownToClose={true}
        enableHandlePanningGesture={true}
        enableContentPanningGesture={true}
        keyboardBehavior="interactive"
        onChange={handleSheetChanges}
        handleComponent={HandleComponent}
        backgroundStyle={{
          backgroundColor: colors.background.secondary,
          borderRadius: 20,
        }}
      >
        <SettingsGame />
      </BottomSheetModal>
    </View>
  );
}
