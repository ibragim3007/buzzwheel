import { useTheme } from '@/src/shared/hooks/useTheme';
import AnimTouchWrapper from '@/src/shared/ui/animations/AnimTouchWrapper';
import { GridPressable, GridProps } from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';

interface InGameButtonProps extends GridProps {
  title: string;
  onPress?: () => void;
}

export default function InGameButton({ title, onPress, ...props }: InGameButtonProps) {
  const colors = useTheme();
  return (
    <AnimTouchWrapper>
      <GridPressable
        onPress={onPress}
        color={colors.accent.primary}
        paddingHorizontal={10}
        align="center"
        justfity="center"
        paddingVertical={22}
        style={{ borderRadius: 20 }}
        {...props}
      >
        <Typography weight="bold" variant="title-3" textAlign="center">
          {title}
        </Typography>
      </GridPressable>
      {/* <GradientShadow height={30} /> */}
    </AnimTouchWrapper>
  );
}
