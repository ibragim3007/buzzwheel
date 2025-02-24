import { SegmentType } from "@/src/entities/Roulette/types";
import { Roulette } from "@/src/module/Roulette";
import {
  calcByWheelSize,
  DefaultRouletteOptions,
} from "@/src/module/Roulette/config/config";
import { useTheme } from "@/src/shared/hooks/useTheme";
import Grid from "@/src/shared/ui/grid/Grid";
import PageWrapper from "@/src/shared/ui/layout/PageWrapper";
import SafeWrapper from "@/src/shared/ui/layout/SafeWrapper";
import Typography from "@/src/shared/ui/typography/Typography";
import Header from "@/src/widget/Header";
import React from "react";

// Игкрок зашел первый день и видит получение приза
// игрок получает возможность крутить колесо и получить фичу
// после прокрутки у него открывается одна из фичей
// после чего показывается прогресс 1 из 7 дней на этой неделе
// игрок может получить приз только один раз в день
// если игрок не получил приз, то он может получить его на следующий день

// будет собирается колесо фортуны из заранее подготовленых
// спиков призов и фичей, у котрых будет свой вес
// и в зависимости от веса будет вероятность выпадения

// Примеры призов: Темы приложения, цвета для колеса
// Выпадение действий для игры.
// Редкий приз: Премиум подписка на неделю
// Легендарный приз: Премиум подписка на месяц
// Легендарный приз: Выпадение пакета

const mockSegments: SegmentType[] = [
  {
    id: 1,
    color: "red",
    label: "label",
    type: "player",
  },
  {
    id: 2,
    color: "green",
    label: "label",
    type: "player",
  },
  {
    id: 1,
    color: "red",
    label: "label",
    type: "player",
  },
  {
    id: 2,
    color: "green",
    label: "label",
    type: "player",
  },
  {
    id: 1,
    color: "red",
    label: "label",
    type: "player",
  },
  {
    id: 2,
    color: "green",
    label: "label",
    type: "player",
  },
  {
    id: 1,
    color: "red",
    label: "label",
    type: "player",
  },
  {
    id: 2,
    color: "green",
    label: "label",
    type: "player",
  },
];

export default function GiftPage() {
  const colors = useTheme();

  return (
    <PageWrapper flex={1}>
      <SafeWrapper>
        <Grid height="90%" justfity="space-between">
          <Grid style={{ zIndex: 100 }}>
            <Header back />
          </Grid>
          <Typography weight="bold">GIFT PAGE</Typography>
          <Grid align="center" justfity="center" row>
            <Roulette
              segments={mockSegments}
              options={{
                ...calcByWheelSize(350),
                BORDER_COLOR: colors.accent.primary,
              }}
              currentTurn={null}
              onCallback={() => {}}
            />
          </Grid>
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
