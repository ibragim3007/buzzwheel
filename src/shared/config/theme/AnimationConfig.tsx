import {
  Easing,
  FadeInDown,
  FadeInUp,
  FadeOutUp,
  LinearTransition,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  SlideOutUp,
} from 'react-native-reanimated';
import { ANIMATION_SPEED } from '../constants/constants';

// type AnimType = typeof BaseAnimationBuilder | BaseAnimationBuilder | LayoutAnimationFunction | undefined;

export const CustomAnimations = {
  layoutDefault: LinearTransition.duration(ANIMATION_SPEED).springify().damping(10).mass(0.47),
  showPunishmentText: FadeInDown.springify().mass(0.47),
  enterItemShow: (n: number) =>
    FadeInUp.delay(n * 25)
      .springify()
      .mass(0.57),
  exitItemShow: (n: number) =>
    FadeOutUp.delay(ANIMATION_SPEED / 2 / (n === 0 ? 1 : n * 10))
      .springify()
      .mass(0.57),
  enterSlideFromDown: (n: number) =>
    SlideInDown.delay(n * 200)
      .springify()
      .mass(0.6)
      .stiffness(65),
  exitSlideOutUp: (n: number) =>
    SlideOutUp.delay(n * 200)
      .springify()
      .mass(0.6)
      .stiffness(65),
  enterSlideFromRight: (n: number) =>
    SlideInRight.delay(n * ANIMATION_SPEED)
      .springify()
      .mass(0.6)
      .stiffness(70),
  exitSlideToLeft: (n: number) =>
    SlideInLeft.delay(n * ANIMATION_SPEED)
      .springify()
      .mass(0.6)
      .stiffness(70),
  enterFadeInDownItem: (n: number) =>
    FadeInDown.duration(700)
      .easing(Easing.inOut(Easing.ease))
      .delay(100 * n),
  exitSlideOutLeft: (n: number) =>
    SlideOutLeft.delay(n * ANIMATION_SPEED)
      .springify()
      .mass(0.6)
      .stiffness(70),

  enterSlideFromLeft: (n: number) =>
    SlideInLeft.delay(n * ANIMATION_SPEED)
      .springify()
      .mass(0.6)
      .stiffness(70),

  exitSlideOutRight: (n: number) =>
    SlideOutRight.delay(n * ANIMATION_SPEED)
      .mass(0.6)
      .stiffness(70),
};
