import PgHardwareDesign from 'generated/pages/pgHardware';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Hardware from '@smartface/native/device/hardware';
import System from '@smartface/native/device/system';

export default class PgHardware extends withDismissAndBackButton(PgHardwareDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  printHardware() {
    // HARDWARE TESTS
    console.log('Hardware.UID: ' + Hardware.UID);
    console.log('Hardware.brandName: ' + Hardware.brandName);
    console.log('Hardware.brandModel: ' + Hardware.brandModel);
    console.log('Hardware.deviceType: ' + Hardware.deviceType); //TODO: Check after devicetype fix
    if (System.OS === System.OSType.ANDROID) {
      console.log('Hardware.android.vendorID: ' + Hardware.android.vendorID);
    }
    this.lblHardwareStatus.text = `
    Hardware.UID: ${Hardware.UID}
    Hardware.brandName: ${Hardware.brandName}
    Hardware.brandModel: ${Hardware.brandModel}
    Hardware.deviceType: ${Hardware.deviceType}
    Hardware.android.vendorID: ${Hardware.android?.vendorID}
    Hardware.ios.modelName: ${Hardware.modelName}
    `;
  }

  onShow() {
    super.onShow();
    this.printHardware();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
