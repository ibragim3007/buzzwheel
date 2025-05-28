import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { TypographyProps } from '../../styles/typography/typography';
import AnimTouchWrapper from '../animations/AnimTouchWrapper';
import Grid from '../grid/Grid';
import Typography from '../typography/Typography';

interface ButtonProps extends PressableProps {
  title: string;
  startIcon?: React.ReactNode;
  textStyle?: TypographyProps;
  gradientColors?: [string, string];
  borderColor?: string;
}

export default function Button({
  title,
  startIcon,
  textStyle,
  disabled,
  gradientColors,
  borderColor,
  ...props
}: ButtonProps) {
  const colors = useTheme();
  // const defaultColor = props.style

  const [currentColorButton, setCurrentColorButton] = useState(colors.accent.primary);

  const onTouchStart = () => {
    setCurrentColorButton(colors.accent.quaternary);
  };

  const onTouchEnd = () => {
    setCurrentColorButton(colors.accent.primary);
  };

  const buttonColors: [string, string] =
    gradientColors ||
    (disabled
      ? [colors.background.secondary, colors.background.secondary]
      : [colors.accent.primary, colors.accent.secondary]);
  const styles = StyleSheet.flatten([
    {
      // backgroundColor: disabled ? colors.background.secondary : currentColorButton,
      paddingHorizontal: 25,
      paddingVertical: 17,
      borderRadius: colors.styles.borderRadiusDefault,

      borderColor: disabled ? colors.background.secondary : currentColorButton,
    },
    props.style,
  ]);

  const fontStyles = StyleSheet.flatten([
    {
      color: disabled ? colors.text.disabled : colors.text.primary,
    },
    textStyle?.style,
  ]);

  return (
    <AnimTouchWrapper>
      <LinearGradient
        // pointerEvents="none"
        start={[-0.5, -0.5]}
        end={[3.5, 1]}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: disabled ? 'transparent' : borderColor ? borderColor : '#ffffff5f',
        }}
        colors={buttonColors}
      >
        <Pressable {...props} style={styles} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <Grid row space="sm" justfity="center" align="center">
            {startIcon}
            <Typography variant="title-2" textAlign="center" style={fontStyles} weight="bold" {...textStyle}>
              {title}
            </Typography>
          </Grid>
        </Pressable>
      </LinearGradient>
    </AnimTouchWrapper>
  );
}
