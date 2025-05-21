import React, { useState } from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import Typography from '../typography/Typography';
import { useTheme } from '../../hooks/useTheme';
import Grid from '../grid/Grid';
import { fontsWeights, TypographyProps } from '../../styles/typography/typography';
import AnimTouchWrapper from '../animations/AnimTouchWrapper';

interface ButtonProps extends PressableProps {
  title: string;
  startIcon?: React.ReactNode;
  textStyle?: TypographyProps;
}

export default function Button({ title, startIcon, textStyle, disabled, ...props }: ButtonProps) {
  const colors = useTheme();
  // const defaultColor = props.style

  const [currentColorButton, setCurrentColorButton] = useState(colors.accent.primary);

  const onTouchStart = () => {
    setCurrentColorButton(colors.accent.quaternary);
  };

  const onTouchEnd = () => {
    setCurrentColorButton(colors.accent.primary);
  };

  const styles = StyleSheet.flatten([
    {
      backgroundColor: disabled ? colors.background.secondary : currentColorButton,
      paddingHorizontal: 25,
      paddingVertical: 17,
      borderRadius: 30,
      borderWidth: 1,
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
      <Pressable {...props} style={styles} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <Grid row space="sm" justfity="center" align="center">
          {startIcon}
          <Typography variant="title-3" textAlign="center" style={fontStyles} weight="bold" {...textStyle}>
            {title}
          </Typography>
        </Grid>
      </Pressable>
    </AnimTouchWrapper>
  );
}
