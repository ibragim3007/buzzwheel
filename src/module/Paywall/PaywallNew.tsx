import { usePackage } from '@/src/entities/Package/usePackage';
import { usePurchases } from '@/src/entities/usePurchases/usePurchases';
import { HORIZONTAL_PADDINGS } from '@/src/shared/config/constants/constants';
import { useVibration } from '@/src/shared/hooks/useVibration';
import Button from '@/src/shared/ui/buttons/Button';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ScrollView } from 'react-native';
import { getSavingsPercentByYearlyVsWeekly, PaywallPlanId, resolvePaywallPlans } from './helpers/paywallPlans';
import BenefitsList, { Benefit } from './ui/BenefitsList';
import CloseIcon from './ui/CloseIcon';
import FooterActions from './ui/FooterActions';
import FeaturedPack from './ui/Hero/FeaturedPack';
import PacksMarquee from './ui/Hero/PacksMarquee';
import PaywallButton from './ui/PaywallButton';
import PlanOption from './ui/PlanOption';
import RatingRow from './ui/RatingRow';
import TeaserChips from './ui/TeaserChips';

export default function PaywallNew() {
  const { t } = useTranslation();
  const { offering, isOfferingLoading, loadOffering } = usePurchases();
  const { data: packages } = usePackage();
  const { packId } = useLocalSearchParams<{ packId?: string }>();
  const [selectedPlanId, setSelectedPlanId] = useState<PaywallPlanId>('weekly');
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  const navigate = useNavigation();
  const goBack = () => {
    if (navigate.canGoBack()) {
      navigate.goBack();
    }
  };

  const { vibrateSelection } = useVibration();

  useEffect(() => {
    if (!offering) void loadOffering();
  }, []);

  const lockedPackages = useMemo(() => packages.filter(pack => !pack.isFree), [packages]);
  const featuredPack = useMemo(
    () => (packId ? (lockedPackages.find(pack => pack.id === Number(packId)) ?? null) : null),
    [packId, lockedPackages],
  );
  // Округляем вниз до десятков, чтобы «600+» было честным
  const lockedDaresCount = Math.floor(lockedPackages.reduce((sum, pack) => sum + pack.dares.length, 0) / 10) * 10;

  const plans = useMemo(() => resolvePaywallPlans(offering), [offering]);
  const yearlyPlan = plans.find(p => p.id === 'yearly') ?? null;
  const weeklyPlan = plans.find(p => p.id === 'weekly') ?? null;
  const selectedPlan = plans.find(p => p.id === selectedPlanId) ?? plans[0] ?? null;
  const savingsPercent = getSavingsPercentByYearlyVsWeekly(yearlyPlan?.pkg ?? null, weeklyPlan?.pkg ?? null);

  useEffect(() => {
    if (!plans.some(p => p.id === selectedPlanId) && plans[0]) {
      setSelectedPlanId(plans[0].id);
    }
  }, [plans, selectedPlanId]);

  const onSelectPlan = (planId: PaywallPlanId) => {
    void vibrateSelection();
    setSelectedPlanId(planId);
  };

  if (!selectedPlan) {
    if (isOfferingLoading) {
      return (
        <Grid justfity="center" height="100%" align="center">
          <ActivityIndicator color="#fff" />
        </Grid>
      );
    }

    return (
      <Grid justfity="center" height="100%" align="center" space="lg">
        <Typography variant="title-3" weight="bold" textAlign="center">
          {t('paywall.error-to-load-product')}
        </Typography>
        <Button title={t('paywall.retry')} onPress={() => void loadOffering()} />
        <Button title={t('paywall.go-back')} onPress={goBack} gradientColors={['#2a2d36', '#2a2d36']} />
      </Grid>
    );
  }

  const yearlyPerWeek = yearlyPlan?.pkg.product.pricePerWeekString;

  const weeklyCaption =
    weeklyPlan && weeklyPlan.trialDays > 0
      ? t('paywall.days-free', { days: weeklyPlan.trialDays })
      : t('paywall.most-popular');

  const yearlyCaption = [
    yearlyPlan && yearlyPlan.trialDays > 0 ? t('paywall.days-free', { days: yearlyPlan.trialDays }) : null,
    yearlyPerWeek ? t('paywall.only-per-week', { price: yearlyPerWeek }) : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const hasTrial = selectedPlan.trialDays > 0;
  const ctaTitle = hasTrial ? t('paywall.cta-trial', { days: selectedPlan.trialDays }) : t('common.continue');
  const disclosure = hasTrial ? t('paywall.disclosure-trial') : t('paywall.disclosure');

  const benefits: Benefit[] = [
    { icon: 'wine', title: t('paywall.benefit-drink') },
    { icon: 'people', title: t('paywall.benefit-players') },
    { icon: 'color-palette', title: t('paywall.benefit-themes') },
  ];

  const sidePadding = normalizedSize(HORIZONTAL_PADDINGS);

  return (
    <Grid flex={1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: -sidePadding }}
        contentContainerStyle={{ paddingBottom: normalizedSize(16), flexGrow: 1, justifyContent: 'center' }}
      >
        <Grid paddingTop={36} gap={22}>
          {featuredPack ? <FeaturedPack pack={featuredPack} /> : <PacksMarquee packages={lockedPackages} />}

          <Grid gap={8} paddingHorizontal={sidePadding}>
            <Typography
              weight="bold"
              textAlign="center"
              style={{ fontSize: normalizedSize(28), lineHeight: normalizedSize(34) }}
            >
              {featuredPack ? featuredPack.name : t('paywall.headline')}
            </Typography>
            <Typography variant="callout" color="secondary" textAlign="center">
              {featuredPack
                ? t('paywall.featured-subheadline', { packs: lockedPackages.length - 1, dares: lockedDaresCount })
                : t('paywall.subheadline', { packs: lockedPackages.length, dares: lockedDaresCount })}
            </Typography>
            {featuredPack ? (
              <Grid marginTop={6}>
                <TeaserChips pack={featuredPack} />
              </Grid>
            ) : (
              <RatingRow />
            )}
          </Grid>

          <Grid paddingHorizontal={sidePadding}>
            <BenefitsList items={benefits} />
          </Grid>

          <Grid gap={10} paddingHorizontal={sidePadding}>
            {!!weeklyPlan && (
              <PlanOption
                title={t('paywall.weekly_plan')}
                caption={weeklyCaption}
                price={weeklyPlan.pkg.product.priceString}
                period={t('paywall.period-week')}
                selected={selectedPlanId === 'weekly'}
                onPress={() => onSelectPlan('weekly')}
              />
            )}
            {!!yearlyPlan && (
              <PlanOption
                title={t('paywall.yearly_plan')}
                caption={yearlyCaption}
                badge={savingsPercent ? t('paywall.badge-save', { p: savingsPercent }) : undefined}
                price={yearlyPlan.pkg.product.priceString}
                period={t('paywall.period-year')}
                selected={selectedPlanId === 'yearly'}
                onPress={() => onSelectPlan('yearly')}
              />
            )}
          </Grid>
        </Grid>
      </ScrollView>

      <Grid space="sm" align="center" paddingTop={8} paddingBottom={6}>
        <PaywallButton title={ctaTitle} product={selectedPlan.pkg} />
        <Typography variant="caption-1" color="secondary" textAlign="center">
          {disclosure}
        </Typography>
        <FooterActions />
      </Grid>

      <Grid style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}>
        <CloseIcon goBack={goBack} showCloseIcon={showCloseIcon} setShowCloseIcon={setShowCloseIcon} />
      </Grid>
    </Grid>
  );
}
