export type LANGUAGE = 'ru' | 'en';

export type DareType = 'player' | 'all' | 'gift';
export type PackageType = 'default' | 'pair';

export interface Package {
  readonly id: number;
  readonly name: string;
  readonly packageType: PackageType;
  readonly description: string;
  readonly imageEncoded: string;
  readonly isFree: boolean;
  dares: Dare[];
}

export interface Dare {
  id: number;
  readonly title: string;
  readonly action: string;
  readonly time?: number;
  readonly type: DareType;

  readonly alcohol?: number;
}

export type Player = {
  readonly id: number;
  name: string;
  color?: string;
  type?: 'player' | 'all';
};

// export interface DATA {
//   packages: Package;
// }

export interface LanguageInterface {
  readonly id: number;
  code: LANGUAGE;
  name: string;
  ruName: string;
  yandexCode: string;
}
