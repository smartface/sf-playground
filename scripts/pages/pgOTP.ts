import PgOTPDesign from 'generated/pages/pgOTP';
import Permission from '@smartface/native/device/permission';
import Application from '@smartface/native/application';
import SMSReceiver from '@smartface/native/device/smsreceiver';
import TextContentType from '@smartface/native/ui/shared/textcontenttype';
import DatePicker from '@smartface/native/ui/datepicker';
import System from '@smartface/native/device/system';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Color from '@smartface/native/ui/color';
import Font from '@smartface/native/ui/font';
import { PermissionResult, Permissions } from '@smartface/native/device/permission/permission';

export default class PgOTP extends withDismissAndBackButton(PgOTPDesign) {
  datePicker: DatePicker;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  requestSMSPermission() {
    if (System.OS === System.OSType.IOS) {
      return; // Only works on Android
    }
    Permission.android.requestPermissions(Permissions.ANDROID.RECEIVE_SMS).then((e) => {
      const result = e[0];
      if (result === PermissionResult.GRANTED) {
        SMSReceiver.registerReceiver();
        SMSReceiver.callback = (e) => {
          console.info(e);
          alert('SMS IS RECEIVED');
          SMSReceiver.unRegisterReceiver();
        };
      }
    });
  }

  initOTP() {
    this.textBox1.ios.textContentType = TextContentType.ONETIMECODE;
  }

  /**
   * This will be triggered when user leaves the page.
   */
  onHide() {
    if (System.OS === System.OSType.ANDROID) {
      SMSReceiver.unRegisterReceiver(); // Only works on Android
    }
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
    // this.capturePhoto();
    this.requestSMSPermission();
    this.initOTP();
  }
}
