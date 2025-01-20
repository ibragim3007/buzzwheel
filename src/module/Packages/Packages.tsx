import Grid from "@/src/shared/ui/grid/Grid";
import React from "react";
import ModeItem from "./PackageItem";
import { Package } from "@/src/entities/Package/types/types";
import { usePackage } from "@/src/entities/Package/usePackage";

export default function Packages() {
  const { packages, togglePackage, pickedPackages } = usePackage();

  const onTogglePackage = (pack: Package) => {
    togglePackage(pack);
  };

  return (
    <Grid space="md">
      {packages.map((pack) => {
        const isPicked = pickedPackages.map((pM) => pM.id).includes(pack.id);
        return (
          <ModeItem
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
