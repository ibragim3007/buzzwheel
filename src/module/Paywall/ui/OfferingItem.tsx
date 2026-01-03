import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import { Pressable } from 'react-native';
import { PurchasesPackage } from 'react-native-purchases';
import CheckIcon from './OfferingUi/CheckIcon';
import DealChip from './OfferingUi/DealChip';

interface OfferingItemProps {
  offering: PurchasesPackage | null;
  title: string;
  description?: string;
  currentPicked: PurchasesPackage | null;
  onPress: (offering: PurchasesPackage | null) => void;
  rightChipText?: string;
  bestdeal?: boolean;
  subtext?: string;
  bestdealText?: string;
}

export default function OfferingItem({
  offering,
  title,
  description,
  currentPicked,
  rightChipText,
  bestdeal,
  bestdealText,
  subtext,
  onPress,
}: OfferingItemProps) {
  const isPicked = offering?.identifier === currentPicked?.identifier;

  const colors = useTheme();
  return (
    <Pressable onPress={() => onPress(offering)}>
      <Grid
        paddingVertical={18}
        paddingHorizontal={23}
        color={isPicked ? colors.background.primary : 'transparent'}
        style={{
          borderWidth: 1,
          backgroundColor: isPicked ? colors.accent.primary : '#211a2ab3',
          borderColor: isPicked ? colors.accent.primary : '#ffffff2c',
          borderRadius: 15,
        }}
      >
        {isPicked && <CheckIcon />}
        <Grid align="center" row justfity="space-between">
          <Grid row align="center" space="md">
            {bestdeal ? (
              <Grid space="sm">
                <DealChip label={bestdealText || ''} />
                <Grid gap={2}>
                  <Typography variant="headline" weight="bold">
                    {title}
                  </Typography>
                  <Typography variant="footnote">{description}</Typography>
                </Grid>
              </Grid>
            ) : (
              <Grid gap={2}>
                <Grid>
                  <Typography variant="footnote">{title}</Typography>
                  <Typography variant="headline" weight="bold">
                    {description}
                  </Typography>
                </Grid>
                <Typography variant="caption-1">{subtext}</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Pressable>
  );
}
