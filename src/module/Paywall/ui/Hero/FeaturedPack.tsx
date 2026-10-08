import { PackageWithDaresIds } from '@/src/entities/Package/usePackage';
import { getActualImageLink } from '@/src/shared/helpers/getActualImageLink';
import { useTheme } from '@/src/shared/hooks/useTheme';
import Grid from '@/src/shared/ui/grid/Grid';
import { normalizedSize } from '@/src/shared/utils/size';
import { Image } from 'expo-image';
import { withOpacity } from '../../helpers/withOpacity';

const COVER_SIZE = normalizedSize(84);

interface FeaturedPackProps {
  pack: PackageWithDaresIds;
}

// Контекстная шапка: обложка пака, на который нажал пользователь, с мягким свечением
export default function FeaturedPack({ pack }: FeaturedPackProps) {
  const colors = useTheme();

  return (
    <Grid align="center" justfity="center" height={COVER_SIZE * 1.2}>
      <Grid
        style={{
          position: 'absolute',
          width: COVER_SIZE * 1.15,
          height: COVER_SIZE * 1.15,
          borderRadius: COVER_SIZE,
          backgroundColor: withOpacity(colors.accent.secondary, 0.18),
          shadowColor: colors.accent.secondary,
          shadowOpacity: 0.6,
          shadowRadius: 40,
          shadowOffset: { width: 0, height: 0 },
        }}
      />
      <Image
        source={getActualImageLink(pack.imageEncoded)}
        style={{ width: COVER_SIZE, height: COVER_SIZE }}
        contentFit="contain"
        cachePolicy="memory-disk"
      />
    </Grid>
  );
}
