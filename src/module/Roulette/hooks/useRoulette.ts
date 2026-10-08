import { SegmentType } from '@/src/entities/Roulette/types';
import { DEFAULT_PROBABILITY } from '@/src/shared/config/constants/constants';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { analytics, Events } from '@/src/shared/service/analytics.service';
import { useState } from 'react';
import {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const SPIN_DURATION = 5600;
const WIND_UP_DURATION = 280;
const POINTER_MAX_ANGLE = 28;

const getWeightedRandomItem = (items: SegmentType[]) => {
  const totalWeight = items.reduce((total, item) => total + (item?.probability || DEFAULT_PROBABILITY), 0);
  const randomNum = Math.random() * totalWeight;
  let cumulativeWeight = 0;

  for (let i = 0; i < items.length; i++) {
    cumulativeWeight += items[i]?.probability || DEFAULT_PROBABILITY;
    if (randomNum < cumulativeWeight) {
      return { item: items[i], index: i };
    }
  }

  return { item: items[0], index: 0 };
};

export const useRoulette = (segments: SegmentType[], onCallback: (winner: SegmentType) => void) => {
  const { vibrate, vibrateSelection, vibrateMedium } = useVibration();
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<null | number>(null);

  // Колесо вращается по часовой стрелке; rotation — накопленный угол в градусах
  const rotation = useSharedValue(0);
  const wheelScale = useSharedValue(1);
  const spinning = useSharedValue(false);
  const lastTickAt = useSharedValue(0);
  const segmentAngle = 360 / segments.length;

  /** Гвоздик прошёл под язычком → лёгкий haptic-тик (не чаще ~22 раз в секунду) */
  useAnimatedReaction(
    () => Math.floor(rotation.value / segmentAngle),
    (current, previous) => {
      if (!spinning.value || previous === null || current === previous) return;
      const now = Date.now();
      if (now - lastTickAt.value < 45) return;
      lastTickAt.value = now;
      runOnJS(vibrateSelection)();
    },
  );

  const handleFinishRotation = (index: number) => {
    spinning.value = false;
    wheelScale.value = withSequence(withTiming(1.035, { duration: 140 }), withSpring(1, { damping: 9 }));
    void vibrateMedium();
    setWinner(index);
    setIsSpinning(false);
    onCallback(segments[index]);
    analytics.trackEvent(Events.finishRotation, {});
  };

  const spinWheel = () => {
    if (isSpinning || winner !== null || segments.length === 0) return;

    analytics.trackEvent(Events.pressSpinWheel, {});
    void vibrate();
    setIsSpinning(true);
    spinning.value = true;

    const { index } = getWeightedRandomItem(segments);

    // Под язычком (верх) оказывается локальный угол колеса (-rotation). Останавливаемся
    // внутри выбранного сектора со случайным смещением, но не на самой границе.
    const landingAngle = index * segmentAngle + segmentAngle * (0.5 + (Math.random() - 0.5) * 0.6);
    const start = rotation.value % 360;
    const delta = (((360 - landingAngle - start) % 360) + 360) % 360;
    const fullTurns = 5 + Math.floor(Math.random() * 2);
    const target = start + fullTurns * 360 + delta;

    rotation.value = start;
    rotation.value = withSequence(
      // Небольшой замах назад перед раскруткой
      withTiming(start - Math.min(12, segmentAngle * 0.35), {
        duration: WIND_UP_DURATION,
        easing: Easing.inOut(Easing.quad),
      }),
      withTiming(target, { duration: SPIN_DURATION, easing: Easing.bezier(0.12, 0.7, 0.1, 1) }, finished => {
        if (finished) runOnJS(handleFinishRotation)(index);
      }),
    );

    wheelScale.value = withSequence(
      withTiming(0.97, { duration: WIND_UP_DURATION }),
      withSpring(1, { damping: 12, stiffness: 140 }),
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: wheelScale.value }],
  }));

  /**
   * Язычок отклоняется, когда к нему подъезжает гвоздик, и соскакивает обратно,
   * как только гвоздик проходит под ним.
   */
  const cursorAnimatedStyle = useAnimatedStyle(() => {
    const phase = ((rotation.value % segmentAngle) + segmentAngle) % segmentAngle;
    const zone = Math.min(segmentAngle * 0.18, 8);
    const push = phase > segmentAngle - zone ? (phase - (segmentAngle - zone)) / zone : 0;
    return { transform: [{ rotate: `${-push * POINTER_MAX_ANGLE}deg` }] };
  });

  return { spinWheel, winner, isSpinning, animatedStyle, cursorAnimatedStyle };
};
