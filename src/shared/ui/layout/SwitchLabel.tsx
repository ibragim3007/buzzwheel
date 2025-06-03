import { Pressable } from 'react-native';
import SwitchCustom, { SwitchCustomProps } from '../controller/SwitchCustom';
import Grid from '../grid/Grid';
import Typography from '../typography/Typography';

interface SwitchLabelProps extends SwitchCustomProps {
  label: string | React.ReactNode;
  isBlocked?: boolean;
}

export default function SwitchLabel({ label, isBlocked, ...props }: SwitchLabelProps) {
  return (
    <Pressable>
      <Grid row space="md" align="center" justfity="space-between">
        <Typography weight="medium" variant="callout">
          {label}
        </Typography>
        <SwitchCustom disabled={isBlocked} {...props} />
      </Grid>
    </Pressable>
  );
}
