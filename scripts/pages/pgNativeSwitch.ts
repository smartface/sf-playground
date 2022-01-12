import PgNativeSwitchDesign from "generated/pages/pgNativeSwitch";
import SwitchAndroid from "lib/SwitchAndroid";
import SwitchIOS from "lib/SwitchIOS";
import System from "@smartface/native/device/system";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router, Route } from "@smartface/router";
import { backButtonImage } from "lib/constants/style";

export default class PgNativeSwitch extends withDismissAndBackButton(PgNativeSwitchDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  initAndroidSwitch() {
    const nativeSwitch = System.OS === "iOS" ? new SwitchIOS() : new SwitchAndroid();
    //@ts-ignore
    this.addChild(nativeSwitch, "switchIOS");
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router, {
      image: backButtonImage,
    });
  }

  onLoad() {
    super.onLoad();
    this.initAndroidSwitch();
  }
}
