import { useLang } from '@/src/shared/hooks/lang/useLangStore';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { analytics, Events } from '@/src/shared/service/analytics.service';
import AnimTouchWrapper from '@/src/shared/ui/animations/AnimTouchWrapper';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { navigate } from 'expo-router/build/global-state/routing';
import { Pressable } from 'react-native';

export default function ProButton() {
  const colors = useTheme();
  const { lang } = useLang();

  const onPressPro = () => {
    analytics.trackEvent(Events.pressProButton, {
      local: lang,
    });
    navigate('/screens/paywall');
  };

  return (
    <AnimTouchWrapper>
      <Pressable onPress={onPressPro} accessibilityRole="button" accessibilityLabel="PRO">
        <LinearGradient
          colors={[colors.accent.primary, colors.accent.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: normalizedSize(6),
            paddingHorizontal: normalizedSize(14),
            paddingVertical: normalizedSize(7),
            borderRadius: normalizedSize(20),
          }}
        >
          <Ionicons name="diamond" size={normalizedSize(14)} color={colors.text.white} />
          <Typography weight="bold" variant="subhead" style={{ color: colors.text.white, letterSpacing: 0.5 }}>
            PRO
          </Typography>
        </LinearGradient>
      </Pressable>
    </AnimTouchWrapper>
  );
}
