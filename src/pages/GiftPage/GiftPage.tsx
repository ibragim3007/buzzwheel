import { convertGiftsToSegments } from "@/src/entities/Gift/convertGiftsToSegments";
import { useGiftRepositroy } from "@/src/entities/Gift/gift.repository";
import { mockGifts } from "@/src/entities/Gift/mockGifts";
import { useModalStore } from "@/src/entities/Modal/useModalStore";
import { SegmentType } from "@/src/entities/Roulette/types";
import { giftService } from "@/src/module/GiftModule/GiftService";
import { Roulette } from "@/src/module/Roulette";

import { calcByWheelSize } from "@/src/module/Roulette/config/config";
import {
  generateSegmentsMock,
  OPTIONS_SMALL_ROULETTE,
} from "@/src/module/SettingsGame/RoulettePicker/RoulettePicker";
import { SettingsConstants } from "@/src/shared/config/constants/settingsOptions";
import { CustomAnimations } from "@/src/shared/config/theme/AnimationConfig";

import { useTheme } from "@/src/shared/hooks/useTheme";
import Button from "@/src/shared/ui/buttons/Button";
import SmallAppThemeElem from "@/src/shared/ui/elements/SmallAppThemeElem";
import SmallRoulette from "@/src/shared/ui/elements/SmallRoulette";
import Grid from "@/src/shared/ui/grid/Grid";
import PageWrapper from "@/src/shared/ui/layout/PageWrapper";
import SafeWrapper from "@/src/shared/ui/layout/SafeWrapper";
import Typography from "@/src/shared/ui/typography/Typography";
import Header from "@/src/widget/Header";
import React, { useEffect, useRef, useState } from "react";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

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

// const mockSegments: SegmentType[] = [
//   {
//     id: 1,
//     color: "red",
//     label: "label",
//     type: "player",
//   },
//   {
//     id: 2,
//     color: "green",
//     label: "label",
//     type: "player",
//   },
//   {
//     id: 1,
//     color: "red",
//     label: "label",
//     type: "player",
//   },
//   {
//     id: 2,
//     color: "green",
//     label: "label",
//     type: "player",
//   },
//   {
//     id: 1,
//     color: "red",
//     label: "label",
//     type: "player",
//   },
//   {
//     id: 2,
//     color: "green",
//     label: "label",
//     type: "player",
//   },
//   {
//     id: 1,
//     color: "red",
//     label: "label",
//     type: "player",
//   },
//   {
//     id: 2,
//     color: "green",
//     label: "label",
//     type: "player",
//   },
// ];

export default function GiftPage() {
  const colors = useTheme();
  const [spinStatus, setSpinStatus] = useState(false);
  const onChangeSpinStatus = (isSpinning: boolean) => setSpinStatus(isSpinning);
  const { openModal } = useModalStore();

  const {
    unlockRouletteColor,
    unlockTheme,
    setIsAvailableToSpin,
    unlockedRouletteColors,
    unlockedThemes,
    isAvailableToSpin,
  } = useGiftRepositroy();

  const onCallback = (segment: SegmentType) => {
    if (segment.type === "gift") {
      const gift = mockGifts.find((gift) => gift.id === segment.id);

      if (gift?.type === "app-theme") {
        const lockedTheme = giftService.getRandomLockedGift(
          SettingsConstants.themes,
          unlockedThemes
        );
        if (lockedTheme) {
          unlockTheme(lockedTheme.id);
          openModal({
            title: "Вы выйграли подарок!",
            description: "Вы получили тему для приложения!",
            callbackOnClose: () => setIsAvailableToSpin(false),
            node: <SmallAppThemeElem theme={lockedTheme} />,
            buttonText: "Получить",
          });
        }
      }
      if (gift?.type === "roulette-colors") {
        const lockedRoulette = giftService.getRandomLockedGift(
          SettingsConstants.availableColors,
          unlockedRouletteColors
        );
        if (lockedRoulette) {
          unlockRouletteColor(lockedRoulette.id);
          openModal({
            title: "Вы выйграли подарок!",
            description: "Вы получили колесо для игры!",
            callbackOnClose: () => setIsAvailableToSpin(false),
            node: (
              <SmallRoulette
                segments={generateSegmentsMock(lockedRoulette.colors)}
                options={OPTIONS_SMALL_ROULETTE}
              />
            ),
            buttonText: "Получить",
          });
        }
      }
    }
  };

  const segments = convertGiftsToSegments(mockGifts);

  if (!isAvailableToSpin.value) {
    return (
      <PageWrapper flex={1}>
        <SafeWrapper>
          <Animated.View entering={CustomAnimations.enterItemShow(3)}>
            <Grid space="md">
              <Header back />
              <Grid space="sm">
                <Typography variant="title-1" weight="bold">
                  There is no gift for now
                </Typography>
                <Grid>
                  <Typography>Comeback tomorrow!</Typography>
                  {/* <Typography variant="caption-1">
                    {isAvailableToSpin.date.toDateString()}
                  </Typography> */}
                </Grid>
              </Grid>
            </Grid>
          </Animated.View>
        </SafeWrapper>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper flex={1}>
      <SafeWrapper>
        <Grid space="lg" height="100%" justfity="space-between">
          <Grid style={{ zIndex: 100 }}>
            <Header back />
          </Grid>

          <Animated.View
            style={{ flex: 1 }}
            entering={ZoomIn.delay(300).springify()}
            exiting={ZoomOut.delay(400).springify()}
          >
            <Grid flex={1}>
              <Roulette
                centerBlock
                segments={segments}
                options={{
                  ...calcByWheelSize(390),
                  BORDER_COLOR: colors.accent.primary,
                }}
                onChangeSpinStatus={onChangeSpinStatus}
                currentTurn={null}
                onCallback={onCallback}
              />
            </Grid>
          </Animated.View>
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
