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
  readonly packageType: string;
  readonly description: string;
  readonly imageEncoded: string;
  readonly isFree: boolean;
}

export interface Dare {
  readonly id: number;
  readonly title: string;
  readonly action: string;
  readonly time: number;
  readonly package: number;
}

export type Player = {
  readonly id: number;
  name: string;
};

export interface DATA {
  dares: Dare[];
  packages: Package[];
  language: LanguageInterface;
}

export interface LanguageInterface {
  readonly id: number;
  code: LANGUAGE;
  name: string;
  ruName: string;
  yandexCode: string;
}
