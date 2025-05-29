import freeModeRu from './1_free_mode/ru.json';
import flirtyDuoRu from './2_Flirty_Duo/ru.json';
import shadesRu from './3_50_Shades/ru.json';
import chaosRu from './4_CHAOS_Mode/ru.json';
import SillyVibesRu from './5_Silly_Vibes/ru.json';
import GlassConfessionsRu from './6_Glass_Confessions/ru.json';
import BoysOnEdgeRu from './7_Boys_on_Edge/ru.json';
import HeelsSecretsRu from './8_Heels_Secrets/ru.json';
import TotalMayhemRu from './9_Total_Mayhem/ru.json';
import DrunkGeniusRu from './10_Drunk_Geniuses/ru.json';
import SnackAttact from './11_Snack_Attack_Challenge/ru.json';
import NeverHave from './12_Never_Have_I_Ever/ru.json';

import freeModeEn from './1_free_mode/en.json';
import flirtyDuoEn from './2_Flirty_Duo/en.json';
import shadesEn from './3_50_Shades/en.json';
import chaosEn from './4_CHAOS_Mode/en.json';
import SillyVibesEn from './5_Silly_Vibes/en.json';
import GlassConfessionsEn from './6_Glass_Confessions/en.json';
import BoysOnEdgeEn from './7_Boys_on_Edge/en.json';
import HeelsSecretsEn from './8_Heels_Secrets/en.json';
import TotalMayhemEn from './9_Total_Mayhem/en.json';
import DrunkGeniusEn from './10_Drunk_Geniuses/en.json';
import SnackAttactEn from './11_Snack_Attack_Challenge/en.json';
import NeverHaveEn from './12_Never_Have_I_Ever/en.json';
import { LANGUAGE, Package } from '@/src/shared/types/globalTypes';

export const modesRu = [
  freeModeRu,
  flirtyDuoRu,
  shadesRu,
  chaosRu,
  SillyVibesRu,
  GlassConfessionsRu,
  BoysOnEdgeRu,
  HeelsSecretsRu,
  TotalMayhemRu,
  DrunkGeniusRu,
  SnackAttact,
  NeverHave,
];

export const modesEn = [
  freeModeEn,
  flirtyDuoEn,
  shadesEn,
  chaosEn,
  SillyVibesEn,
  GlassConfessionsEn,
  BoysOnEdgeEn,
  HeelsSecretsEn,
  TotalMayhemEn,
  DrunkGeniusEn,
  SnackAttactEn,
  NeverHaveEn,
];

type TModes = Record<LANGUAGE, Package[]>;

export const modes: TModes = {
  ru: modesRu as Package[],
  en: modesEn as Package[],
};
