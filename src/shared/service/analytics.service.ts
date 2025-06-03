import { customEvent as customEventFn } from 'vexo-analytics';

export const Events = {
  pressAddPlayer: 'press_add_player',
  addPlayerRestricted: 'add_player_restricted',
  notEnougthPlayers: 'not_enough_players',
  pressRemovePlayer: 'press_remove_player',
  pressStartGame: 'press_start_game',
  pressSettings: 'press_settings',
  pressDisableRepeated: 'press_disable_repeated',
  pressDisabledDrinkingMode: 'press_disabled_drinking_mode',
  pressEnableDrinkingMode: 'press_enable_drinking_mode',
  pressDisableVibration: 'press_disable_vibration',
  pressProButton: 'press_pro_button',
  pressRateUs: 'press_rate_us',
  pressWriteReview: 'press_write_review',
  pressBuyButtonInPaywall: 'press_play_for_free',
  pressClosePaywall: 'press_close_paywall',
  pressContinueGameAfterPackagePage: 'press_continue_game_after_package_page',
  pressOnOpenPackage: 'press_on_open_package',
  pressOnDisabledPackage: 'press_on_disabled_package',
  pressUnlockButtonInPackagePage: 'press_unlock_button_in_package_page',
  pressDrinkDare: 'press_drink_dare',
  pressDryRun: 'press_dry_run',
  pressStartGameAfterModePage: 'press_start_game_after_mode_page',
  pressSpinWheel: 'press_spin_wheel',
  finishRotation: 'finish_rotation',
  pressTimer: 'press_timer',
  pressPause: 'press_pause',
  pressReset: 'press_reset',
  pressAlcohol: 'press_alcohol',
  pressDone: 'press_done',

  gameResult: 'result_game',
  paywallShownAfterDisablePackagePress: 'paywall_shown_after_disable_package_press',
  timeBeforeClosePaywall: 'time_before_close_paywall',
};

class EventsController {
  private customEvent: (name: string, args: object) => void;

  constructor(customEvent: (name: string, args: object) => void) {
    this.customEvent = customEvent;
  }

  trackEvent(name: string, args: object) {
    this.customEvent(name, args);
  }
}

export const analytics = new EventsController(customEventFn);
