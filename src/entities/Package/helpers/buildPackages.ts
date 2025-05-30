import { Dare, LANGUAGE, Package } from '@/src/shared/types/globalTypes';
import { PackageWithDaresIds } from '../usePackage';
import { modes } from '@/assets/package_mock/modes';

const INITIAL_WEIGHT = 1;
export const buildPackages = (lang: LANGUAGE): PackageWithDaresIds[] => {
  const modesLang = modes[lang];

  return Object.values(modesLang).map((mode, index) => ({
    ...mode,
    weight: INITIAL_WEIGHT,
    packageType: mode.packageType as Package['packageType'],
    dares: mode.dares.map((dare, dareIndex) => ({
      ...dare,
      id: index * 100 + dareIndex,
      type: dare.type as Dare['type'],
    })),
  }));
};
