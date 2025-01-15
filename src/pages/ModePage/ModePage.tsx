import { useMode } from "@/src/entities/Mode/useMode";
import Grid from "@/src/shared/ui/grid/Grid";
import PageWrapper from "@/src/shared/ui/layout/PageWrapper";
import SafeWrapper from "@/src/shared/ui/layout/SafeWrapper";
import Typography from "@/src/shared/ui/typography/Typography";
import Header from "@/src/widget/Header";
import React from "react";

export default function ModePage() {
  const { modes } = useMode();
  return (
    <PageWrapper flex={1}>
      <SafeWrapper>
        <Header back />
        <Typography textAlign="center" weight="bold" variant="title-1">
          Pick you mode!
        </Typography>
        {modes.map((mode) => (
          <Grid key={mode.id}>
            <Typography>{mode.name}</Typography>
          </Grid>
        ))}
      </SafeWrapper>
    </PageWrapper>
  );
}
