import { useTheme } from "@/src/shared/hooks/useTheme";
import WrapIconInPressable from "@/src/shared/ui/wrapper/WrapIconInPressable";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function GiftIcon() {
  const colors = useTheme();
  return (
    <WrapIconInPressable
      primaryColor={colors.accent.secondary}
      style={{ borderColor: colors.accent.secondary }}
    >
      <Ionicons name="gift-outline" size={22} color={colors.accent.secondary} />
    </WrapIconInPressable>
  );
}
