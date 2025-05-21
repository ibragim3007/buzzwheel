import { getTransformedArrayOfString, updatedArray } from '@/src/shared/helpers/textConverters/coreLogic';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { Player } from '@/src/shared/types/globalTypes';
import Typography from '@/src/shared/ui/typography/Typography';

interface ActionPreprocProps {
  action: string;
  currentTurn: Player;
  players: Player[];
}

export default function ActionPreproc({ action, currentTurn, players }: ActionPreprocProps) {
  const colors = useTheme();
  const updatedArr = updatedArray(getTransformedArrayOfString(action), currentTurn, players, colors);

  return updatedArr.map((item, index) => (
    <Typography
      style={{ lineHeight: 33, letterSpacing: 0.3, color: item.color || '#000' }}
      textAlign="center"
      weight={item.weight}
      variant="title-3"
      key={index}
    >
      {item.value}
    </Typography>
  ));
}
