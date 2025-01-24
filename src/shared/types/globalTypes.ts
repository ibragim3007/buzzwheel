export type LANGUAGE =
  | "ru"
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "pl"
  | "tr"
  | "nl"
  | "sv"
  | "cs";

export interface Package {
  readonly id: number;
  readonly name: string;
  readonly version: string;
  readonly packageType: string;
  readonly frameColor: string;
  readonly description: string;
  readonly imageEncoded: string;
  readonly paymentIdentifier: string;
  readonly isFree: boolean;
  readonly forceSelected: boolean;
  readonly purchased: boolean;
}

export interface Dare {
  readonly id: number;
  readonly action: string;
  readonly time: number;
  readonly package: number;
}

export type Player = {
  readonly id: number;
  name: string;
};

export interface Item {
  readonly id: number;
  readonly name: string;
  readonly encoded: string;
}

export interface DATA {
  readonly version: string;
  readonly applicationVersion: string;
  dares: Dare[];
  items: Item[];
  packages: Package[];
  describer: string;
  language: LanguageInterface;
}

export interface LanguageInterface {
  readonly id: number;
  code: LANGUAGE;
  name: string;
  ruName: string;
  yandexCode: string;
}
