import Grid from '@/src/shared/ui/grid/Grid';
import { PressablePaper } from '@/src/shared/ui/layout/Paper';
import Typography from '@/src/shared/ui/typography/Typography';
import { Image } from 'expo-image';

interface GameModeItemProps {
  title: string;
  description: string;
  onPress?: () => void;
  image: string;
}

export default function GameModeItem({ title, description, image, onPress }: GameModeItemProps) {
  return (
    <PressablePaper onPress={onPress} align="center" justfity="space-around" row>
      <Image source={image} style={{ width: 120, height: 120 }} contentFit="contain" />
      <Grid>
        <Typography weight="bold" variant="title-3">
          {title}
        </Typography>
        <Typography variant="caption-1" color="secondary">
          {description}
        </Typography>
      </Grid>
    </PressablePaper>
  );
}
