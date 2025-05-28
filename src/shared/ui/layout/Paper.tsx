import { withPressable } from '../../hoc/withPressable';
import { useTheme } from '../../hooks/useTheme';
import Grid, { GridProps } from '../grid/Grid';

type PaperProps = GridProps;

export default function Paper({ ...props }: PaperProps) {
  const colors = useTheme();
  return (
    <Grid
      {...props}
      style={[
        {
          padding: 14,
          borderRadius: colors.styles.borderRadiusDefault,
          backgroundColor: colors.background.secondary,
        },
        props.style,
      ]}
    />
  );
}

export const PressablePaper = withPressable(Paper);
