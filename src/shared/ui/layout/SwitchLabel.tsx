import React from "react";
import SwitchCustom, { SwitchCustomProps } from "../controller/SwitchCustom";
import Grid from "../grid/Grid";
import Typography from "../typography/Typography";
import { Pressable } from "react-native";

interface SwitchLabelProps extends SwitchCustomProps {
  label: string;
}

export default function SwitchLabel({ label, ...props }: SwitchLabelProps) {
  return (
    <Pressable>
      <Grid row space="md" align="center" justfity="space-between">
        <Typography weight="medium" variant="callout">
          {label}
        </Typography>
        <SwitchCustom {...props} />
      </Grid>
    </Pressable>
  );
}
