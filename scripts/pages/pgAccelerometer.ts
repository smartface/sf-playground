import PgAccelerometerDesign from 'generated/pages/pgAccelerometer';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Accelerometer from '@smartface/native/device/accelerometer';

export default class PgAccelerometer extends withDismissAndBackButton(PgAccelerometerDesign) {
  private _lock = false;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  testAcc() {
    Accelerometer.start();
    Accelerometer.on('accelerate', (e) => {
      if (!this._lock) {
        console.log('x: ' + e.x + '  y : ' + e.y + '  z : ' + e.z);
        this._lock = true;
        setTimeout(() => (this._lock = false), 500);
      }
    });
  }

  onHide() {
    Accelerometer.off('accelerate', () => {});
    Accelerometer.stop();
  }

  onShow() {
    super.onShow();
    this.testAcc();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
