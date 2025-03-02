import { FadeInUp, SlideInRight, ZoomInDown } from 'react-native-reanimated';

// Место контроля анимаций в приложении

type OptionAnimationServiceType = {
  ANIMATION_SPEED: number;
  MASS: number;
  stiffness: number;
};

const OptionsAnimationService: OptionAnimationServiceType = {
  ANIMATION_SPEED: 150,
  MASS: 0.6,
  stiffness: 70,
};

interface AnimationBased {
  fadeInUp: (n: number) => FadeInUp;
  zoomInDown: (n: number) => ZoomInDown;
  slideInRight: (n: number) => SlideInRight;
}

class AnimationEngine implements AnimationBased {
  fadeInUp: (n: number) => FadeInUp;
  zoomInDown: (n: number) => ZoomInDown;
  slideInRight: (n: number) => SlideInRight;

  constructor(options: OptionAnimationServiceType) {
    const { ANIMATION_SPEED, MASS, stiffness } = options;

    this.fadeInUp = (n: number) =>
      FadeInUp.delay(n * ANIMATION_SPEED)
        .springify()
        .stiffness(stiffness)
        .mass(MASS);

    this.zoomInDown = (n: number) =>
      ZoomInDown.delay(n * ANIMATION_SPEED)
        .springify()
        .stiffness(stiffness)
        .mass(MASS);

    this.slideInRight = (n: number) =>
      SlideInRight.delay(n * ANIMATION_SPEED)
        .springify()
        .stiffness(stiffness)
        .mass(MASS);
  }
}

const animationEngine = new AnimationEngine(OptionsAnimationService);

class AnimationService {
  animationEngine: AnimationEngine;

  constructor(animationEngine: AnimationEngine) {
    this.animationEngine = animationEngine;
  }

  getAnimationForShowPackageItem = (index: number) => {
    return this.animationEngine.slideInRight(index + 1);
  };
}

export const animationService = new AnimationService(animationEngine);
