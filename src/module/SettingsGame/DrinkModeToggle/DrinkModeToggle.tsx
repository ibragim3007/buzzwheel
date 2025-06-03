import { useSettings } from '@/src/entities/Settings/settings.repository';
import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { analytics, Events } from '@/src/shared/service/analytics.service';
import Grid, { GridPressable } from '@/src/shared/ui/grid/Grid';
import Paper from '@/src/shared/ui/layout/Paper';
import SwitchLabel from '@/src/shared/ui/layout/SwitchLabel';
import Typography from '@/src/shared/ui/typography/Typography';
import { navigate } from 'expo-router/build/global-state/routing';

export default function DrinkModeToggle() {
  const colors = useTheme();
  const { isDrinkingMode, setDrinkingMode } = useSettings();
  const { isActiveSubscription } = usePurchases();
  const onChange = (value: boolean) => {
    if (!isActiveSubscription) {
      analytics.trackEvent(Events.pressDisabledDrinkingMode, {
        value: value,
      });
      navigate('/screens/paywall');
      return;
    }

    analytics.trackEvent(Events.pressEnableDrinkingMode, {
      value: value,
    });

    setDrinkingMode(value);
  };

  return (
    <GridPressable>
      <Paper paddingHorizontal={15} style={{ backgroundColor: colors.background.primary }}>
        <SwitchLabel
          isBlocked={!isActiveSubscription}
          onValueChange={value => onChange(value)}
          label={
            <Grid row space="md" align="center">
              <Typography weight="medium" variant="callout">
                Drinking mode
              </Typography>
              <Grid
                paddingHorizontal={15}
                paddingVertical={2}
                color={colors.accent.primary}
                style={{ borderRadius: 100 }}
              >
                <Typography weight="bold">18+</Typography>
              </Grid>
            </Grid>
          }
          value={isDrinkingMode}
        />
      </Paper>
      {!isActiveSubscription && (
        <Grid
          color="#141413e2"
          justfity="center"
          align="center"
          space="md"
          row
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: colors.styles.borderRadiusDefault,
          }}
        >
          <Typography textAlign="center" weight="bold">
            Subscription required
          </Typography>
          <Grid
            align="center"
            justfity="center"
            paddingHorizontal={15}
            paddingVertical={2}
            color={colors.accent.primary}
            style={{ borderRadius: 100 }}
          >
            <Typography weight="bold">18+</Typography>
          </Grid>
        </Grid>
      )}
    </GridPressable>
  );
}
