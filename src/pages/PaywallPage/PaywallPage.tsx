import { Paywall } from '@/src/module/Paywall';
import PageWrapper from '@/src/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/src/shared/ui/layout/SafeWrapper';

export default function PaywallPage() {
  return (
    <PageWrapper flex={1}>
      <SafeWrapper>
        <Paywall />
      </SafeWrapper>
    </PageWrapper>
  );
}
