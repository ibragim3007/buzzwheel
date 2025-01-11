import React from "react";
import { DimensionValue, StyleProp, ViewStyle } from "react-native";
import { FlexAlignType, StyleSheet, View, ViewProps } from "react-native";
import {
  calculateSpacing,
  TSpaceGrid,
} from "../helpers/styleHelpers/calculateSpacing";
import { normalizedSize } from "../utils/size";
import { normalizeLayoutDimenstionValue } from "../helpers/styleHelpers/normalizeLayoutDimenstionValue";

export interface GridProps extends ViewProps {
  flex?: number;
  color?: string;
  wrap?: boolean;
  align?: FlexAlignType;
  justfity?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  row?: boolean;
  gap?: number;
  space?: TSpaceGrid;
  height?: DimensionValue;
  width?: DimensionValue;
  padding?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  paddingBottom?: number;
  paddingTop?: number;
  paddingLeft?: number;
  paddingRight?: number;
  margin?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
}

const Grid = ({
  flex,
  color,
  align,
  justfity,
  row,
  gap,
  wrap,
  height,
  width,
  padding,
  space,
  paddingHorizontal,
  paddingVertical,
  margin,
  marginHorizontal,
  paddingBottom,
  paddingTop,
  paddingLeft,
  paddingRight,
  marginVertical,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
  ...props
}: GridProps) => {
  const gridStyles: StyleProp<ViewStyle> = StyleSheet.flatten([
    flex !== undefined && { flex },
    justfity !== undefined && { justifyContent: justfity },
    align !== undefined && { alignItems: align },
    color !== undefined && { backgroundColor: color },
    row !== undefined && { flexDirection: "row" },
    gap !== undefined && { gap: normalizedSize(gap) },
    wrap !== undefined && { flexWrap: "wrap" },
    height !== undefined && { height: normalizeLayoutDimenstionValue(height) },
    width !== undefined && { width: normalizeLayoutDimenstionValue(width) },
    padding !== undefined && { padding: normalizedSize(padding) },
    paddingVertical !== undefined && {
      paddingVertical: normalizedSize(paddingVertical),
    },
    paddingHorizontal !== undefined && {
      paddingHorizontal: normalizedSize(paddingHorizontal),
    },
    paddingTop !== undefined && { paddingTop: normalizedSize(paddingTop) },
    paddingBottom !== undefined && {
      paddingBottom: normalizedSize(paddingBottom),
    },
    paddingLeft !== undefined && { paddingLeft: normalizedSize(paddingLeft) },
    paddingRight !== undefined && {
      paddingRight: normalizedSize(paddingRight),
    },
    marginVertical !== undefined && {
      marginVertical: normalizedSize(marginVertical),
    },
    marginHorizontal !== undefined && {
      marginHorizontal: normalizedSize(marginHorizontal),
    },
    marginTop !== undefined && { marginTop: normalizedSize(marginTop) },
    marginBottom !== undefined && {
      marginBottom: normalizedSize(marginBottom),
    },
    marginRight !== undefined && { marginRight: normalizedSize(marginRight) },
    marginLeft !== undefined && { marginLeft: normalizedSize(marginLeft) },
    margin !== undefined && { margin: normalizedSize(margin) },
    space !== undefined && { gap: calculateSpacing(space) },
    props.style,
  ]);

  return <View {...props} style={gridStyles} />;
};

export default Grid;
