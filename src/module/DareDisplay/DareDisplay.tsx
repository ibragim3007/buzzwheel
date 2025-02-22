import { usePackage } from "@/src/entities/Package/usePackage";
import { HORIZONTAL_PADDINGS } from "@/src/shared/config/constants/constants";
import { getActualImageLink } from "@/src/shared/helpers/getActualImageLink";
import {
  getTransformedArrayOfString,
  updatedArray,
} from "@/src/shared/helpers/textConverters/coreLogic";
import { useTheme } from "@/src/shared/hooks/useTheme";
import { Dare, Player } from "@/src/shared/types/globalTypes";
import Button from "@/src/shared/ui/buttons/Button";
import Grid from "@/src/shared/ui/grid/Grid";
import Paper from "@/src/shared/ui/layout/Paper";
import Typography from "@/src/shared/ui/typography/Typography";
import { normalizedSize } from "@/src/shared/utils/size";
import { Image } from "expo-image";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import ButtonTimer from "./ButtonTimer";
import GradientShadow from "@/src/shared/ui/elements/GradientShadow";
import ButtomTimerInCard from "./ButtomTimerInCard";

interface DareDisplayProps {
  dare: Dare;
  currentTurn: Player;
  players: Player[];
  hideDare: () => void;
}

export default function DareDisplay({
  dare,
  currentTurn,
  players,
  hideDare,
}: DareDisplayProps) {
  const colors = useTheme();
  const { pickedPackages } = usePackage();
  const currentPackage = pickedPackages.find((pkg) => pkg.id === dare.package);

  return (
    <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
      <Grid gap={90}>
        <Paper
          marginHorizontal={HORIZONTAL_PADDINGS}
          padding={30}
          paddingBottom={40}
          style={{
            backgroundColor: colors.text.white,
            borderRadius: 40,
          }}
        >
          <GradientShadow
            secondColor={colors.text.white}
            height={50}
            color={colors.accent.primary}
          />

          <Grid align="center" paddingBottom={30} space="md">
            {dare.time && (
              <Grid width="100%">
                <ButtomTimerInCard dare={dare} handleDone={hideDare} />
              </Grid>
            )}

            {/* <Paper
              style={{
                position: "absolute",
                bottom: -70,
                left: "-15%",
                transform: [{ rotate: "15deg" }],
                backgroundColor: colors.text.primary,
                borderRadius: 100,
                shadowColor: colors.background.primary,
                shadowOpacity: 0.2,
                shadowRadius: 10,
                shadowOffset: {
                  height: -3,
                  width: 0,
                },
              }}
              padding={5}
            >
              <Image
                style={{
                  height: normalizedSize(50),
                  width: normalizedSize(50),
                }}
                source={getActualImageLink(currentPackage?.imageEncoded || "")}
                contentFit="cover"
              />
            </Paper> */}
            <Grid space="lg">
              <Typography
                variant="title-2"
                weight="bold"
                color="secondary"
                textAlign="center"
              >
                {dare.title}
              </Typography>

              <Typography
                style={{ lineHeight: 26 }}
                textAlign="center"
                weight="medium"
                color="secondary"
              >
                {updatedArray(
                  getTransformedArrayOfString(dare.action),
                  currentTurn,
                  players
                ).join("")}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        {/* {dare.time ? (
          <Grid width="100%" align="center">
            <ButtonTimer dare={dare} handleDone={hideDare} />
          </Grid>
        ) : ( */}
        <Grid width="100%" align="center">
          <Button style={{ width: "80%" }} title="Готово" onPress={hideDare} />
        </Grid>
        {/* )} */}
      </Grid>
    </Animated.View>
  );
}
