import { getActualImageLink } from "@/src/shared/helpers/getActualImageLink";
import { useTheme } from "@/src/shared/hooks/useTheme";
import { Package } from "@/src/shared/types/globalTypes";
import Grid from "@/src/shared/ui/grid/Grid";
import Checked from "@/src/shared/ui/icons/Checked";

import Paper from "@/src/shared/ui/layout/Paper";
import Typography from "@/src/shared/ui/typography/Typography";
import React from "react";
import { Pressable } from "react-native";
import { SvgUri } from "react-native-svg";

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
          height: 140,
          borderColor: picked ? colors.accent.primary : "transparent",
        }}
        paddingVertical={10}
        paddingHorizontal={10}
        paddingRight={15}
      >
        {picked && <Checked />}
        <Grid flex={1} row space="md" align="center">
          <Grid width={75}>
            <SvgUri
              height={80}
              width={80}
              // source={{ uri: `data:image/png;base64,${pack.imageEncoded}` }}
              style={{ borderRadius: 5 }}
              uri={getActualImageLink(pack.imageEncoded)}
              // source={{
              //   uri: getActualImageLink(pack.imageEncoded),
              // }}
            />
          </Grid>
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
