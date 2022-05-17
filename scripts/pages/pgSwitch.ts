import PgSwitchDesign from 'generated/pages/pgSwitch';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Color from '@smartface/native/ui/color';
import { SwitchEvents } from '@smartface/native/ui/switch/switch-events';

export default class PgSwitch extends withDismissAndBackButton(PgSwitchDesign) {
  private _enabled = true;
  private _toggled = true;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnEnable.on('press', () => this.switchEnabled());
    this.btnThumbImage.on('press', () => this.setThumbImage());
    this.btnThumbOffColor.on('press', () => this.setThumbOffColor());
    this.btnThumbOnColor.on('press', () => this.setThumbOnColor());
    this.btnToggleImage.on('press', () => this.toggleImage());
    this.btnToggleOffColor.on('press', () => this.setToggleOffColor());
    this.btnToggleOnColor.on('press', () => this.setToggleOnColor());
    this.btnToggleTrue.on('press', () => this.setSwitchTrue());
    this.sw1.on(SwitchEvents.ToggleChanged, (value) => {
      console.info('Switch Toggled, New Value: ', value);
      this._toggled = value;
      this.btnToggleTrue.text = value ? 'Set Switch to False' : 'Set Switch to True';
    });
  }

  switchEnabled() {
    this._enabled = !this._enabled;
    this.sw1.enabled = this._enabled;
    this.btnEnable.text = this._enabled ? 'Disable Switch' : 'Enable Switch';
  }

  setThumbImage() {
    this.sw1.android.thumbImage = 'images://misc.png';
  }

  setThumbOffColor() {
    this.sw1.android.thumbOffColor = Color.GREEN;
  }

  setThumbOnColor() {
    this.sw1.thumbOnColor = Color.BLUE;
  }

  toggleImage() {
    this.sw1.android.toggleImage = 'images://sfnative.png';
  }

  setToggleOffColor() {
    this.sw1.android.toggleOffColor = Color.DARKGRAY;
  }

  setToggleOnColor() {
    this.sw1.toggleOnColor = Color.MAGENTA;
  }

  setSwitchTrue() {
    const newValue = this._toggled ? false : true;
    console.info('Setting switch to: ', newValue);
    this.sw1.toggle = newValue;
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
  }
}
