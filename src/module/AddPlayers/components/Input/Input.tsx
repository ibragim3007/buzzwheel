import { withOpacity } from '@/src/module/Paywall/helpers/withOpacity';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { fontWeight } from '@/src/shared/styles/typography/typography';
import { normalizedSize } from '@/src/shared/utils/size';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, TextInput, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const ADD_BUTTON_SIZE = normalizedSize(48);

interface InputProps {
  onCall: (name: string) => void;
  // Пульсация кнопки «+», пока не добавлен ни один игрок — подсказка, с чего начать
  highlight?: boolean;
}

export default function Input({ onCall, highlight }: InputProps) {
  const colors = useTheme();
  const [name, setName] = useState('');
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();
  const { vibrate } = useVibration();

  const inputRef = useRef<TextInput>(null);

  // Shared values for animation
  const bounce = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);
  const pulse = useSharedValue(0);
  const pressScale = useSharedValue(1);

  useEffect(() => {
    if (highlight) {
      pulse.value = withRepeat(withTiming(1, { duration: 1400, easing: Easing.out(Easing.quad) }), -1);
    } else {
      cancelAnimation(pulse);
      pulse.value = withTiming(0);
    }
  }, [highlight]);

  const onPress = () => {
    setIsError(false);
    if (name.trim() === '') {
      setIsError(true);
      vibrate();
      inputRef.current?.focus();

      // Trigger animations
      bounce.value = withSpring(-5, { stiffness: 130, mass: 0.7 }, () => {
        bounce.value = withSpring(0);
      });
      rotate.value = withSpring(2, { stiffness: 130, mass: 0.5 }, () => {
        rotate.value = withSpring(-2, { mass: 0.5 }, () => {
          rotate.value = withSpring(0);
        });
      });
      scale.value = withSpring(1.04, { stiffness: 130, mass: 0.7 }, () => {
        scale.value = withSpring(1);
      });

      return;
    }
    onCall(name.trim());
    setName('');
  };

  const handleChangeText = (text: string) => {
    setIsError(false);
    if (text.length <= 25) setName(text);
  };

  const currentInputColor = isError ? colors.background.error : colors.accent.primary;
  const borderColor = isFocused || isError ? currentInputColor : withOpacity(colors.text.white, 0.06);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }, { rotate: `${rotate.value}deg` }, { scale: scale.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: highlight ? 0.6 * (1 - pulse.value) : 0,
    transform: [{ scale: 1 + pulse.value * 0.45 }],
  }));

  const addButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.background.secondary,
          borderRadius: normalizedSize(28),
          borderWidth: 1.5,
          borderColor,
          paddingLeft: normalizedSize(18),
          paddingRight: normalizedSize(6),
          paddingVertical: normalizedSize(6),
          gap: normalizedSize(10),
        }}
      >
        <Ionicons
          name="person-add"
          size={normalizedSize(20)}
          color={isError ? colors.text.error : isFocused ? colors.accent.primary : colors.text.disabled}
        />

        <TextInput
          accessibilityHint={t('homepage.input-field-for-player-name')}
          ref={inputRef}
          onChangeText={handleChangeText}
          value={name}
          keyboardAppearance="dark"
          autoCapitalize="words"
          returnKeyType="done"
          // Клавиатура остаётся открытой — удобно вбивать игроков подряд
          submitBehavior="submit"
          cursorColor={colors.accent.primary}
          selectionColor={colors.accent.primary}
          placeholderTextColor={isError ? colors.text.error : colors.text.disabled}
          placeholder={isError ? t('homepage.name-is-required') : t('homepage.enter-player-name')}
          onSubmitEditing={onPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            flex: 1,
            height: ADD_BUTTON_SIZE,
            fontSize: normalizedSize(17),
            color: isError ? colors.text.error : colors.text.primary,
            fontFamily: fontWeight.semiBold,
          }}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('homepage.add')}
          onPress={onPress}
          onPressIn={() => (pressScale.value = withSpring(0.88))}
          onPressOut={() => (pressScale.value = withSpring(1))}
          hitSlop={8}
        >
          <Animated.View
            pointerEvents="none"
            style={[
              {
                position: 'absolute',
                width: ADD_BUTTON_SIZE,
                height: ADD_BUTTON_SIZE,
                borderRadius: ADD_BUTTON_SIZE / 2,
                backgroundColor: colors.accent.primary,
              },
              pulseStyle,
            ]}
          />
          <Animated.View style={addButtonStyle}>
            <LinearGradient
              colors={[colors.accent.primary, colors.accent.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: ADD_BUTTON_SIZE,
                height: ADD_BUTTON_SIZE,
                borderRadius: ADD_BUTTON_SIZE / 2,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: name.trim() || highlight ? 1 : 0.85,
              }}
            >
              <FontAwesome6 name="plus" size={normalizedSize(20)} color={colors.text.white} />
            </LinearGradient>
          </Animated.View>
        </Pressable>
      </View>
    </Animated.View>
  );
}
