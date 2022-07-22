import PgCallDetectionDesign from 'generated/pages/pgCallDetection';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Application from '@smartface/native/application';
import CallDetection from '@smartface/native/device/calldetection';
import Permission from '@smartface/native/device/permission';
import { PermissionResult, Permissions } from '@smartface/native/device/permission/permission';

export default class PgCallDetection extends withDismissAndBackButton(PgCallDetectionDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  async initCallStateListener() {
    const results = await Permission.android.requestPermissions(Permissions.ANDROID.READ_PHONE_STATE);
    if (results[0] === PermissionResult.GRANTED) {
      CallDetection.on('callStateChanged', (a) => console.info(a));
    }
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.initCallStateListener();
  }

  onLoad() {
    super.onLoad();
  }
}
