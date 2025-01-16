import { Modes } from "@/src/module/Modes";
import Grid from "@/src/shared/ui/grid/Grid";
import SafeWrapper from "@/src/shared/ui/layout/SafeWrapper";
import ScrollPageWrapper from "@/src/shared/ui/layout/ScrollPageWrapper";
import Typography from "@/src/shared/ui/typography/Typography";
import Header from "@/src/widget/Header";
import React from "react";

export default function ModePage() {
  return (
    <ScrollPageWrapper>
      <SafeWrapper>
        <Header back />

        <Grid space="lg">
          <Typography textAlign="center" weight="bold" variant="title-1">
            Pick you mode!
          </Typography>
          <Modes />
        </Grid>
      </SafeWrapper>
    </ScrollPageWrapper>
  );
}
