import PgSystemDesign from 'generated/pages/pgSystem';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import System from '@smartface/native/device/system';

export default class PgSystem extends withDismissAndBackButton(PgSystemDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  printSystem() {
    //SYSTEM TESTS
    console.log('Device.System.OS: ' + System.OS);
    console.log('Device.System.OSVersion: ' + System.OSVersion);
    console.log('Device.System.batteryLevel: ' + System.batteryLevel);
    console.log('Device.System.isBatteryCharged: ' + System.isBatteryCharged);
    console.log('Device.System.getClipboard: ' + System.getClipboard());
    console.log('Device.System.language: ' + System.language);
    console.log('Device.System.region: ' + System.region);
    console.log('Device.System.vibrate(): ' + System.vibrate({ millisecond: 500 }));
    console.log('Device.System.fingerPrintAvailable: ' + System.fingerPrintAvailable);
    console.log('Device.System.isEmulator: ' + System.isEmulator);
    console.log('Device.System.biometricsAvailable: ' + System.biometricsAvailable);
    console.log('Device.System.biometricType: ' + System.biometricType);
    if (System.OS === System.OSType.ANDROID) {
      console.log('Device.System.android.apiLevel: ' + System.android.apiLevel);
      console.log('Device.System.android.menuKeyAvaliable: ' + System.android.menuKeyAvaliable);
    }
    this.lblSystemDetails.text = `
    System.OS: ${System.OS}
    System.OSVersion: ${System.OSVersion}
    System.batteryLevel: ${System.batteryLevel}
    System.isBatteryCharged: ${System.isBatteryCharged}
    System.getClipboard: ${System.getClipboard()}
    System.language: ${System.language}
    System.region: ${System.region}
    System.vibrate(): ${System.vibrate({ millisecond: 500 })}
    System.fingerPrintAvailable: ${System.fingerPrintAvailable}
    System.isEmulator: ${System.isEmulator}
    System.biometricsAvailable: ${System.biometricsAvailable}
    System.biometricType: ${System.biometricType}
    System.android.apiLevel: ${System.OS === System.OSType.ANDROID ? System.android.apiLevel : 'NOT AND'}
    System.android.menuKeyAvailable: ${System.OS === System.OSType.ANDROID ? System.android.menuKeyAvaliable : 'NOT AND'}`;
  }

  onShow() {
    super.onShow();
    this.printSystem();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
  }
}
