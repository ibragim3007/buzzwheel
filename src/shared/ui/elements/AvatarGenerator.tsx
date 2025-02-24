import React from "react";
import Svg, { Circle, Ellipse, Path, Rect } from "react-native-svg";

interface AvatarProps {
  size?: number;
}

const getRandomFromArray = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const getRandomColor = (colors: string[]) => getRandomFromArray(colors);

const Avatar: React.FC<AvatarProps> = ({ size = 120 }) => {
  // Цветовые палитры
  const skinTones = ["#FBD1B7", "#F1C27D", "#E0AC69", "#C68642", "#8D5524"];
  const hairColors = ["#000000", "#4B3621", "#A55728", "#B55239", "#D6B370"];
  const bgColors = ["#FFD3B6", "#FFAAA5", "#FF8B94", "#A8E6CF", "#DCEDC1"];

  const skinColor = getRandomColor(skinTones);
  const hairColor = getRandomColor(hairColors);
  const bgColor = getRandomColor(bgColors);

  const faceShape = Math.random() > 0.5 ? "ellipse" : "circle";
  const hairStyle = getRandomFromArray(["short", "curly", "long"]);
  const eyeSize = Math.random() > 0.5 ? 5 : 4;
  const mouthType = Math.random() > 0.5 ? "smile" : "neutral";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Фон */}
      <Rect width="100" height="100" fill={bgColor} rx={20} />

      {/* Волосы */}
      {hairStyle === "short" && (
        <Path d="M20,40 C30,10 70,10 80,40 Z" fill={hairColor} />
      )}
      {hairStyle === "curly" && (
        <Path
          d="M20,40 Q50,5 80,40 Q65,10 35,40 Q50,15 20,40 Z"
          fill={hairColor}
        />
      )}
      {hairStyle === "long" && (
        <Path
          d="M20,40 C20,10 80,10 80,40 L80,70 C80,80 20,80 20,70 Z"
          fill={hairColor}
        />
      )}

      {/* Лицо */}
      {faceShape === "circle" ? (
        <Circle cx="50" cy="55" r="25" fill={skinColor} />
      ) : (
        <Ellipse cx="50" cy="55" rx="25" ry="30" fill={skinColor} />
      )}

      {/* Глаза */}
      <Circle cx="40" cy="50" r={eyeSize} fill="#000" />
      <Circle cx="60" cy="50" r={eyeSize} fill="#000" />

      {/* Нос */}
      <Path
        d="M50 53 Q49 58 50 58 Q51 58 50 53"
        stroke="#000"
        strokeWidth="1"
        fill="none"
      />

      {/* Рот */}
      {mouthType === "smile" ? (
        <Path
          d="M40 65 Q50 70 60 65"
          stroke="#000"
          strokeWidth="1.5"
          fill="none"
        />
      ) : (
        <Path d="M42 65 L58 65" stroke="#000" strokeWidth="1.5" fill="none" />
      )}
    </Svg>
  );
};

export default Avatar;
