import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import {
  fontsWeights,
  fontWeightSecondary,
  getColorsStyles,
  TypographyProps,
  TypographyStyles,
} from '../../styles/typography/typography';

const Typography = (props: TypographyProps) => {
  const colors = useTheme();

  const fontStyles = props.weightSecondary
    ? fontWeightSecondary[props.weightSecondary]
    : fontsWeights[props.weight || 'regular'];

  const typographyStyle = TypographyStyles[props.variant || 'body'];
  const colorStyle: TextProps['style'] = getColorsStyles(colors)[props.color || 'primary'];

  const stylesText: StyleProp<TextStyle> = StyleSheet.flatten([
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
