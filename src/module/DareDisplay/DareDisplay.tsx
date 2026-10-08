import { ModeType, useRouletteGame } from '@/src/entities/RouletteGame/roulette-game.repository';
import { HORIZONTAL_PADDINGS } from '@/src/shared/config/constants/constants';
import { getActualImageLink } from '@/src/shared/helpers/getActualImageLink';
import { getTransformedArrayOfString, updatedArray } from '@/src/shared/helpers/textConverters/coreLogic';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { analytics, Events } from '@/src/shared/service/analytics.service';
import { fontWeight } from '@/src/shared/styles/typography/typography';
import { Dare, Player } from '@/src/shared/types/globalTypes';
import Typography from '@/src/shared/ui/typography/Typography';
import { shadeColor, withAlpha } from '@/src/shared/utils/color';
import { getRandomObjectArray } from '@/src/shared/utils/getRandomObjectArray';
import { normalizedSize } from '@/src/shared/utils/size';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown, FadeInUp, withSpring, withTiming } from 'react-native-reanimated';
import ButtomTimerInCard from './ButtomTimerInCard';
import { getPenaltyAmount } from './helper/getPenaltyAmount';
import DareActionButton from './ui/DareActionButton';

const CARD_TOP = '#272C38';
const CARD_BOTTOM = '#1B1E26';
const CARD_TEXT = '#FFFFFF';

interface DareDisplayProps {
  dare: Dare;
  currentTurn: Player;
  players: Player[];
  hideDare: (drunk: boolean) => void;
}

/** Карточка «раздаётся» снизу с лёгким поворотом и пружинит на место. */
const dealIn = () => {
  'worklet';
  return {
    initialValues: {
      opacity: 0,
      transform: [{ translateY: 120 }, { scale: 0.86 }, { rotate: '-5deg' }],
    },
    animations: {
      opacity: withTiming(1, { duration: 260 }),
      transform: [
        { translateY: withSpring(0, { damping: 15, stiffness: 140 }) },
        { scale: withSpring(1, { damping: 13, stiffness: 140 }) },
        { rotate: withSpring('0deg', { damping: 11, stiffness: 120 }) },
      ],
    },
  };
};

/** Экран задания «смахивается» влево при выходе. */
const swipeOut = () => {
  'worklet';
  return {
    initialValues: {
      opacity: 1,
      transform: [{ translateX: 0 }, { rotate: '0deg' }],
    },
    animations: {
      opacity: withTiming(0, { duration: 300 }),
      transform: [
        { translateX: withTiming(-420, { duration: 320 }) },
        { rotate: withTiming('-10deg', { duration: 320 }) },
      ],
    },
  };
};

export default function DareDisplay({ dare, currentTurn, players, hideDare }: DareDisplayProps) {
  const { t } = useTranslation();
  const { vibrate } = useVibration();
  const insets = useSafeAreaInsets();
  const colors = useTheme();
  const { currentPackage, mode } = useRouletteGame();

  const isForAll = currentTurn.id === 0;
  const highlight = currentTurn.color ? shadeColor(currentTurn.color, 0.25) : colors.accent.primary;

  // Случайные значения считаем один раз на задание, иначе они менялись бы при каждом ререндере
  const { penalty, amount } = useMemo(() => {
    const value = getPenaltyAmount(mode ?? 'no-penalty');
    const text = getPenaltyText(mode, value);
    return { amount: value, penalty: text ? `${value} ${text}` : `${value}` };
  }, [dare.id, mode]);

  const titleText = useMemo(
    () =>
      updatedArray(getTransformedArrayOfString(dare.title), currentTurn, players, colors)
        .map(item => item.value)
        .join(''),
    [dare.id],
  );

  const actionParts = useMemo(
    () => updatedArray(getTransformedArrayOfString(dare.action), currentTurn, players, colors, CARD_TEXT),
    [dare.id],
  );

  function getPenaltyText(currentMode: ModeType | null, value: number): string {
    switch (currentMode) {
      case 'drink':
        return value === 1 ? t('gamePage.sip') : t('gamePage.sips');

      case 'push-ups':
        return getRandomObjectArray([t('gamePage.push-ups'), t('gamePage.squats'), t('gamePage.jumps')]);

      default:
        return '';
    }
  }

  const onPressDrunk = () => {
    analytics.trackEvent(Events.pressAlcohol, {});
    vibrate();
    Alert.alert(t('gamePage.modal-penalty-title'), t('gamePage.penalty-modal-subtext'), [
      {
        text: penalty,
        onPress: () => hideDare(true),
      },
      {
        text: t('gamePage.modal-cancel-button'),
        style: 'cancel',
      },
    ]);
  };

  const onPressDry = () => {
    analytics.trackEvent(Events.pressDryRun, {});
    vibrate();
    hideDare(false);
  };

  const packageImage = currentPackage?.imageEncoded ? getActualImageLink(currentPackage.imageEncoded) : null;

  return (
    <Animated.View
      style={[styles.root, { paddingTop: insets.top + normalizedSize(64), paddingBottom: insets.bottom + 16 }]}
      exiting={swipeOut}
    >
      <View style={styles.center}>
        <Animated.View entering={FadeInDown.delay(80).springify().damping(16)} style={styles.headline}>
          {isForAll ? (
            <Typography variant="title-1" weight="bold" textAlign="center">
              {t('gamePage.roulette.task-for-all')}
            </Typography>
          ) : (
            <>
              <Typography variant="body" weight="medium" color="secondary" textAlign="center">
                {t('gamePage.roulette.task-for')}
              </Typography>
              <Typography
                variant="title-1"
                weight="bold"
                textAlign="center"
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[styles.name, { color: highlight }]}
              >
                {currentTurn.name}
              </Typography>
            </>
          )}
        </Animated.View>

        <Animated.View entering={dealIn} style={styles.cardShadow}>
          <LinearGradient colors={[CARD_TOP, CARD_BOTTOM]} style={styles.card}>
            <LinearGradient
              colors={[withAlpha(colors.accent.secondary, 0.22), withAlpha(colors.accent.secondary, 0)]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.7, y: 0.6 }}
              style={StyleSheet.absoluteFill}
              pointerEvents="none"
            />

            <View style={styles.cardHeader}>
              <View style={[styles.chip, { backgroundColor: withAlpha(colors.accent.secondary, 0.16) }]}>
                <Ionicons name="sparkles" size={normalizedSize(13)} color={colors.accent.secondary} />
                <Text style={[styles.chipText, { color: colors.accent.secondary }]} numberOfLines={1}>
                  {titleText}
                </Text>
              </View>
            </View>

            <Animated.View entering={FadeIn.delay(260).duration(400)}>
              <Text style={styles.action}>
                {actionParts.map((part, index) =>
                  part.weight === 'bold' ? (
                    <Text
                      key={index}
                      style={[styles.actionAccent, { color: part.color !== CARD_TEXT ? part.color : highlight }]}
                    >
                      {part.value}
                    </Text>
                  ) : (
                    <Text key={index}>{part.value}</Text>
                  ),
                )}
              </Text>
            </Animated.View>

            {dare.time ? (
              <View style={styles.timer}>
                <ButtomTimerInCard dare={dare} handleDone={onPressDry} />
              </View>
            ) : null}

            {packageImage && (
              <View style={styles.sticker} pointerEvents="none">
                <Image style={styles.stickerImage} source={packageImage} contentFit="contain" />
              </View>
            )}
          </LinearGradient>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInUp.delay(320).springify().damping(16)} style={styles.actions}>
        {amount ? (
          <View style={styles.penaltySlot}>
            <DareActionButton
              variant="secondary"
              title={t('gamePage.penalty-button')}
              subtitle={penalty}
              icon={<Entypo name="flag" size={normalizedSize(16)} color="#FF7A7F" />}
              onPress={onPressDrunk}
            />
          </View>
        ) : null}
        <View style={styles.doneSlot}>
          <DareActionButton
            title={t('gamePage.done-button')}
            icon={<Ionicons name="checkmark-circle" size={normalizedSize(22)} color="#FFFFFF" />}
            onPress={onPressDry}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    paddingHorizontal: HORIZONTAL_PADDINGS,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    gap: normalizedSize(20),
  },
  headline: {
    alignItems: 'center',
    paddingHorizontal: normalizedSize(16),
  },
  name: {
    fontSize: normalizedSize(34),
    lineHeight: normalizedSize(42),
  },
  cardShadow: {
    borderRadius: normalizedSize(28),
    shadowColor: '#000000',
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 14,
  },
  card: {
    borderRadius: normalizedSize(28),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: normalizedSize(24),
    paddingTop: normalizedSize(22),
    paddingBottom: normalizedSize(30),
    minHeight: normalizedSize(220),
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: normalizedSize(22),
    paddingRight: normalizedSize(64),
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalizedSize(6),
    paddingHorizontal: normalizedSize(12),
    paddingVertical: normalizedSize(7),
    borderRadius: normalizedSize(14),
    maxWidth: '100%',
  },
  chipText: {
    fontFamily: fontWeight.bold,
    fontSize: normalizedSize(13),
    letterSpacing: 1,
    textTransform: 'uppercase',
    flexShrink: 1,
  },
  action: {
    color: CARD_TEXT,
    fontFamily: fontWeight.medium,
    fontSize: normalizedSize(24),
    lineHeight: normalizedSize(34),
    letterSpacing: 0.1,
  },
  actionAccent: {
    fontFamily: fontWeight.bold,
  },
  timer: {
    marginTop: normalizedSize(26),
    alignItems: 'flex-start',
  },
  sticker: {
    position: 'absolute',
    top: normalizedSize(12),
    right: normalizedSize(12),
    transform: [{ rotate: '10deg' }],
  },
  stickerImage: {
    width: normalizedSize(62),
    height: normalizedSize(62),
  },
  actions: {
    flexDirection: 'row',
    gap: normalizedSize(12),
    paddingTop: normalizedSize(16),
  },
  penaltySlot: {
    flex: 1,
  },
  doneSlot: {
    flex: 1.35,
  },
});
