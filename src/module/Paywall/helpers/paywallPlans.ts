import { PACKAGE_TYPE, PurchasesOffering, PurchasesPackage } from 'react-native-purchases';

export type PaywallPlanId = 'yearly' | 'weekly';

export type PaywallPlanSpec = {
  id: PaywallPlanId;
  packageType: PACKAGE_TYPE;
};

export type ResolvedPaywallPlan = {
  id: PaywallPlanId;
  pkg: PurchasesPackage;
  trialDays: number;
};

export const DEFAULT_PAYWALL_PLANS: PaywallPlanSpec[] = [
  { id: 'yearly', packageType: PACKAGE_TYPE.ANNUAL },
  { id: 'weekly', packageType: PACKAGE_TYPE.WEEKLY },
];

const PERIOD_UNIT_TO_DAYS: Record<string, number> = {
  DAY: 1,
  WEEK: 7,
  MONTH: 30,
  YEAR: 365,
};

export function getTrialDaysFromPackage(pkg: PurchasesPackage | null | undefined): number {
  if (!pkg) return 0;

  const intro = pkg.product.introPrice;
  if (intro && intro.price === 0 && intro.periodNumberOfUnits > 0) {
    const unitDays = PERIOD_UNIT_TO_DAYS[intro.periodUnit?.toUpperCase?.() ?? ''] ?? 0;
    const days = unitDays * intro.periodNumberOfUnits * Math.max(intro.cycles || 1, 1);
    if (days > 0) return days;
  }

  const freePhase = pkg.product.defaultOption?.freePhase;
  if (freePhase) {
    const period = freePhase.billingPeriod;
    const unitDays = PERIOD_UNIT_TO_DAYS[period?.unit ?? ''] ?? 0;
    const cycles = freePhase.billingCycleCount ?? 1;
    const days = unitDays * (period?.value ?? 0) * Math.max(cycles, 1);
    if (days > 0) return days;
  }

  return 0;
}

export function resolvePaywallPlans(
  offering: PurchasesOffering | null,
  specs: PaywallPlanSpec[] = DEFAULT_PAYWALL_PLANS,
): ResolvedPaywallPlan[] {
  const packages = offering?.availablePackages ?? [];
  const resolved: ResolvedPaywallPlan[] = [];

  for (const spec of specs) {
    const pkg = packages.find(p => p.packageType === spec.packageType) ?? null;
    if (!pkg) continue;
    resolved.push({ id: spec.id, pkg, trialDays: getTrialDaysFromPackage(pkg) });
  }

  if (resolved.length > 0) {
    return resolved;
  }

  const fallback = packages[0];
  return fallback ? [{ id: 'yearly', pkg: fallback, trialDays: getTrialDaysFromPackage(fallback) }] : [];
}

export function getSavingsPercentByYearlyVsWeekly(
  yearly: PurchasesPackage | null,
  weekly: PurchasesPackage | null,
): number | null {
  const yearlyPricePerYear = yearly?.product.pricePerYear;
  const weeklyPricePerYear = weekly?.product.pricePerYear;

  if (!yearlyPricePerYear || !weeklyPricePerYear) return null;
  if (weeklyPricePerYear <= 0) return null;

  const percent = 100 - Math.round((yearlyPricePerYear * 100) / weeklyPricePerYear);
  return Number.isFinite(percent) && percent > 0 ? percent : null;
}
