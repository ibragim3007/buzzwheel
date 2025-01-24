import { usePackage } from "@/src/entities/Package/usePackage";
import { HORIZONTAL_PADDINGS } from "@/src/shared/config/constants/constants";
import { useTheme } from "@/src/shared/hooks/useTheme";
import { Dare } from "@/src/shared/types/globalTypes";
import Button from "@/src/shared/ui/buttons/Button";
import Grid from "@/src/shared/ui/grid/Grid";
import Paper from "@/src/shared/ui/layout/Paper";
import Typography from "@/src/shared/ui/typography/Typography";
import { Image } from "react-native";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";

interface DareDisplayProps {
  dare: Dare;
  hideDare: () => void;
}

export default function DareDisplay({ dare, hideDare }: DareDisplayProps) {
  const colors = useTheme();
  const { pickedPackages } = usePackage();
  const currentPackage = pickedPackages.find((pkg) => pkg.id === dare.package);

  return (
    <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
      <Grid space="lg">
        <Paper
          marginHorizontal={HORIZONTAL_PADDINGS}
          padding={30}
          style={{ backgroundColor: colors.text.white, borderRadius: 20 }}
        >
          <Grid align="center" paddingTop={60}>
            <Paper
              style={{
                position: "absolute",
                top: -100,
                backgroundColor: colors.text.white,
                borderRadius: 100,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 6,
                shadowOffset: {
                  height: 5,
                  width: 4,
                },
              }}
              padding={20}
            >
              <Image
                height={100}
                width={100}
                source={{
                  uri: `data:image/png;base64,${currentPackage?.imageEncoded}`,
                }}
              />
            </Paper>
            <Grid space="lg">
              <Typography
                variant="title-2"
                weight="bold"
                color="secondary"
                textAlign="center"
              >
                {currentPackage?.name}
              </Typography>
              <Typography
                style={{ lineHeight: 26 }}
                textAlign="center"
                weight="bold"
                color="secondary"
              >
                {dare.action}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Grid width="100%" align="center">
          <Button style={{ width: "80%" }} title="next" onPress={hideDare} />
        </Grid>
      </Grid>
    </Animated.View>
  );
}
