import { useGiftRepositroy } from "@/src/entities/Gift/gift.repository";
import { SegmentType } from "@/src/entities/Roulette/types";
import { useSettings } from "@/src/entities/Settings/settings.repository";
import {
  IAvailableColor,
  SettingsConstants,
} from "@/src/shared/config/constants/settingsOptions";
import { useTheme } from "@/src/shared/hooks/useTheme";
import { useVibration } from "@/src/shared/hooks/useVibration";
import LockElement from "@/src/shared/ui/elements/LockElement";
import SmallRoulette from "@/src/shared/ui/elements/SmallRoulette";
import Grid from "@/src/shared/ui/grid/Grid";
import HorizontalListPicker from "@/src/shared/ui/layout/HorizontalListPicker";
import { normalizedSize } from "@/src/shared/utils/size";
import React from "react";
import { Alert, Pressable } from "react-native";

export const generateSegmentsMock = (
  colors: [string, string, string]
): SegmentType[] => {
  return [
    {
      color: colors[0],
      label: "",
      id: 1,
      type: "player",
      probability: 1,
    },
    { color: colors[1], label: "", id: 2, type: "player", probability: 1 },
    {
      color: colors[0],
      label: "",
      id: 2,
      type: "player",
      probability: 1,
    },
    { color: colors[2], label: "", id: 2, type: "player", probability: 1 },
    {
      color: colors[1],
      label: "",
      id: 3,
      type: "player",
      probability: 1,
    },
    { color: colors[0], label: "", id: 2, type: "player", probability: 1 },
    {
      color: colors[1],
      label: "",
      id: 4,
      type: "player",
      probability: 1,
    },
    { color: colors[2], label: "", id: 5, type: "player", probability: 1 },
  ];
};

const EXTRA_PADDING = normalizedSize(0); // Дополнительное пространство для безопасности
const WHEEL_SIZE = normalizedSize(100); // Размер рулетки
const CENTER = WHEEL_SIZE / 2; // Центр рулетки
const RADIUS = CENTER - 9; // Радиус рулетки
const TEXT_RADIUS = CENTER * 0.6; // Радиус для текста (уменьшен для визуального эффекта)
const BORDER_WIDTH = normalizedSize(15);
const TOTAL_SIZE = WHEEL_SIZE + BORDER_WIDTH; // Размер SVG с учётом обводки

export const OPTIONS_SMALL_ROULETTE = {
  EXTRA_PADDING,
  WHEEL_SIZE,
  CENTER,
  RADIUS,
  TEXT_RADIUS,
  BORDER_WIDTH,
  TOTAL_SIZE,
};

export default function RoulettePicker() {
  const colors = useTheme();
  const { rouletteColor, setRouletteColors } = useSettings();
  const { vibrateSelection } = useVibration();
  const { unlockedRouletteColors } = useGiftRepositroy();
  const onRouletteColorChange = (
    color: IAvailableColor,
    isAvailable: boolean
  ) => {
    if (isAvailable) {
      if (rouletteColor?.id !== color.id) vibrateSelection();
      setRouletteColors(color);
    } else {
      Alert.alert("You have to get full access");
    }
  };

  const initialScrollIndex =
    SettingsConstants.availableColors.findIndex(
      (item) => item.id === rouletteColor?.id
    ) || 0;

  return (
    <HorizontalListPicker
      data={SettingsConstants.availableColors}
      keyExtractor={(item) => item.colors.join("")}
      initialScrollIndex={initialScrollIndex}
      snapToInterval={50}
      ITEM_SIZE={WHEEL_SIZE}
      renderItem={({ item, index }) => {
        const isPicked = item.id === rouletteColor?.id;
        const isUnlocked = unlockedRouletteColors.includes(item.id);
        const isAvailable = item.isFree || isUnlocked;
        return (
          <Pressable onPress={() => onRouletteColorChange(item, isAvailable)}>
            <Grid
              color={isPicked ? colors.background.secondary : "transparent"}
              padding={5}
              justfity="center"
              style={{
                borderRadius: 20,
                borderWidth: 1,
                borderColor: isPicked ? "#ffffff23" : "transparent",
              }}
            >
              {!isAvailable && <LockElement />}
              <SmallRoulette
                segments={generateSegmentsMock(item.colors)}
                options={OPTIONS_SMALL_ROULETTE}
              />
            </Grid>
          </Pressable>
        );
      }}
    />
  );
}
