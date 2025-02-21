import { SegmentType } from "@/src/entities/Roulette/types";
import { useSettings } from "@/src/entities/Settings/settings.repository";
import {
  IAvailableColor,
  SettingsConstants,
} from "@/src/shared/config/constants/settingsOptions";
import { useTheme } from "@/src/shared/hooks/useTheme";
import { useVibration } from "@/src/shared/hooks/useVibration";
import SmallRoulette from "@/src/shared/ui/elements/SmallRoulette";
import Grid from "@/src/shared/ui/grid/Grid";
import { normalizedSize } from "@/src/shared/utils/size";
import React from "react";
import { FlatList, Pressable } from "react-native";

const generateSegmentsMock = (
  colors: [string, string, string]
): SegmentType[] => {
  return [
    {
      color: colors[0],
      label: "",
      id: 1,
      type: "player",
    },
    { color: colors[1], label: "", id: 2, type: "player" },
    {
      color: colors[0],
      label: "",
      id: 2,
      type: "player",
    },
    { color: colors[2], label: "", id: 2, type: "player" },
    {
      color: colors[1],
      label: "",
      id: 3,
      type: "player",
    },
    { color: colors[0], label: "", id: 2, type: "player" },
    {
      color: colors[1],
      label: "",
      id: 4,
      type: "player",
    },
    { color: colors[2], label: "", id: 5, type: "player" },
  ];
};

const EXTRA_PADDING = normalizedSize(0); // Дополнительное пространство для безопасности
const WHEEL_SIZE = normalizedSize(100); // Размер рулетки
const CENTER = WHEEL_SIZE / 2; // Центр рулетки
const RADIUS = CENTER - 9; // Радиус рулетки
const TEXT_RADIUS = CENTER * 0.6; // Радиус для текста (уменьшен для визуального эффекта)
const BORDER_WIDTH = normalizedSize(15);
const TOTAL_SIZE = WHEEL_SIZE + BORDER_WIDTH; // Размер SVG с учётом обводки

export default function RoulettePicker() {
  const colors = useTheme();
  const { rouletteColor, setRouletteColors } = useSettings();
  const { vibrateSelection } = useVibration();
  const onRouletteColorChange = (color: IAvailableColor) => {
    if (rouletteColor?.id !== color.id) vibrateSelection();
    setRouletteColors(color);
  };

  const initialScrollIndex =
    SettingsConstants.availableColors.findIndex(
      (item) => item.id === rouletteColor?.id
    ) || 0;

  return (
    <Grid
      row
      space="md"
      color={colors.background.primary}
      style={{ borderRadius: 20 }}
    >
      <FlatList
        data={SettingsConstants.availableColors}
        horizontal
        keyExtractor={(item) => item.colors.join("")}
        initialScrollIndex={initialScrollIndex}
        snapToInterval={50}
        contentContainerStyle={{ padding: 8 }}
        decelerationRate={0}
        getItemLayout={(data, index) => ({
          length: WHEEL_SIZE,
          offset: WHEEL_SIZE * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Grid width={10} />}
        renderItem={({ item, index }) => {
          const isPicked = item.id === rouletteColor?.id;

          return (
            <Pressable onPress={() => onRouletteColorChange(item)}>
              <Grid
                color={isPicked ? colors.background.secondary : "transparent"}
                padding={5}
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: isPicked ? "#ffffff23" : "transparent",
                }}
              >
                <SmallRoulette
                  segments={generateSegmentsMock(item.colors)}
                  options={{
                    TOTAL_SIZE,
                    BORDER_WIDTH,
                    CENTER,
                    WHEEL_SIZE,
                    EXTRA_PADDING,
                    RADIUS,
                    TEXT_RADIUS,
                  }}
                />
              </Grid>
            </Pressable>
          );
        }}
      />
    </Grid>
  );
}
