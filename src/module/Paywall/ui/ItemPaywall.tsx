import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import React from 'react';

interface ItemPaywallProps {
  icon: React.ReactNode;
  title: string;
}

export default function ItemPaywall({ icon, title }: ItemPaywallProps) {
  return (
    <Grid space="md" align="center" justfity="center" row>
      <Grid width="10%">{icon}</Grid>
      <Grid width="60%">
        <Typography>{title}</Typography>
      </Grid>
    </Grid>
  );
}
