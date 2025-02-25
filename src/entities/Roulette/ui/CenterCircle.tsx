import { RouletteOptions } from "@/src/entities/Roulette/types";
import React from "react";
import Svg, { Circle, Polygon } from "react-native-svg";

interface CenterCircleProps {
  options: RouletteOptions;
}

const RADIUS = 30;
const SIZE = 90;
const CENTER = SIZE / 2;

export default function CenterCircle({ options }: CenterCircleProps) {
  // const { SIZE, CENTER, RADIUS } = options;

  return (
    <Svg
      width={SIZE}
      height={SIZE}
      style={{ backgroundColor: "coral" }}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
    >
      <Polygon
        points={`
          ${CENTER - 13},${CENTER - RADIUS + 3} 
          ${CENTER + 13},${CENTER - RADIUS + 3} 
          ${CENTER},${CENTER - RADIUS - 13}     
        `}
        fill="#fff"
      />
      <Circle r={RADIUS} cx={CENTER} cy={CENTER} fill="#ffffff" />
      <Circle r={RADIUS * 0.6} cx={CENTER} cy={CENTER} fill="#d8d8d8" />
      {/* <Polygon
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
      <Circle cx={CENTER} cy={CENTER} r={RADIUS * 0.2} fill="#ffffff" />

      <Circle cx={CENTER} cy={CENTER} r={RADIUS * 0.1} fill="#d8d8d8" /> */}
    </Svg>
  );
}
