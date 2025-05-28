import Grid from '@/src/shared/ui/grid/Grid';

import { usePackage } from '@/src/entities/Package/usePackage';
import { useVibration } from '@/src/shared/hooks/useVibration';
import { Package } from '@/src/shared/types/globalTypes';
import PackageItem from './PackageItem';

export default function Packages() {
  const { data, togglePackage, pickedPackages } = usePackage();

  const { vibrateSelection } = useVibration();

  const onTogglePackage = (pack: Package) => {
    togglePackage(pack);
    void vibrateSelection();
  };

  return (
    <Grid gap={14}>
      {data.map((pack, index) => {
        const isPicked = pickedPackages.map(pM => pM.id).includes(pack.id);
        const amountOfDares = pack.dares.length;
        return (
          <PackageItem
            onPress={onTogglePackage}
            picked={isPicked}
            key={pack.id}
            pack={pack}
            index={index}
            amountOfDares={amountOfDares}
          />
        );
      })}
    </Grid>
  );
}
