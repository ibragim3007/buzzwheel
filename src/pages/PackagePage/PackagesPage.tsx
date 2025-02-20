import { usePackage } from "@/src/entities/Package/usePackage";
import Packages from "@/src/module/Packages/Packages";
import { useTheme } from "@/src/shared/hooks/useTheme";
import Button from "@/src/shared/ui/buttons/Button";
import GradientShadow from "@/src/shared/ui/elements/GradientShadow";
import Grid from "@/src/shared/ui/grid/Grid";
import SafeWrapper from "@/src/shared/ui/layout/SafeWrapper";
import ScrollPageWrapper from "@/src/shared/ui/layout/ScrollPageWrapper";
import Typography from "@/src/shared/ui/typography/Typography";
import Header from "@/src/widget/Header";
import { useRouter } from "expo-router";

import React from "react";

export default function PackagePage() {
  const colors = useTheme();
  const { pickedPackages } = usePackage();
  const { navigate } = useRouter();
  const onPressPlay = () => {
    navigate("/screens/game");
  };

  return (
    <Grid flex={1}>
      <ScrollPageWrapper>
        <SafeWrapper style={{ paddingBottom: 200 }}>
          <Header back />

          <Grid space="lg">
            <Typography textAlign="center" weight="bold" variant="title-1">
              Pick your modes!
            </Typography>
            <Packages />
          </Grid>
        </SafeWrapper>
      </ScrollPageWrapper>

      {pickedPackages.length > 0 && (
        <>
          <GradientShadow color={colors.accent.primary} height={320} />
          <Grid
            align="center"
            justfity="center"
            style={{
              position: "absolute",
              bottom: 40,
              width: "100%",
              // shadowColor: colors.accent.primary,
              // shadowOpacity: 1,
              // shadowRadius: 60,
            }}
          >
            <Button
              onPress={onPressPlay}
              title="Play"
              style={{ width: "70%" }}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}
