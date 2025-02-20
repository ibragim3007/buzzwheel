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
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { SvgUri } from "react-native-svg";
import ButtonTimer from "./ButtonTimer";
import Header from "@/src/widget/Header";
import { Image } from "expo-image";

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
      <Grid space="lg">
        <Paper
          marginHorizontal={HORIZONTAL_PADDINGS}
          padding={30}
          style={{ backgroundColor: colors.text.white, borderRadius: 20 }}
        >
          <Grid align="center" paddingTop={40}>
            <Paper
              style={{
                position: "absolute",
                top: -normalizedSize(86),
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
              padding={15}
            >
              <Image
                style={{
                  height: normalizedSize(83),
                  width: normalizedSize(83),
                }}
                source={getActualImageLink(currentPackage?.imageEncoded || "")}
                contentFit="cover"
              />
            </Paper>
            <Grid space="lg">
              <Grid>
                <Typography
                  variant="title-2"
                  weight="bold"
                  color="secondary"
                  textAlign="center"
                >
                  {dare.title}
                </Typography>
              </Grid>
              <Typography
                style={{ lineHeight: 26 }}
                textAlign="center"
                weight="bold"
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
        {dare.time ? (
          <Grid width="100%" align="center">
            <ButtonTimer dare={dare} handleDone={hideDare} />
          </Grid>
        ) : (
          <Grid width="100%" align="center">
            <Button
              style={{ width: "80%" }}
              title="Готово"
              onPress={hideDare}
            />
          </Grid>
        )}
      </Grid>
    </Animated.View>
  );
}
