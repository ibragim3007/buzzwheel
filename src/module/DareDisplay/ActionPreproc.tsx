import { getTransformedArrayOfString, updatedArray } from '@/src/shared/helpers/textConverters/coreLogic';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { TypographyProps } from '@/src/shared/styles/typography/typography';
import { Player } from '@/src/shared/types/globalTypes';
import Typography from '@/src/shared/ui/typography/Typography';
import { normalizedSize } from '@/src/shared/utils/size';

interface ActionPreprocProps extends TypographyProps {
  action: string;
  currentTurn: Player;
  players: Player[];
  textColor?: string;
}

export default function ActionPreproc({ action, currentTurn, players, textColor, ...props }: ActionPreprocProps) {
  const colors = useTheme();
  const updatedArr = updatedArray(getTransformedArrayOfString(action), currentTurn, players, colors, textColor);

  return updatedArr.map((item, index) => (
    <Typography
      style={{ lineHeight: normalizedSize(29), letterSpacing: 0.3, color: textColor || item.color || '#000' }}
      textAlign="center"
      weight={item.weight}
      variant="title-3"
      key={index}
      {...props}
    >
      {item.value}
    </Typography>
  ));
}
