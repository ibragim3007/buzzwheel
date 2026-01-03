import { PACKAGE_TYPE, PurchasesOffering, PurchasesPackage } from 'react-native-purchases';

export type PaywallPlanId = 'yearly' | 'weekly';

export type PaywallPlanSpec = {
  id: PaywallPlanId;
  packageType: PACKAGE_TYPE;
  trialDays?: number;
};

export type ResolvedPaywallPlan = {
  id: PaywallPlanId;
  pkg: PurchasesPackage;
  trialDays?: number;
};

export const DEFAULT_PAYWALL_PLANS: PaywallPlanSpec[] = [
  { id: 'yearly', packageType: PACKAGE_TYPE.ANNUAL, trialDays: 3 },
  { id: 'weekly', packageType: PACKAGE_TYPE.WEEKLY },
];

export function resolvePaywallPlans(
  offering: PurchasesOffering | null,
  specs: PaywallPlanSpec[] = DEFAULT_PAYWALL_PLANS,
): ResolvedPaywallPlan[] {
  const packages = offering?.availablePackages ?? [];
  const resolved: ResolvedPaywallPlan[] = [];

  for (const spec of specs) {
    const pkg = packages.find(p => p.packageType === spec.packageType) ?? null;
    if (!pkg) continue;
    resolved.push({ id: spec.id, pkg, trialDays: spec.trialDays });
  }

  if (resolved.length > 0) {
    return resolved;
  }

  const fallback = packages[0];
  return fallback ? [{ id: 'yearly', pkg: fallback, trialDays: 3 }] : [];
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
