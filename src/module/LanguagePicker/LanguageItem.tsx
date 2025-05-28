import { IDisplayLanguage } from '@/src/shared/config/constants/languages/availableLanguages';
import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid, { GridPressable } from '@/src/shared/ui/grid/Grid';
import Typography from '@/src/shared/ui/typography/Typography';

interface LanguageItemProps {
  item: IDisplayLanguage;
  picked: boolean;
  onSetLanguage: (code: string) => void;
}

export default function LanguageItem({ item, picked, onSetLanguage }: LanguageItemProps) {
  const colors = useTheme();
  const handlePress = () => {
    onSetLanguage(item.code);
  };
  return (
    <GridPressable
      onPress={handlePress}
      color={picked ? colors.accent.tertiary : 'transparent'}
      width="100%"
      row
      space="md"
      align="center"
      justfity="space-between"
      padding={10}
      style={{ borderRadius: colors.styles.borderRadiusDefault }}
    >
      <Typography weight={picked ? 'bold' : 'medium'}>{item.label}</Typography>
      <Typography>{item.flag}</Typography>
    </GridPressable>
  );
}
