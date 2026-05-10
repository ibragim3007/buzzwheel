import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import GiftIcon from '@/assets/images/paywall_icons/thanks_icon.png';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { useNavigation } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from './ui/CloseIcon';
import HeaderLogo from './ui/HeaderLogo';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { localeVars } from '@/src/locales/localeVars';
import Button from '@/src/shared/ui/buttons/Button';
import PaywallButton from './ui/PaywallButton';
import FooterActions from './ui/FooterActions';
import PlanSelectCard, { PlanBadge } from './ui/PlanSelectCard';
import { PaywallPlanId, resolvePaywallPlans, getSavingsPercentByYearlyVsWeekly } from './helpers/paywallPlans';
import { HORIZONTAL_PADDINGS } from '@/src/shared/config/constants/constants';
import LogoText from './ui/LogoText';

export default function PaywallNew() {
  const { offering } = usePurchases();

  const { t } = useTranslation();
  const [selectedPlanId, setSelectedPlanId] = useState<PaywallPlanId>('weekly');
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

  const anyPlanHasTrial = plans.some(p => p.trialDays > 0);

  useEffect(() => {
    if (!selectedPlan && plans[0]) {
      setSelectedPlanId(plans[0].id);
    }
  }, [plans, selectedPlan]);

  useEffect(() => {
    if (!anyPlanHasTrial && trialEnabled) {
      setTrialEnabled(false);
    }
  }, [anyPlanHasTrial, trialEnabled]);

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
  const weeklyTrialDays = weeklyPlan?.trialDays ?? 0;

  const selectedTrialDays = selectedPlan?.trialDays ?? 0;
  const selectedHasTrial = trialEnabled && selectedTrialDays > 0;

  const yearlySubtitle =
    trialEnabled && yearlyTrialDays > 0
      ? localeVars('{{days}}-Day Trial, then {{price}} per year', {
          days: yearlyTrialDays,
          price: yearlyPriceString,
        })
      : localeVars('{{price}} per year', { price: yearlyPriceString });

  const weeklySubtitle =
    trialEnabled && weeklyTrialDays > 0
      ? localeVars('{{days}}-Day Trial, then {{price}} per week', {
          days: weeklyTrialDays,
          price: weeklyPriceString,
        })
      : localeVars('{{price}} per week', { price: weeklyPriceString });

  const ctaTitle = selectedHasTrial ? t('paywall.button-text-play-for-free') : t('common.continue');

  const yearlyBadges: PlanBadge[] = [];
  if (selectedPlanId === 'yearly' && savingsPercent) {
    yearlyBadges.push({ text: localeVars('SAVE {{p}}%', { p: savingsPercent }), variant: 'outline' });
  }
  if (selectedPlanId === 'yearly' && trialEnabled && yearlyTrialDays > 0) {
    yearlyBadges.push({ text: 'FREE', variant: 'success' });
  }

  const weeklyBadges: PlanBadge[] = [{ text: 'POPULAR', variant: 'gradient' }];
  if (trialEnabled && weeklyTrialDays > 0) {
    weeklyBadges.push({ text: 'FREE', variant: 'success' });
  }

  return (
    <Grid space="lg" height="100%" paddingHorizontal={HORIZONTAL_PADDINGS} justfity="space-between">
      <CloseIcon goBack={goBack} showCloseIcon={showCloseIcon} setShowCloseIcon={setShowCloseIcon} />
      <HeaderLogo />

      <Grid flex={1} justfity="space-between" space="lg" paddingTop={40}>
        <LogoText />

        <Grid space="md">
          {!!weeklyPlan && (
            <PlanSelectCard
              title={t('paywall.weekly_plan')}
              subtitle={weeklySubtitle}
              leftIcon={GiftIcon}
              badges={weeklyBadges}
              topRibbon="MOST POPULAR"
              highlighted
              selected={selectedPlanId === 'weekly'}
              onPress={() => onSelectPlan('weekly')}
            />
          )}

          {!!yearlyPlan && (
            <PlanSelectCard
              title={t('paywall.yearly_plan')}
              subtitle={yearlySubtitle}
              badges={yearlyBadges}
              selected={selectedPlanId === 'yearly'}
              onPress={() => onSelectPlan('yearly')}
            />
          )}
        </Grid>
      </Grid>

      <Grid space="md" align="center" paddingBottom={10}>
        <PaywallButton title={ctaTitle} product={selectedProduct} />
        <FooterActions />
      </Grid>
    </Grid>
  );
}
