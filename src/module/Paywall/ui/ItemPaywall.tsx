import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import React from 'react';

interface ItemPaywallProps {
  icon: React.ReactNode;
  title: string;
}

export default function ItemPaywall({ icon, title }: ItemPaywallProps) {
  return (
    <Grid space="md" align="center" row>
      <Grid>{icon}</Grid>
      <Grid width="60%">
        <Typography variant="callout">{title}</Typography>
      </Grid>
    </Grid>
  );
}
