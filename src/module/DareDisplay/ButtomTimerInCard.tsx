import { generateTimerTime } from "@/src/shared/helpers/timer/generateTime";
import { useTheme } from "@/src/shared/hooks/useTheme";
import { Dare } from "@/src/shared/types/globalTypes";
import Button from "@/src/shared/ui/buttons/Button";
import Grid from "@/src/shared/ui/grid/Grid";
import Typography from "@/src/shared/ui/typography/Typography";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useEffect, useState } from "react";
import Animated, {
  Extrapolate,
  FadeInLeft,
  FadeInRight,
  interpolate,
  SlideInLeft,
  SlideInRight,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fontWeight } from "@/src/shared/styles/typography/typography";
import WrapIconInCircle from "@/src/shared/ui/wrapper/WrapIconInCircle";

interface ButtomTimerInCardProps {
  handleDone: () => void;
  dare: Dare;
}

export default function ButtomTimerInCard({
  dare,
  handleDone,
}: ButtomTimerInCardProps) {
  const colors = useTheme();
  const [timerWasStarted, setTimerWasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(dare.time);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Для анимации увеличения
  const scale = useSharedValue(1);
  // Для анимации вращения иконки
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (!isTimerRunning || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          skipTimer();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  useEffect(() => {
    // Когда время меняется, запускаем анимацию увеличения
    scale.value = withTiming(
      timeLeft < 10 ? 1.25 : 1.1,
      { duration: 210 },
      () => {
        scale.value = withTiming(1, { duration: 200 });
      }
    );

    // Запускаем анимацию вращения каждую секунду
  }, [timeLeft]);

  const skipTimer = () => {
    setIsTimerRunning(false);
    handleDone();
  };

  const toggleTimer = () => {
    setTimerWasStarted(true);
    rotation.value = withRepeat(
      withTiming(1, { duration: 100 }),
      0, // повторяем бесконечно
      false // не возвращаем обратно
    );
    setIsTimerRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(dare.time);
  };

  const rotationInterpolated = interpolate(
    rotation.value,
    [0, 360],
    [0, 360],
    Extrapolate.CLAMP
  );

  return (
    <Grid>
      <Grid>
        {/* <Animated.View style={{ transform: [{ scale: scale }] }}>
          <Grid row align="center" space="md">
            <Typography weight="bold" variant="title-0">
              {generateTimerTime(timeLeft)}
            </Typography>
          </Grid>
        </Animated.View> */}
        <Grid row align="center" space="md" justfity="center">
          {timerWasStarted && (
            <Animated.View entering={FadeInRight}>
              <WrapIconInCircle onPress={toggleTimer}>
                <FontAwesome6
                  name={isTimerRunning ? "pause" : "play"}
                  size={20}
                  color={colors.accent.secondary}
                />
              </WrapIconInCircle>
            </Animated.View>
          )}

          <Button
            style={{
              // width: "100%",
              borderColor: colors.accent.secondary,
              borderWidth: 1,
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: isTimerRunning
                ? colors.accent.secondary
                : "transparent",
            }}
            textStyle={{
              style: {
                color: isTimerRunning ? "#fff" : colors.accent.secondary,
                fontFamily: fontWeight.regular,
              },
            }}
            onPress={toggleTimer}
            startIcon={
              <Ionicons
                name="stopwatch-outline"
                size={28}
                color={isTimerRunning ? "#fff" : colors.accent.secondary}
              />
            }
            title={generateTimerTime(timeLeft)}
          />

          {timerWasStarted && (
            <Animated.View entering={FadeInLeft}>
              <WrapIconInCircle onPress={resetTimer}>
                <FontAwesome6
                  name={"arrow-rotate-right"}
                  size={20}
                  color={colors.accent.secondary}
                />
              </WrapIconInCircle>
            </Animated.View>
          )}
        </Grid>
      </Grid>
      {/* <Pressable onPress={skipTimer}>
        <Typography
          style={{ textDecorationLine: "underline" }}
          variant="callout"
        >
          Пропустить
        </Typography>
      </Pressable> */}
    </Grid>
  );
}
