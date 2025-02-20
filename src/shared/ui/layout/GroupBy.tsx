import React, { PropsWithChildren } from "react";
import Grid from "../grid/Grid";
import Typography from "../typography/Typography";

interface GroupByProps extends PropsWithChildren {
  title: string;
  subtext?: string;
}

export default function GroupBy({ title, subtext, children }: GroupByProps) {
  return (
    <Grid space="sm">
      <Typography variant="headline" weight="bold">
        {title}
      </Typography>
      <Grid>{children}</Grid>
    </Grid>
  );
}
