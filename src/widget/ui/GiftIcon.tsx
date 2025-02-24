import { useTheme } from "@/src/shared/hooks/useTheme";
import WrapIconInPressable from "@/src/shared/ui/wrapper/WrapIconInPressable";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";

export default function GiftIcon() {
  const colors = useTheme();
  const { navigate } = useRouter();

  const navigateToGift = () => {
    navigate("/screens/gift");
  };

  return (
    <WrapIconInPressable
      onPress={navigateToGift}
      backgroundColor={colors.accent.secondary}
    >
      <Ionicons name="gift" size={22} color={colors.text.white} />
    </WrapIconInPressable>
  );
}
