import { TextProps } from 'react-native';
import { normalizedSize } from '../../utils/size';
import { PalitraInterface } from '../../config/theme/theme';

type TypographyVariants =
  | 'largeTitle'
  | 'title-0'
  | 'title-1'
  | 'title-2'
  | 'title-3'
  | 'title-4'
  | 'headline'
  | 'body'
  | 'callout'
  | 'subhead'
  | 'footnote'
  | 'caption-1'
  | 'caption-2';

export type TypographyWeight = 'light' | 'regular' | 'bold' | 'medium' | 'semiBold';
export type TypographyWeightSecondary = 'light' | 'regular' | 'bold' | 'medium' | 'extraBold' | 'black';

export type TColor = 'primary' | 'secondary' | 'disabled' | 'white' | 'error' | 'success' | 'secondary-accent';
export type TTextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
export interface TypographyProps extends TextProps {
  variant?: TypographyVariants;
  weight?: TypographyWeight;
  weightSecondary?: TypographyWeightSecondary;
  color?: TColor;
  textAlign?: TTextAlign;
  isLayoutAnimation?: boolean;
  marginVertical?: number;
  marginHorizontal?: number;
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  paddingLeft?: number;
  paddingRight?: number;
  lineHeight?: number;
}

export const TypographyStyles: Record<TypographyVariants, TextProps['style']> = {
  largeTitle: { fontSize: normalizedSize(34) },
  'title-0': { fontSize: normalizedSize(32) },
  'title-1': { fontSize: normalizedSize(28) },
  'title-2': { fontSize: normalizedSize(22) },
  'title-3': { fontSize: normalizedSize(20) },
  'title-4': { fontSize: normalizedSize(18) },
  headline: { fontSize: normalizedSize(18) },
  body: { fontSize: normalizedSize(17) },
  callout: { fontSize: normalizedSize(16) },
  subhead: { fontSize: normalizedSize(15) },
  footnote: { fontSize: normalizedSize(14) },
  'caption-1': { fontSize: normalizedSize(12) },
  'caption-2': { fontSize: normalizedSize(11) },
};

export const getColorsStyles = (colors: PalitraInterface): Record<TColor, TextProps['style']> => ({
  primary: {
    color: colors.text.primary,
  },
  secondary: {
    color: colors.text.secondary,
  },
  disabled: {
    color: colors.text.disabled,
  },
  white: {
    color: colors.text.white,
  },
  error: {
    color: colors.text.error,
  },
  success: {
    color: colors.text.secondary,
  },
  'secondary-accent': {
    color: colors.accent.secondary,
  },
});

export const fontWeight = {
  light: 'Manrope_300Light',
  semiBold: 'Manrope_600SemiBold',
  regular: 'Manrope_400Regular',
  medium: 'Manrope_500Medium',
  bold: 'Manrope_700Bold',
};

export const fontWeightThird = {
  light: 'PassionOne_400Regular',
  regular: 'PassionOne_700Bold',
  medium: 'PassionOne_900Black',
};

export const fontWeightSecondary = {
  light: 'Rubik_300Light',
  regular: 'Rubik_400Regular',
  medium: 'Rubik_500Medium',
  bold: 'Rubik_700Bold',
  black: 'Rubik_900Black',
  extraBold: 'Rubik_800ExtraBold',
};
export const fontsWeightsSecondary: Record<TypographyWeightSecondary, TextProps['style']> = {
  light: {
    fontFamily: fontWeightSecondary.light,
  },
  regular: {
    fontFamily: fontWeightSecondary.regular,
  },
  bold: {
    fontFamily: fontWeightSecondary.bold,
  },
  medium: {
    fontFamily: fontWeightSecondary.medium,
  },
  extraBold: {
    fontFamily: fontWeightSecondary.extraBold,
  },
  black: {
    fontFamily: fontWeightSecondary.black,
  },
};

export const fontsWeights: Record<TypographyWeight, TextProps['style']> = {
  light: {
    fontFamily: fontWeight.light,
  },
  regular: {
    fontFamily: fontWeight.regular,
  },
  bold: {
    fontFamily: fontWeight.bold,
  },
  medium: {
    fontFamily: fontWeight.medium,
  },
  semiBold: {
    fontFamily: fontWeight.semiBold,
  },
};
