import { SegmentType } from "@/src/entities/Roulette/types";
import { useVibration } from "@/src/shared/hooks/useVibration";
import { useState } from "react";
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const getWeightedRandomItem = (items: SegmentType[]) => {
  const totalWeight = items.reduce(
    (total, item) => total + item.probability,
    0
  );
  const randomNum = Math.random() * totalWeight;
  let cumulativeWeight = 0;

  for (let i = 0; i < items.length; i++) {
    cumulativeWeight += items[i].probability;
    if (randomNum < cumulativeWeight) {
      return { item: items[i], index: i };
    }
  }

  return { item: items[0], index: 0 };
};

export const useRoulette = (
  segments: SegmentType[],
  onCallback: (winner: SegmentType) => void
) => {
  const { vibrate } = useVibration();
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<null | number>(null);

  const rotation = useSharedValue(0);
  const wheelScale = useSharedValue(1);
  const wheelTranslateY = useSharedValue(0);
  const cursorRotation = useSharedValue(0);
  const oneSegmentAngle = 360 / segments.length;

  const spinWheel = () => {
    void vibrate();
    rotation.value = withTiming(0, { duration: 0 });
    wheelScale.value = 1;
    wheelTranslateY.value = 0;
    setWinner(null);
    if (isSpinning) return;

    setIsSpinning(true);

    // const randomSegmentIndex = getRandomInt(0, segments.length);

    const { index: randomSegmentIndex } = getWeightedRandomItem(segments);

    const totalAngle =
      rotation.value - 360 * 6 - oneSegmentAngle * randomSegmentIndex;

    const realSegmentId = Math.abs((totalAngle % 360) / oneSegmentAngle);

    cursorRotation.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withTiming(0, { duration: 30 }),
      withTiming(-5, { duration: 60 }),
      withTiming(15, { duration: 50 }),
      withTiming(-20, { duration: 60 }),
      withTiming(10, { duration: 70 }),
      withTiming(0, { duration: 30 }),
      withTiming(-5, { duration: 50 }),
      withTiming(15, { duration: 50 }),
      withTiming(-20, { duration: 30 }),
      withTiming(10, { duration: 70 }),
      withTiming(0, { duration: 30 }),
      withTiming(5, { duration: 60 }),
      withTiming(-15, { duration: 50 }),
      withTiming(-20, { duration: 60 }),
      withTiming(0, { duration: 60 }),
      withTiming(-10, { duration: 50 }),
      withTiming(0, { duration: 30 }),
      withTiming(-5, { duration: 60 }),
      withTiming(15, { duration: 50 }),
      withTiming(-20, { duration: 60 }),
      withTiming(10, { duration: 70 }),
      withTiming(0, { duration: 30 }),
      withTiming(-5, { duration: 50 }),
      withTiming(15, { duration: 50 }),
      withTiming(-20, { duration: 30 }),
      withTiming(10, { duration: 70 }),
      withTiming(0, { duration: 30 }),
      withTiming(5, { duration: 60 }),
      withTiming(-15, { duration: 50 }),
      withTiming(-20, { duration: 60 }),
      withTiming(0, { duration: 60 }),
      withTiming(-10, { duration: 50 }),
      withTiming(0, { duration: 30 }),
      withTiming(-5, { duration: 60 }),
      withTiming(15, { duration: 50 }),
      withTiming(-20, { duration: 60 }),
      withTiming(10, { duration: 70 }),
      withTiming(0, { duration: 30 }),
      withTiming(-5, { duration: 50 }),
      withTiming(15, { duration: 50 }),
      withTiming(-20, { duration: 30 }),
      withTiming(10, { duration: 70 }),
      withTiming(0, { duration: 30 }),
      withTiming(5, { duration: 60 }),
      withTiming(-15, { duration: 50 }),
      withTiming(-20, { duration: 60 }),
      withTiming(0, { duration: 60 }),
      withTiming(5, { duration: 160 }),
      withTiming(-15, { duration: 150 }),
      withTiming(-20, { duration: 160 }),
      withTiming(0, { duration: 160 }),
      withTiming(10, { duration: 260 }),
      withTiming(0, { duration: 360 })
    );

    rotation.value = withTiming(
      totalAngle,
      { duration: 5000, easing: Easing.out(Easing.cubic) },
      (isFinished) => {
        if (isFinished) {
          runOnJS(handleFinishRotation)(totalAngle, realSegmentId); // Передаём индекс сегмента
        }
      }
    );

    wheelScale.value = withDelay(3100, withTiming(1.5, { duration: 900 }));
    wheelTranslateY.value = withDelay(
      3100,
      withTiming(-300, { duration: 900 })
    );
  };

  const handleFinishRotation = (totalAngle: number, segmentIndex: number) => {
    void vibrate();
    const leftSegment =
      segmentIndex - 1 < 0 ? segments.length - 1 : segmentIndex - 1;
    const randomSegments = [leftSegment, segmentIndex];
    const segmentsArr = [segments[leftSegment], segments[segmentIndex]];
    const { index: zeroOrOne } = getWeightedRandomItem(segmentsArr);
    // const zeroOrOne = getRandomInt(0, 2);
    // const getRandomSegment = Math.round(randomSegments[zeroOrOne]);
    const getRandomSegment = Math.round(randomSegments[zeroOrOne]);

    const updateTotalAngle =
      totalAngle +
      (zeroOrOne === 0 ? oneSegmentAngle / 2 : -(oneSegmentAngle / 2));

    rotation.value = withSpring(updateTotalAngle, {});
    console.log(getRandomSegment);
    const winner = segments[getRandomSegment];
    setWinner(getRandomSegment);
    onCallback(winner);
    // Alert.alert("Результат", `Выпало: ${winner}`);
    setIsSpinning(false);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: wheelScale.value },
    ],
    bottom: wheelTranslateY.value,
  }));

  const cursorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${cursorRotation.value}deg` },
      { scale: wheelScale.value },
    ],
    bottom: 250 + wheelTranslateY.value,
  }));

  return { spinWheel, winner, isSpinning, animatedStyle, cursorAnimatedStyle };
};
