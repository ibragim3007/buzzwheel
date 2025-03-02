import { generateTimerTime } from '@/src/shared/helpers/timer/generateTime';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { Dare } from '@/src/shared/types/globalTypes';
import Button from '@/src/shared/ui/buttons/Button';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import WrapIconInCircle from '@/src/shared/ui/wrapper/WrapIconInCircle';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  SlideInLeft,
  SlideInRight,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface ButtonTimerProps {
  handleDone: () => void;
  dare: Dare;
}

export default function ButtonTimer({ dare, handleDone }: ButtonTimerProps) {
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

  const rotationInterpolated = interpolate(rotation.value, [0, 360], [0, 360], Extrapolate.CLAMP);

  return (
    <Grid width="100%" align="center" space="lg">
      <Grid width="100%" align="center" space="sm">
        <Animated.View style={{ transform: [{ scale: scale }] }}>
          <Grid row align="center" space="md">
            <Typography weight="bold" variant="title-0">
              {generateTimerTime(timeLeft)}
            </Typography>
          </Grid>
        </Animated.View>
        <Grid width="100%" row align="center" justfity="space-evenly">
          {timerWasStarted && (
            <Animated.View entering={SlideInLeft}>
              <WrapIconInCircle onPress={toggleTimer}>
                <FontAwesome6 name={isTimerRunning ? 'pause' : 'play'} size={30} color={colors.accent.primary} />
              </WrapIconInCircle>
            </Animated.View>
          )}

          <Button
            style={{ width: '50%' }}
            onPress={toggleTimer}
            startIcon={
              isTimerRunning && (
                <Animated.View
                  style={{
                    transform: [{ rotate: `${rotationInterpolated}deg` }],
                  }}
                >
                  <FontAwesome6 name={'stop'} size={24} color={colors.text.white} />
                </Animated.View>
              )
            }
            title={isTimerRunning ? 'Остановить' : 'Запустить'}
          />

          {timerWasStarted && (
            <Animated.View entering={SlideInRight}>
              <WrapIconInCircle onPress={resetTimer}>
                <FontAwesome6 name={'arrow-rotate-right'} size={30} color={colors.accent.primary} />
              </WrapIconInCircle>
            </Animated.View>
          )}
        </Grid>
      </Grid>
      <Pressable onPress={skipTimer}>
        <Typography style={{ textDecorationLine: 'underline' }} variant="callout">
          Пропустить
        </Typography>
      </Pressable>
    </Grid>
  );
}
