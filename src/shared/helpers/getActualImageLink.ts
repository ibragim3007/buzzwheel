import freeModeImage from '@/assets/images/package_icons/1_free_mode.png';
import flirtyDuoImage from '@/assets/images/package_icons/2_flirty_duo.png';
import shadesImage from '@/assets/images/package_icons/3_50_shades.png';
import chaosModeImage from '@/assets/images/package_icons/4_chaos_mode.png';
import sillyVibesImage from '@/assets/images/package_icons/5_silly_vibes.png';
import glassConfessionsImage from '@/assets/images/package_icons/6_glass_confessions.png';
import boysOnEdgeImage from '@/assets/images/package_icons/7_boys_on_edge.png';
import heelsSecretsImage from '@/assets/images/package_icons/8_heels_secrets.png';
import totalMayhemImage from '@/assets/images/package_icons/9_total_mayhem.png';
import drunkGeniusesImage from '@/assets/images/package_icons/10_drunk_geniuses.png';
import snackAttackImage from '@/assets/images/package_icons/11_snack_attack_challenge.png';
import neverHaveIEverImage from '@/assets/images/package_icons/12_never_have_i_ever.png';

const localPackageImages: Record<string, number> = {
  'package_icons/1_free_mode.png': freeModeImage,
  'package_icons/2_flirty_duo.png': flirtyDuoImage,
  'package_icons/3_50_shades.png': shadesImage,
  'package_icons/4_chaos_mode.png': chaosModeImage,
  'package_icons/5_silly_vibes.png': sillyVibesImage,
  'package_icons/6_glass_confessions.png': glassConfessionsImage,
  'package_icons/7_boys_on_edge.png': boysOnEdgeImage,
  'package_icons/8_heels_secrets.png': heelsSecretsImage,
  'package_icons/9_total_mayhem.png': totalMayhemImage,
  'package_icons/10_drunk_geniuses.png': drunkGeniusesImage,
  'package_icons/11_snack_attack_challenge.png': snackAttackImage,
  'package_icons/12_never_have_i_ever.png': neverHaveIEverImage,
};

export function getActualImageLink(fileName?: string, api: string = 'https://indare.ru') {
  if (!fileName) return '';

  return localPackageImages[fileName] ?? api + '/api/uploads/' + fileName;
}
