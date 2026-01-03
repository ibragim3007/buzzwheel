import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import PaywallPeopleIcon from '@/assets/images/paywall_icons/paywall_people.png';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { useNavigation } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from './ui/CloseIcon';
import HeaderLogo from './ui/HeaderLogo';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { Image, ImageSource } from 'expo-image';
import { Switch } from 'react-native';
import { localeVars } from '@/src/locales/localeVars';
import Button from '@/src/shared/ui/buttons/Button';
import PaywallItems from './ui/PaywallItems';
import PaywallButton from './ui/PaywallButton';
import FooterActions from './ui/FooterActions';
import PlanSelectCard from './ui/PlanSelectCard';
import { PaywallPlanId, resolvePaywallPlans, getSavingsPercentByYearlyVsWeekly } from './helpers/paywallPlans';
import { HORIZONTAL_PADDINGS } from '@/src/shared/config/constants/constants';
import { useTheme } from '@/src/shared/hooks/useTheme';
import LogoText from './ui/LogoText';

export default function PaywallNew() {
  const { offering } = usePurchases();

  const { t } = useTranslation();
  const colors = useTheme();
  const [selectedPlanId, setSelectedPlanId] = useState<PaywallPlanId>('yearly');
  const [trialEnabled, setTrialEnabled] = useState(true);
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  const navigate = useNavigation();
  const goBack = () => {
    if (navigate.canGoBack()) {
      navigate.goBack();
    }
  };

  const { vibrateSelection } = useVibration();

  const plans = useMemo(() => resolvePaywallPlans(offering), [offering]);

  const yearlyPlan = plans.find(p => p.id === 'yearly') ?? null;
  const weeklyPlan = plans.find(p => p.id === 'weekly') ?? null;

  const savingsPercent = getSavingsPercentByYearlyVsWeekly(yearlyPlan?.pkg ?? null, weeklyPlan?.pkg ?? null);

  const selectedPlan = plans.find(p => p.id === selectedPlanId) ?? plans[0] ?? null;
  const selectedProduct = selectedPlan?.pkg ?? null;

  useEffect(() => {
    if (!selectedPlan && plans[0]) {
      setSelectedPlanId(plans[0].id);
    }
  }, [plans, selectedPlan]);

  const onSelectPlan = (planId: PaywallPlanId) => {
    void vibrateSelection();
    setSelectedPlanId(planId);
  };

  if (!selectedProduct) {
    return (
      <Grid justfity="center" height="100%" align="center">
        <Typography variant="title-3" weight="bold">
          {t('paywall.error-to-load-product')}
        </Typography>
        <Button title={'go back'} onPress={goBack} />
      </Grid>
    );
  }

  const yearlyPriceString = yearlyPlan?.pkg.product.priceString ?? 'N/A';
  const weeklyPriceString = weeklyPlan?.pkg.product.priceString ?? 'N/A';

  const yearlyTrialDays = yearlyPlan?.trialDays ?? 0;
  const selectedHasTrial = selectedPlan?.id === 'yearly' && yearlyTrialDays > 0;

  const yearlySubtitle =
    trialEnabled && yearlyTrialDays > 0
      ? localeVars('{{days}}-Day Trial, then {{price}} per year', {
          days: yearlyTrialDays,
          price: yearlyPriceString,
        })
      : localeVars('{{price}} per year', { price: yearlyPriceString });

  const weeklySubtitle = localeVars('{{price}} per week', { price: weeklyPriceString });

  const ctaTitle = trialEnabled && selectedHasTrial ? t('paywall.button-text-play-for-free') : t('common.continue');

  return (
    <Grid space="lg" height="100%" paddingHorizontal={HORIZONTAL_PADDINGS} justfity="space-between">
      <CloseIcon goBack={goBack} showCloseIcon={showCloseIcon} setShowCloseIcon={setShowCloseIcon} />
      <HeaderLogo />

      <Grid flex={1} justfity="flex-end" space="lg">
        <LogoText />

        <Grid space="md">
          {!!yearlyPlan && (
            <PlanSelectCard
              title={t('paywall.yearly_plan')}
              subtitle={yearlySubtitle}
              badgeText={savingsPercent ? localeVars('SAVE {{p}}%', { p: savingsPercent }) : undefined}
              rightLabel={trialEnabled && selectedPlanId === 'yearly' ? 'FREE' : undefined}
              selected={selectedPlanId === 'yearly'}
              onPress={() => onSelectPlan('yearly')}
            />
          )}

          {!!weeklyPlan && (
            <PlanSelectCard
              title={t('paywall.weekly_plan')}
              subtitle={weeklySubtitle}
              selected={selectedPlanId === 'weekly'}
              onPress={() => onSelectPlan('weekly')}
            />
          )}

          {/* <Grid
            row
            align="center"
            justfity="space-between"
            paddingVertical={14}
            paddingHorizontal={16}
            style={{
              borderWidth: 1,
              borderColor: colors.background.quaternary,
              backgroundColor: colors.background.secondary,
              borderRadius: colors.styles.borderRadiusSmall,
            }}
          >
            <Typography variant="callout" weight="medium">
              {t('paywall.free_trial_enabled')}
            </Typography>
            <Switch
              value={trialEnabled}
              onValueChange={setTrialEnabled}
              trackColor={{ false: colors.background.quaternary, true: colors.accent.primary }}
              thumbColor={colors.text.white}
              ios_backgroundColor={colors.background.quaternary}
            />
          </Grid> */}
        </Grid>
      </Grid>

      <Grid space="md" align="center" paddingBottom={10}>
        <PaywallButton title={ctaTitle} product={selectedProduct} />
        <FooterActions />
      </Grid>
    </Grid>
  );
}
