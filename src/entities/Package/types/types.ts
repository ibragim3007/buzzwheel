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
