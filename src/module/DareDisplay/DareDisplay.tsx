import { Dare } from "@/src/shared/types/globalTypes";
import Button from "@/src/shared/ui/buttons/Button";
import Grid from "@/src/shared/ui/grid/Grid";
import Paper from "@/src/shared/ui/layout/Paper";
import Typography from "@/src/shared/ui/typography/Typography";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";

interface DareDisplayProps {
  dare: Dare;
  hideDare: () => void;
}

export default function DareDisplay({ dare, hideDare }: DareDisplayProps) {
  return (
    <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
      <Paper>
        <Grid>
          <Typography>{dare.action}</Typography>
        </Grid>
        <Button title="next" onPress={hideDare} />
      </Paper>
    </Animated.View>
  );
}
