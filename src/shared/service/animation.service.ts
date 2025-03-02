import {
  ComplexAnimationBuilder,
  FadeInUp,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  ZoomInDown,
} from 'react-native-reanimated';

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

class AnimationEngine {
  private ANIMATION_SPEED: number;
  private MASS: number;
  private stiffness: number;

  constructor(options: OptionAnimationServiceType) {
    const { ANIMATION_SPEED, MASS, stiffness } = options;
    this.ANIMATION_SPEED = ANIMATION_SPEED;
    this.MASS = MASS;
    this.stiffness = stiffness;
  }

  private createAnimation<T extends ComplexAnimationBuilder>(animationType: T, n: number) {
    return animationType
      .delay(n * this.ANIMATION_SPEED)
      .springify()
      .stiffness(this.stiffness)
      .mass(this.MASS);
  }

  fadeInUp = (n: number) => this.createAnimation(new FadeInUp(), n);
  zoomInDown = (n: number) => this.createAnimation(new ZoomInDown(), n);
  slideInRight = (n: number) => this.createAnimation(new SlideInRight(), n);
  slideOutRight = (n: number) => this.createAnimation(new SlideOutRight(), n);
  slideOutLeft = (n: number) => this.createAnimation(new SlideOutLeft(), n);
}

export const animationEngine = new AnimationEngine(OptionsAnimationService);

class AnimationService {
  animationEngine: AnimationEngine;

  constructor(animationEngine: AnimationEngine) {
    this.animationEngine = animationEngine;
  }

  getAnimationForShowPackageItem = (index: number) => {
    return this.animationEngine.slideInRight((index + 1) * 0.5);
  };

  enteringDareCard = (index: number) => {
    return this.animationEngine.slideInRight(index);
  };
}

export const animationService = new AnimationService(animationEngine);
