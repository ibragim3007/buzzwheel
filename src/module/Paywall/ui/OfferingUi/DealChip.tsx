import Grid from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';
import AntDesign from '@expo/vector-icons/AntDesign';

interface DealChipProps {
  label: string;
}

export default function DealChip({ label }: DealChipProps) {
  return (
    <Grid gap={7} row align="center">
      <Grid
        color={'#ffb917'}
        padding={3}
        style={{
          borderRadius: 5,
          borderColor: '#FFD80C',
          borderWidth: 1,
        }}
      >
        <AntDesign name="star" size={15} color="#fff" />
      </Grid>
      <Typography variant="footnote" weight="medium">
        {label}
      </Typography>
    </Grid>
  );
}
