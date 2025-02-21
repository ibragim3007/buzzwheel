import React from "react";
import Grid from "../shared/ui/grid/Grid";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../shared/hooks/useTheme";
import { useNavigation, useRouter } from "expo-router";
import WrapIconInCircle from "../shared/ui/wrapper/WrapIconInCircle";
import WrapIconInPressable from "../shared/ui/wrapper/WrapIconInPressable";

interface HeaderProps {
  back?: boolean;
  onPressSettings?: () => void;
}

export default function Header({ back, onPressSettings }: HeaderProps) {
  const colors = useTheme();
  const { navigate } = useRouter();
  const onPressBack = () => {
    navigate("..");
  };

  return (
    <Grid>
      {back ? (
        <Grid width="100%" row justfity="space-between">
          <WrapIconInPressable onPress={onPressBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </WrapIconInPressable>

          {onPressSettings && (
            <WrapIconInPressable onPress={onPressSettings}>
              <Ionicons
                name="settings-sharp"
                size={24}
                color={colors.text.primary}
              />
            </WrapIconInPressable>
          )}
        </Grid>
      ) : (
        <Ionicons name="settings-sharp" size={24} color={colors.text.primary} />
      )}
    </Grid>
  );
}
