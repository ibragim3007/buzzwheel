import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

import {
  TypographyProps,
  fontsWeights,
  TypographyStyles,
  getColorsStyles,
} from "../styles/typography/typography";
import { useTheme } from "../hooks/useTheme";

const Typography = (props: TypographyProps) => {
  const colors = useTheme();

  const fontStyles = fontsWeights[props.weight || "regular"];
  const typographyStyle = TypographyStyles[props.variant || "body"];
  const colorStyle: TextProps["style"] =
    getColorsStyles(colors)[props.color || "primary"];

  const stylesText = StyleSheet.flatten([
    props.textAlign && { textAlign: props.textAlign },
    typographyStyle,
    fontStyles,
    colorStyle,
    props.style,
  ]);

  return (
    <Text {...props} style={stylesText}>
      {props.children}
    </Text>
  );
};

export default Typography;
