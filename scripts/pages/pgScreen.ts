import PgScreenDesign from 'generated/pages/pgScreen';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Screen from '@smartface/native/device/screen';

export default class PgScreen extends withDismissAndBackButton(PgScreenDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  printScreen() {
    console.log('Screen module test: ', {
      orientation: Screen.orientation,
      height: Screen.height,
      width: Screen.width,
      touchSupported: Screen.touchSupported,
      dpi: Screen.dpi,
      iosForceTouchAvaliable: Screen.ios.forceTouchAvaliable
    });
    const screenshot = Screen.capture();
    console.log(screenshot);
    this.lblScreenDetails.text = `
    orientation: ${Screen.orientation}
    height: ${Screen.height}
    width: ${Screen.width}
    touchSupported: ${Screen.touchSupported}
    dpi: ${Screen.dpi}
    iosForceTouchAvaliable: ${Screen.ios.forceTouchAvaliable}
    `;
  }

  onShow() {
    super.onShow();
    this.printScreen();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
