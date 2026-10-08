import { generateTimerTime } from '@/src/shared/helpers/timer/generateTime';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { analytics, Events } from '@/src/shared/service/analytics.service';
import { fontWeight } from '@/src/shared/styles/typography/typography';
import { Dare } from '@/src/shared/types/globalTypes';
import { withAlpha } from '@/src/shared/utils/color';
import { normalizedSize } from '@/src/shared/utils/size';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';

const WARNING_SECONDS = 5;
const WARNING_COLOR = '#FF5A5F';

interface ButtomTimerInCardProps {
  handleDone: () => void;
  dare: Dare;
}

/** Таймер-«пилюля»: заливка показывает прошедшее время, тап — старт/пауза. */
export default function ButtomTimerInCard({ dare, handleDone }: ButtomTimerInCardProps) {
  const colors = useTheme();
  const total = dare.time ?? 0;
  const [timerWasStarted, setTimerWasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(total);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { vibrate, vibrateSelection } = useVibration();

  const progress = useSharedValue(0);
  const pulse = useSharedValue(1);
  const isWarning = timerWasStarted && timeLeft <= WARNING_SECONDS;
  const accent = isWarning ? WARNING_COLOR : colors.accent.secondary;

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
    if (!total) return;
    const elapsed = 1 - timeLeft / total;
    progress.value = isTimerRunning
      ? withTiming(Math.min(1, elapsed + 1 / total), { duration: 1000, easing: Easing.linear })
      : withTiming(elapsed, { duration: 250 });

    if (isTimerRunning && timeLeft <= WARNING_SECONDS) {
      pulse.value = withSequence(withTiming(1.08, { duration: 120 }), withTiming(1, { duration: 220 }));
    }
  }, [timeLeft, isTimerRunning]);

  const skipTimer = () => {
    setIsTimerRunning(false);
    handleDone();
  };

  const toggleTimer = () => {
    analytics.trackEvent(Events.pressTimer, {
      isTimerRunning: !isTimerRunning,
      dareId: dare.id,
    });
    vibrate();
    setTimerWasStarted(true);
    setIsTimerRunning(prev => !prev);
  };

  const resetTimer = () => {
    analytics.trackEvent(Events.pressReset, {});
    vibrate();
    setIsTimerRunning(false);
    setTimeLeft(total);
  };

  const fillStyle = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));
  const pillStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulse.value }] }));

  const icon = !timerWasStarted ? 'stopwatch-outline' : isTimerRunning ? 'pause' : 'play';

  return (
    <View style={styles.row}>
      <Animated.View style={pillStyle}>
        <Pressable
          onPress={toggleTimer}
          accessibilityRole="button"
          style={[styles.pill, { borderColor: withAlpha(accent, 0.55), backgroundColor: withAlpha(accent, 0.12) }]}
        >
          <Animated.View style={[styles.fill, { backgroundColor: withAlpha(accent, 0.3) }, fillStyle]} />
          <Ionicons name={icon} size={normalizedSize(22)} color={accent} />
          <Text style={[styles.time, { color: accent }]}>{generateTimerTime(timeLeft)}</Text>
        </Pressable>
      </Animated.View>

      {timerWasStarted && (
        <Animated.View entering={ZoomIn.springify()} exiting={ZoomOut}>
          <Pressable
            onPress={resetTimer}
            accessibilityRole="button"
            hitSlop={8}
            style={[styles.reset, { borderColor: withAlpha(accent, 0.4) }]}
          >
            <FontAwesome6 name="arrow-rotate-right" size={normalizedSize(15)} color={accent} />
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalizedSize(10),
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalizedSize(8),
    height: normalizedSize(48),
    paddingHorizontal: normalizedSize(20),
    borderRadius: normalizedSize(24),
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  time: {
    fontFamily: fontWeight.bold,
    fontSize: normalizedSize(20),
    fontVariant: ['tabular-nums'],
    minWidth: normalizedSize(52),
  },
  reset: {
    width: normalizedSize(48),
    height: normalizedSize(48),
    borderRadius: normalizedSize(24),
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
