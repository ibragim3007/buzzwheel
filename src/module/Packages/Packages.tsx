import Grid from "@/src/shared/ui/grid/Grid";
import React from "react";

import { usePackage } from "@/src/entities/Package/usePackage";
import PackageItem from "./PackageItem";
import { Package } from "@/src/shared/types/globalTypes";
import { useVibration } from "@/src/shared/hooks/useVibration";

export default function Packages() {
  const { data, togglePackage, pickedPackages } = usePackage();

  const { vibrateSelection } = useVibration();

  const onTogglePackage = (pack: Package) => {
    togglePackage(pack);
    void vibrateSelection();
  };

  return (
    <Grid space="md">
      {data.packages.map((pack) => {
        const isPicked = pickedPackages.map((pM) => pM.id).includes(pack.id);
        return (
          <PackageItem
            onPress={onTogglePackage}
            picked={isPicked}
            key={pack.id}
            pack={pack}
          />
        );
      })}
    </Grid>
  );
}
