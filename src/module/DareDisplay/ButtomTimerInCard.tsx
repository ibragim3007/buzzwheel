import { generateTimerTime } from '@/src/shared/helpers/timer/generateTime';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { fontWeight } from '@/src/shared/styles/typography/typography';
import { Dare } from '@/src/shared/types/globalTypes';
import Button from '@/src/shared/ui/buttons/Button';
import Grid from '@/src/shared/ui/grid/Grid';
import WrapIconInCircle from '@/src/shared/ui/wrapper/WrapIconInCircle';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import Animated, { FadeInLeft, FadeInRight, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

interface ButtomTimerInCardProps {
  handleDone: () => void;
  dare: Dare;
}

export default function ButtomTimerInCard({ dare, handleDone }: ButtomTimerInCardProps) {
  const colors = useTheme();
  const [timerWasStarted, setTimerWasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(dare.time);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { vibrate, vibrateSelection } = useVibration();

  // Для анимации увеличения
  const scale = useSharedValue(1);
  // Для анимации вращения иконки
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (!isTimerRunning || timeLeft === 0) return;

    const timer = setInterval(() => {
      vibrateSelection();
      setTimeLeft(prevTime => {
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
    scale.value = withTiming(timeLeft < 10 ? 1.25 : 1.1, { duration: 210 }, () => {
      scale.value = withTiming(1, { duration: 200 });
    });

    // Запускаем анимацию вращения каждую секунду
  }, [timeLeft]);

  const skipTimer = () => {
    setIsTimerRunning(false);
    handleDone();
  };

  const toggleTimer = () => {
    vibrate();
    setTimerWasStarted(true);
    rotation.value = withRepeat(
      withTiming(1, { duration: 100 }),
      0, // повторяем бесконечно
      false, // не возвращаем обратно
    );
    setIsTimerRunning(prev => !prev);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(dare.time);
  };

  const buttonGradientColors: [string, string] = isTimerRunning
    ? [colors.accent.secondary, colors.accent.secondary]
    : ['transparent', 'transparent'];

  return (
    <Grid row align="center" space="md" justfity="center">
      {timerWasStarted && (
        <Animated.View entering={FadeInRight}>
          <WrapIconInCircle onPress={toggleTimer}>
            <FontAwesome6 name={isTimerRunning ? 'pause' : 'play'} size={20} color={colors.accent.secondary} />
          </WrapIconInCircle>
        </Animated.View>
      )}

      <Button
        gradientColors={buttonGradientColors}
        style={{
          // width: "100%",
          borderColor: colors.accent.secondary,
          borderWidth: 2,
          paddingHorizontal: 20,
          paddingVertical: 18,
          borderRadius: colors.styles.borderRadiusDefault + 3,
          // backgroundColor: isTimerRunning ? colors.accent.secondary : 'transparent',
        }}
        textStyle={{
          style: {
            color: isTimerRunning ? '#fff' : colors.accent.secondary,
            fontSize: 23,
            fontFamily: fontWeight.bold,
          },
        }}
        onPress={toggleTimer}
        startIcon={
          <Ionicons name="stopwatch-outline" size={32} color={isTimerRunning ? '#fff' : colors.accent.secondary} />
        }
        title={generateTimerTime(timeLeft)}
      />

      {timerWasStarted && (
        <Animated.View entering={FadeInLeft}>
          <WrapIconInCircle onPress={resetTimer}>
            <FontAwesome6 name={'arrow-rotate-right'} size={20} color={colors.accent.secondary} />
          </WrapIconInCircle>
        </Animated.View>
      )}
    </Grid>
  );
}
