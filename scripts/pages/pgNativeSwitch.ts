import PgNativeSwitchDesign from 'generated/pages/pgNativeSwitch';
import SwitchAndroid from 'lib/SwitchAndroid';
import SwitchIOS from 'lib/SwitchIOS';
import System from '@smartface/native/device/system';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

export default class PgNativeSwitch extends withDismissAndBackButton(PgNativeSwitchDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  initAndroidSwitch() {
    const nativeSwitch = System.OS === 'iOS' ? new SwitchIOS() : new SwitchAndroid();
    this.addChild(nativeSwitch, 'switchIOS');
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
    this.initAndroidSwitch();
  }
}
