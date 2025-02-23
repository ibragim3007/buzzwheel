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
          width="95%"
          height={heightBlock}
          style={{
            position: "absolute",
            borderRadius: 40,
            alignSelf: "center",
            zIndex: -10,
            // transform: [
            //   {
            //     skewX: "-5deg",
            //   },
            //   { scale: 0.96 },
            //   {
            //     skewY: "-3deg",
            //   },
            // ],
          }}
        >
          <GradientShadow
            secondColor={colors.text.white}
            height={35}
            color={colors.background.primary}
          />
        </Grid> */}

        <View ref={ref} onLayout={handleLayout}>
          <Grid
            paddingVertical={40}
            paddingHorizontal={30}
            width="99%"
            color={colors.text.primary}
            style={{ borderRadius: 50 }}
          >
            <Grid align="center" space="md">
              {dare.time ? (
                <ButtomTimerInCard dare={dare} handleDone={hideDare} />
              ) : null}

              <Grid space="md">
                <Typography
                  variant="title-3"
                  weight="bold"
                  color="secondary"
                  textAlign="center"
                >
                  {dare.title}
                </Typography>

                <Typography
                  style={{ lineHeight: 27 }}
                  textAlign="center"
                  weight="regular"
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
