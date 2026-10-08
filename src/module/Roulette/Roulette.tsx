import { RouletteOptions, SegmentType } from '@/src/entities/Roulette/types';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { Player } from '@/src/shared/types/globalTypes';
import Button from '@/src/shared/ui/buttons/Button';
import Typography from '@/src/shared/ui/typography/Typography';
import { isTablet, normalizedSize } from '@/src/shared/utils/size';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, withTiming, ZoomIn } from 'react-native-reanimated';
import { useRoulette } from './hooks/useRoulette';
import { getWheelMetrics } from './helpers/wheelGeometry';
import { WheelGloss, WheelRim, WinnerHighlight } from './wheel/WheelDecor';
import WheelFace from './wheel/WheelFace';
import WheelHub from './wheel/WheelHub';
import WheelPointer, { POINTER_HEIGHT_RATIO } from './wheel/WheelPointer';
import WinBurst from './wheel/WinBurst';

const DEFAULT_RIM_COLOR = '#FFB000';
const SWIPE_VELOCITY = 450;

interface RouletteProps {
  segments: SegmentType[];
  options: RouletteOptions;
  currentTurn: Player | null;
  onCallback: (winner: SegmentType) => void;
  onChangeSpinStatus?: (isSpinning: boolean) => void;
}

const Roulette = ({ segments, options, currentTurn, onCallback, onChangeSpinStatus }: RouletteProps) => {
  const { t } = useTranslation();
  const colors = useTheme();
  const { width } = useWindowDimensions();
  const { isSpinning, winner, animatedStyle, cursorAnimatedStyle, spinWheel } = useRoulette(segments, onCallback);

  const size = Math.min(width - normalizedSize(32), isTablet() ? 560 : 440);
  const metrics = useMemo(() => getWheelMetrics(size), [size]);
  const rimColor = options.BORDER_COLOR || DEFAULT_RIM_COLOR;
  const pointerTop = -metrics.pointerWidth * 0.45;
  const idle = !isSpinning && winner === null;
  const winnerSegment = winner !== null ? segments[winner] : null;

  useEffect(() => {
    if (onChangeSpinStatus) onChangeSpinStatus(isSpinning);
  }, [isSpinning]);

  const gesture = useMemo(() => {
    const tap = Gesture.Tap()
      .runOnJS(true)
      .onEnd((_e, success) => {
        if (success) spinWheel();
      });
    const swipe = Gesture.Pan()
      .runOnJS(true)
      .onEnd(e => {
        if (Math.hypot(e.velocityX, e.velocityY) > SWIPE_VELOCITY) spinWheel();
      });
    return Gesture.Race(swipe, tap);
  }, [spinWheel]);

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: withTiming(idle ? 1 : 0, { duration: 250 }),
    transform: [{ translateY: withTiming(idle ? 0 : 16, { duration: 250 }) }],
  }));

  const renderHeadline = () => {
    if (winnerSegment) {
      if (winnerSegment.type === 'all') {
        return (
          <Animated.View key="all" entering={ZoomIn.springify().damping(13)} style={styles.headline}>
            <Typography variant="title-1" weight="bold" textAlign="center">
              {t('gamePage.roulette.task-for-all')}
            </Typography>
          </Animated.View>
        );
      }

      const name = currentTurn?.name ?? winnerSegment.label;
      const nameColor = currentTurn?.color || winnerSegment.textColor || colors.accent.primary;
      return (
        <Animated.View key="winner" entering={ZoomIn.springify().damping(13)} style={styles.headline}>
          {currentTurn && (
            <Typography variant="body" weight="medium" color="secondary" textAlign="center">
              {t('gamePage.roulette.task-for')}
            </Typography>
          )}
          <Typography
            variant="title-1"
            weight="bold"
            textAlign="center"
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.winnerName, { color: nameColor }]}
          >
            {name}
          </Typography>
        </Animated.View>
      );
    }

    if (idle) {
      return (
        <Animated.View key="hint" entering={FadeIn.delay(250)} exiting={FadeOut.duration(150)} style={styles.headline}>
          <Typography variant="body" weight="medium" color="secondary" textAlign="center">
            {t('gamePage.roulette.hint')}
          </Typography>
        </Animated.View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headlineArea, { width: size }]}>{renderHeadline()}</View>

      <GestureDetector gesture={gesture}>
        <View
          style={{ width: size, height: size, marginTop: -pointerTop }}
          accessible
          accessibilityRole="button"
          accessibilityLabel={t('gamePage.roulette.spin-button')}
          accessibilityState={{ disabled: !idle }}
        >
          <WheelRim metrics={metrics} rimColor={rimColor} />

          <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
            <WheelFace segments={segments} metrics={metrics} />
            {winner !== null && (
              <Animated.View entering={FadeIn.duration(450)} style={StyleSheet.absoluteFill}>
                <WinnerHighlight
                  metrics={metrics}
                  index={winner}
                  count={segments.length}
                  color={winnerSegment?.textColor || rimColor}
                />
              </Animated.View>
            )}
          </Animated.View>

          <WheelGloss metrics={metrics} />
          <WheelHub metrics={metrics} rimColor={rimColor} idle={idle} />

          <WheelPointer
            width={metrics.pointerWidth}
            style={[{ left: metrics.center - metrics.pointerWidth / 2, top: pointerTop }, cursorAnimatedStyle]}
          />

          {winner !== null && (
            <WinBurst
              x={metrics.center}
              y={pointerTop + metrics.pointerWidth * POINTER_HEIGHT_RATIO}
              spread={size * 0.32}
            />
          )}
        </View>
      </GestureDetector>

      <Animated.View style={[styles.buttonArea, { width: size }, buttonStyle]} pointerEvents={idle ? 'auto' : 'none'}>
        <Button title={t('gamePage.roulette.spin-button')} onPress={spinWheel} disabled={!idle} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headlineArea: {
    height: normalizedSize(86),
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: normalizedSize(14),
  },
  headline: {
    alignItems: 'center',
  },
  winnerName: {
    fontSize: normalizedSize(34),
    lineHeight: normalizedSize(42),
  },
  buttonArea: {
    marginTop: normalizedSize(36),
  },
});

export default Roulette;
