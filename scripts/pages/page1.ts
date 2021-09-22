import Page1Design from 'generated/pages/page1';
import Multimedia from '@smartface/native/device/multimedia';
import Permission from '@smartface/extension-utils/lib/permission';
import Application from '@smartface/native/application';
import SMSReceiver from '@smartface/extension-sms-receiver';
import TextContentType from '@smartface/native/ui/textcontenttype';
import DatePicker from '@smartface/native/ui/datepicker';
import System from '@smartface/native/device/system';

export default class Page1 extends Page1Design {
  router: any;
  datePicker: DatePicker;
  constructor() {
    super();
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    this.onHide = onHide.bind(this, this.onHide && this.onHide.bind(this));
    this.btnNext.onPress = () => {
      this.capturePhoto();
    }
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
        maxImageSize: 2048
      },
      allowsEditing: true,
      action: Multimedia.ActionType.IMAGE_CAPTURE,
      type: Multimedia.Type.IMAGE,
      ios: {
        cameraDevice: Multimedia.iOS.CameraDevice.REAR
      }
    });
  }

  requestSMSPermission() {
    if (System.OS === System.OSType.IOS) {
      return; // Only works on Android
    }
    Permission.getPermission({
      androidPermission: Application.Android.Permissions.RECEIVE_SMS,
      permissionText: "Requesting to Receive SMS to do awesome stuff",
      permissionTitle: "Permission Required"
    })
      .then(() => {
        SMSReceiver.registerReceiver();
        SMSReceiver.callback = (e) => {
          console.info(e);
          alert("SMS IS RECEIVED");
          SMSReceiver.unRegisterReceiver();
        }
      })
  }

  initOTP() {
    this.textBox1.ios.textContentType = TextContentType.ONETIMECODE;
  }

  initDatePicker() {
    this.datePicker = new DatePicker();
    this.datePicker.show();
  }
}

/**
 * This will be triggered when user leaves the page.
 */
function onHide(superOnHide: () => void) {
  superOnHide();
  if (System.OS === System.OSType.ANDROID) {
    SMSReceiver.unRegisterReceiver(); // Only works on Android
  }

}

function onShow(this: Page1, superOnShow: () => void) {
  superOnShow();
  this.initDatePicker();
}

function onLoad(this: Page1, superOnLoad: () => void) {
  superOnLoad();
  // this.capturePhoto();
  this.requestSMSPermission();
  this.initOTP();
}
