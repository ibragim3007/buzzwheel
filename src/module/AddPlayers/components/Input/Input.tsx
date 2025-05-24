import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { fontWeight } from '@/src/shared/styles/typography/typography';
import Button from '@/src/shared/ui/buttons/Button';
import Grid from '@/src/shared/ui/grid/Grid';
import Paper from '@/src/shared/ui/layout/Paper';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface InputProps {
  onCall: (name: string) => void;
}

export default function Input({ onCall }: InputProps) {
  const colors = useTheme();
  const [name, setName] = useState('');
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { vibrate } = useVibration();

  const inputRef = useRef<TextInput>(null);

  // Shared values for animation
  const bounce = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);

  const onPress = () => {
    setIsError(false);
    if (name.trim() === '') {
      setIsError(true);
      vibrate();

      // Trigger animations
      bounce.value = withSpring(-5, { stiffness: 250 }, () => {
        bounce.value = withSpring(0);
      });
      rotate.value = withSpring(5, { stiffness: 250 }, () => {
        rotate.value = withSpring(-5, {}, () => {
          rotate.value = withSpring(0);
        });
      });
      scale.value = withSpring(1.1, { stiffness: 250 }, () => {
        scale.value = withSpring(1);
      });

      return;
    }
    onCall(name);
    setName('');
    // inputRef.current?.blur();
  };

  const handleChangeText = (text: string) => {
    setIsError(false);
    if (text.length <= 25) setName(text);
  };

  const currentInputColor = isError ? colors.background.error : colors.accent.primary;

  // Animated style for the Paper component
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }, { rotate: `${rotate.value}deg` }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      {/* <Paper style={[{ borderRadius: 50 }]}> */}
      <Grid align="center" row>
        <TextInput
          accessibilityHint="Input field for player name"
          ref={inputRef}
          onChangeText={handleChangeText}
          value={name}
          cursorColor={colors.accent.primary}
          selectionColor={colors.accent.primary}
          placeholderTextColor={isError ? colors.text.error : colors.text.white}
          placeholder={isError ? 'Name is required' : 'Enter player name'}
          onSubmitEditing={onPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            borderWidth: 2,
            height: '100%',
            borderColor: currentInputColor,
            backgroundColor: isFocused ? colors.background.secondary : 'trans', // Fallback focus color
            paddingHorizontal: 25,
            flex: 1,
            borderTopLeftRadius: 50,
            borderBottomLeftRadius: 50,
            fontSize: 18,
            color: isError ? colors.text.error : colors.text.primary,
            fontFamily: fontWeight.medium,
            borderRightWidth: 0,
          }}
        />

        <Button
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            paddingLeft: 15,
            backgroundColor: currentInputColor,
          }}
          startIcon={<FontAwesome6 name="plus" size={20} color={colors.text.primary} />}
          onPress={onPress}
          title="Add"
        />
      </Grid>
      {/* {isError && (
          <Grid marginLeft={25}>
            <Typography color="error" variant="caption-1">
              Name is required
            </Typography>
          </Grid>
        )} */}
      {/* </Paper> */}
    </Animated.View>
  );
}
