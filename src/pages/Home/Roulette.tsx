import Grid from "@/src/shared/grid/Grid";
import { getRandomInt } from "@/src/shared/helpers/getRandomInt";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  Circle,
  G,
  Path,
  Polygon,
  Text as SvgText,
} from "react-native-svg";

const segments = [
  { label: "Ибрагим", color: "#3d7a3d" },
  { label: "Никита", color: "#39b844" },
  { label: "Кирилл", color: "#3d7a3d" },
  { label: "Тимофей", color: "#39b844" },
  { label: "Максим", color: "#3d7a3d" },
  { label: "Летуаль", color: "#39b844" },
  { label: "Давид", color: "#3d7a3d" },
  { label: "Вадим", color: "#39b844" },
];

const EXTRA_PADDING = 5; // Дополнительное пространство для безопасности
const WHEEL_SIZE = 385; // Размер рулетки
const CENTER = WHEEL_SIZE / 2; // Центр рулетки
const RADIUS = CENTER; // Радиус рулетки
const TEXT_RADIUS = CENTER * 0.66; // Радиус для текста (уменьшен для визуального эффекта)
const BORDER_WIDTH = 20;
const TOTAL_SIZE = WHEEL_SIZE + BORDER_WIDTH; // Размер SVG с учётом обводки

// Вычисляет координаты точки на окружности
const calculateCoordinates = (radius: number, angle: number) => ({
  x: CENTER + radius * Math.cos((Math.PI * angle) / 180),
  y: CENTER + radius * Math.sin((Math.PI * angle) / 180),
});

// Компонент для отрисовки одного сегмента рулетки
const RouletteSegment = ({ segment, startAngle, endAngle, winner, index }) => {
  const { x: x1, y: y1 } = calculateCoordinates(RADIUS, startAngle);
  const { x: x2, y: y2 } = calculateCoordinates(RADIUS, endAngle);
  const textPosition = calculateCoordinates(
    TEXT_RADIUS,
    (startAngle + endAngle) / 2
  );
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  const pathData = `M${CENTER},${CENTER} L${x1},${y1} A${RADIUS},${RADIUS} 0 ${largeArcFlag},1 ${x2},${y2} Z`;

  const picked = winner === index;

  // Угол для выравнивания текста по центру сегмента
  const textRotation = (startAngle + endAngle) / 2;

  return (
    <>
      <Path
        d={pathData}
        stroke={picked ? "#fff" : "none"}
        strokeWidth={picked ? 10 : 0}
        strokeDashoffset={10}
        strokeDasharray={15}
        strokeLinejoin="round"
        fill={segment.color}
        opacity={winner && !picked ? 0.1 : 1}
      />
      <SvgText
        fill="#fff"
        fontWeight="bold"
        fontSize="25"
        x={textPosition.x - 5}
        y={textPosition.y + 8}
        textAnchor="middle"
        opacity={winner && !picked ? 0.1 : 1}
        transform={`rotate(${textRotation}, ${textPosition.x}, ${textPosition.y})`}
      >
        {segment.label}
      </SvgText>
    </>
  );
};

const Roulette = () => {
  const rotation = useSharedValue(0);
  const wheelScale = useSharedValue(1);
  const wheelTranslateY = useSharedValue(0);
  const cursorRotation = useSharedValue(0);

  const oneSegmentAngle = 360 / segments.length;

  const [isSpinning, setIsSpinning] = useState(false);

  const spinWheel = () => {
    rotation.value = withTiming(0, { duration: 0 });
    wheelScale.value = 1;
    wheelTranslateY.value = 0;
    setWinner(null);
    if (isSpinning) return;

    setIsSpinning(true);

    const randomSegmentIndex = getRandomInt(0, segments.length);

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

  const [winner, setWinner] = useState<null | number>(null);

  const handleFinishRotation = (totalAngle: number, segmentIndex: number) => {
    const leftSegment =
      segmentIndex - 1 < 0 ? segments.length - 1 : segmentIndex - 1;
    const randomSegments = [leftSegment, segmentIndex];
    const zeroOrOne = getRandomInt(0, 2);
    const getRandomSegment = randomSegments[zeroOrOne];

    const updateTotalAngle =
      totalAngle +
      (zeroOrOne === 0 ? oneSegmentAngle / 2 : -(oneSegmentAngle / 2));

    rotation.value = withTiming(updateTotalAngle, { duration: 600 });

    const winner = segments[getRandomSegment].label;
    setWinner(getRandomSegment);
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
    bottom: 260 + wheelTranslateY.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.wheelContainer, animatedStyle]}>
        <Grid>
          <Svg
            width={TOTAL_SIZE}
            height={TOTAL_SIZE}
            viewBox={`-${BORDER_WIDTH} -${BORDER_WIDTH} ${
              TOTAL_SIZE + BORDER_WIDTH * 2
            } ${TOTAL_SIZE + BORDER_WIDTH * 2}`}
          >
            <Circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS + BORDER_WIDTH / 2}
              fill={winner ? "#252525" : "#fff"}
            />
            {/* Рулетка */}
            <G rotation={-90} origin={`${CENTER}, ${CENTER}`}>
              {segments.map((segment, index) => {
                const startAngle = (index * 360) / segments.length;
                const endAngle = ((index + 1) * 360) / segments.length;
                return (
                  <RouletteSegment
                    key={index}
                    segment={segment}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    winner={winner}
                    index={index}
                  />
                );
              })}
            </G>
          </Svg>
        </Grid>
      </Animated.View>

      <Animated.View
        style={[
          // { backgroundColor: "red" },

          styles.centerOverlay,
          cursorAnimatedStyle,
        ]}
      >
        <Svg
          width={WHEEL_SIZE}
          height={WHEEL_SIZE}
          viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
        >
          <Polygon
            points={`${CENTER + 10},${CENTER - RADIUS * 0.15} ${CENTER + 25},${
              CENTER - RADIUS * 0.15
            } ${CENTER},${CENTER - RADIUS * 0.3}`}
            fill="#00000021"
          />
          <Polygon
            points={`${CENTER - 15},${CENTER - RADIUS * 0.15} ${CENTER + 15},${
              CENTER - RADIUS * 0.15
            } ${CENTER},${CENTER - RADIUS * 0.3}`}
            fill="#ffffff"
          />

          <Circle
            cx={CENTER + 5}
            cy={CENTER + 9}
            r={RADIUS * 0.2}
            fill="#00000027"
          />
          <Circle cx={CENTER} cy={CENTER} r={RADIUS * 0.2} fill="#e1e1e1" />
          <Circle cx={CENTER} cy={CENTER} r={RADIUS * 0.11} fill="#c0c0c0" />
        </Svg>
      </Animated.View>

      <TouchableOpacity
        style={[{ opacity: isSpinning ? 0 : 1, top: 150 }, [styles.button]]}
        onPress={spinWheel}
        disabled={isSpinning}
      >
        <Text style={styles.buttonText}>ВРАЩАТЬ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#5e3677",
  },
  wheelContainer: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    transform: [{ translateY: 100 }],
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FF5722",
    borderRadius: 8,
  },
  centerOverlay: {
    position: "absolute",
    // top: CENTER + 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default Roulette;
