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
import Typography from "@/src/shared/ui/typography/Typography";
import { normalizedSize } from "@/src/shared/utils/size";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import { View } from "react-native";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import ButtomTimerInCard from "./ButtomTimerInCard";
import GradientShadow from "@/src/shared/ui/elements/GradientShadow";

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
  const ref = useRef<View | null>(null);
  const [heightBlock, setHeightBlock] = useState(300);

  const colors = useTheme();
  const { pickedPackages } = usePackage();
  const currentPackage = pickedPackages.find((pkg) => pkg.id === dare.package);

  const handleLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeightBlock(height); // обновляем высоту
  };
  return (
    <Animated.View
      style={{ width: "100%", marginHorizontal: HORIZONTAL_PADDINGS }}
      entering={SlideInRight}
      exiting={SlideOutLeft}
    >
      <Grid gap={80} align="center">
        {/* <Grid
          color={colors.text.white}
          width="100%"
          height={heightBlock}
          style={{
            position: "absolute",
            borderRadius: 40,
            alignSelf: "center",
            zIndex: -10,
            transform: [
              {
                skewX: "-6deg",
              },
              { scale: 1 },
              {
                skewY: "-2deg",
              },
            ],
          }}
        /> */}

        <View ref={ref} onLayout={handleLayout}>
          <Grid
            paddingVertical={40}
            paddingHorizontal={30}
            marginHorizontal={HORIZONTAL_PADDINGS}
            // width="100%"
            color={colors.text.white}
            style={{ borderRadius: 40 }}
          >
            <Grid align="center" space="lg">
              <Grid marginBottom={40} space="md">
                {dare.time ? (
                  <ButtomTimerInCard dare={dare} handleDone={hideDare} />
                ) : null}
                <Typography
                  variant="title-3"
                  weight="bold"
                  color="secondary-accent"
                  textAlign="center"
                >
                  {dare.title}
                </Typography>
              </Grid>

              <Grid marginBottom={60}>
                <Typography
                  style={{ lineHeight: 33, letterSpacing: 0.3 }}
                  textAlign="center"
                  // weight="bold"
                  variant="title-3"
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
            <Grid
              padding={5}
              style={{
                position: "absolute",
                bottom: -30,
                right: 15,
                // backgroundColor: "#fff",
                borderRadius: 50,
                shadowColor: colors.background.primary,
                shadowOpacity: 0.17,
                shadowRadius: 10,
              }}
            >
              <Image
                style={{
                  height: normalizedSize(60),
                  width: normalizedSize(60),
                }}
                source={getActualImageLink(currentPackage?.imageEncoded || "")}
                contentFit="contain"
              />
            </Grid>
          </Grid>
        </View>

        <Grid row>
          <Button style={{ width: "80%" }} title="Готово" onPress={hideDare} />
        </Grid>
      </Grid>
    </Animated.View>
  );
}
