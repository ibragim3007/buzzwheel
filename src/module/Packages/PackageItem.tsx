import { Package } from "@/src/entities/Package/types/types";
import { useTheme } from "@/src/shared/hooks/useTheme";
import Grid from "@/src/shared/ui/grid/Grid";
import Checked from "@/src/shared/ui/icons/Checked";

import Paper from "@/src/shared/ui/layout/Paper";
import Typography from "@/src/shared/ui/typography/Typography";
import React from "react";
import { Image, Pressable } from "react-native";

interface PackageItemProps {
  pack: Package;
  picked: boolean;
  onPress: (pack: Package) => void;
}

export default function PackageItem({
  pack,
  picked,
  onPress,
}: PackageItemProps) {
  const colors = useTheme();
  return (
    <Pressable onPress={() => onPress(pack)}>
      <Paper
        style={{
          backgroundColor: colors.background.secondary,
          borderRadius: 50,
          borderWidth: 3,
          borderColor: picked ? colors.accent.primary : "transparent",
        }}
        paddingVertical={10}
        paddingHorizontal={25}
      >
        {picked && <Checked />}
        <Grid row space="md" align="center">
          <Image height={50} width={50} source={{ uri: pack.imageEncoded }} />
          <Grid space="sm" flex={1}>
            <Typography variant="headline" weight="bold">
              {pack.name}
            </Typography>
            <Typography variant="callout" numberOfLines={3}>
              {pack.description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Pressable>
  );
}
