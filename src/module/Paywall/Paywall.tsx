import { useTheme } from '@/src/shared/hooks/useTheme';
import Button from '@/src/shared/ui/buttons/Button';
import Grid, { GridPressable } from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import PaywallItems from './ui/PaywallItems';
import HeaderLogo from './ui/HeaderLogo';
import PaywallButton from './ui/PaywallButton';

export default function Paywall() {
  const colors = useTheme();
  return (
    <Grid justfity="space-between" height="100%">
      <Grid space="md">
        <HeaderLogo />
        <Grid>
          <Typography weight="bold" textAlign="center" variant="title-4">
            Уже 11032 играют в статусе VIP
          </Typography>
          <Typography weight="bold" textAlign="center" variant="title-4">
            Вы с нами?
          </Typography>
        </Grid>
      </Grid>
      <PaywallItems />
      <Grid space="lg" align="center" width="100%">
        <Typography weight="light">3-Day Trial, then $6.99 per week</Typography>
        <PaywallButton />
        <Grid space="sm" align="center">
          <Grid align="center" row space="lg">
            <GridPressable>
              <Typography color="disabled" variant="caption-1">
                Terms of Use
              </Typography>
            </GridPressable>
            <GridPressable>
              <Typography color="disabled" variant="footnote">
                Restore
              </Typography>
            </GridPressable>
            <GridPressable>
              <Typography color="disabled" variant="caption-1">
                Privacy & Policy
              </Typography>
            </GridPressable>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
