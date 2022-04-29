import PgCallDetectionDesign from 'generated/pages/pgCallDetection';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { getPermission } from '@smartface/extension-utils/lib/permission';
import Application from '@smartface/native/application';
import CallDetection from '@smartface/native/device/calldetection';

export default class PgCallDetection extends withDismissAndBackButton(PgCallDetectionDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  async initCallStateListener() {
    try {
      await getPermission({
        permissionText: 'CallPerm',
        //@ts-ignore
        androidPermission: Application.Android.Permissions.READ_PHONE_STATE,
        permissionTitle: 'CallPermTitle',
        showSettingsAlert: false
      });
      CallDetection.on('callStateChanged', (a) => console.info(a));
    } catch (e) {
      console.error(e.message, { stack: e.stack });
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
