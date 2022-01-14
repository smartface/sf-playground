import PgOTPDesign from "generated/pages/pgOTP";
import Multimedia from "@smartface/native/device/multimedia";
import Permission from "@smartface/extension-utils/lib/permission";
import Application from "@smartface/native/application";
import SMSReceiver from "@smartface/extension-sms-receiver";
import TextContentType from "@smartface/native/ui/textcontenttype";
import DatePicker from "@smartface/native/ui/datepicker";
import System from "@smartface/native/device/system";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router, Route } from "@smartface/router";


export default class PgOTP extends withDismissAndBackButton(PgOTPDesign) {
  datePicker: DatePicker;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnNext.onPress = () => {
      this.capturePhoto();
    };
  }
  capturePhoto() {
    Multimedia.capturePhoto({
      onSuccess: ({ image }) => {
        this.imageView1.image = image;
      },
      page: this,
      android: {
        cropShape: Multimedia.Android.CropShape.RECTANGLE,
        fixOrientation: true,
        maxImageSize: 2048,
      },
      allowsEditing: true,
      action: Multimedia.ActionType.IMAGE_CAPTURE,
      type: Multimedia.Type.IMAGE,
      ios: {
        cameraDevice: Multimedia.iOS.CameraDevice.REAR,
      },
    });
  }

  requestSMSPermission() {
    if (System.OS === System.OSType.IOS) {
      return; // Only works on Android
    }
    Permission.getPermission({
      androidPermission: Application.Android.Permissions.RECEIVE_SMS,
      permissionText: "Requesting to Receive SMS to do awesome stuff",
      permissionTitle: "Permission Required",
    }).then(() => {
      SMSReceiver.registerReceiver();
      SMSReceiver.callback = (e) => {
        console.info(e);
        alert("SMS IS RECEIVED");
        SMSReceiver.unRegisterReceiver();
      };
    });
  }

  initOTP() {
    this.textBox1.ios.textContentType = TextContentType.ONETIMECODE;
  }

  initDatePicker() {
    this.datePicker = new DatePicker();
    this.datePicker.show();
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
    this.initDatePicker();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
    // this.capturePhoto();
    this.requestSMSPermission();
    this.initOTP();
  }
}
