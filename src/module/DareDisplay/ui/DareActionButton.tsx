import { useTheme } from '@/src/shared/hooks/useTheme';
import { fontWeight } from '@/src/shared/styles/typography/typography';
import { normalizedSize } from '@/src/shared/utils/size';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface DareActionButtonProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onPress: () => void;
}

export const DARE_BUTTON_HEIGHT = normalizedSize(64);

/** Кнопка действия под карточкой задания. Обе варианта одной высоты, чтобы ряд не прыгал. */
export default function DareActionButton({
  title,
  subtitle,
  icon,
  variant = 'primary',
  onPress,
}: DareActionButtonProps) {
  const colors = useTheme();
  const scale = useSharedValue(1);
  const isPrimary = variant === 'primary';

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const gradient: [string, string] = isPrimary
    ? [colors.accent.primary, colors.accent.secondary]
    : ['#2B303C', '#232731'];

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={() => (scale.value = withSpring(0.95, { damping: 15, stiffness: 300 }))}
        onPressOut={() => (scale.value = withSpring(1, { damping: 12, stiffness: 250 }))}
        accessibilityRole="button"
        accessibilityLabel={subtitle ? `${title}, ${subtitle}` : title}
      >
        <LinearGradient
          colors={gradient}
          start={isPrimary ? [-0.5, -0.5] : [0, 0]}
          end={isPrimary ? [3.5, 1] : [0, 1]}
          style={[styles.button, isPrimary ? styles.primaryBorder : styles.secondaryBorder]}
        >
          <View style={styles.row}>
            {icon}
            <Text style={[styles.title, !isPrimary && styles.secondaryTitle]} numberOfLines={1}>
              {title}
            </Text>
          </View>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: DARE_BUTTON_HEIGHT,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalizedSize(12),
  },
  primaryBorder: {
    borderColor: 'rgba(255,255,255,0.37)',
  },
  secondaryBorder: {
    borderColor: 'rgba(255,255,255,0.08)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalizedSize(8),
  },
  title: {
    color: '#FFFFFF',
    fontFamily: fontWeight.bold,
    fontSize: normalizedSize(21),
  },
  secondaryTitle: {
    fontSize: normalizedSize(17),
  },
  subtitle: {
    color: 'rgba(255,255,255,0.55)',
    fontFamily: fontWeight.medium,
    fontSize: normalizedSize(12),
    marginTop: 2,
  },
});
