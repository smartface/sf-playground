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
import Color from "@smartface/native/ui/color";
import Font from "@smartface/native/ui/font";


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
    if(System.OS === System.OSType.IOS) {
        this.datePicker.ios.title = "Datepicker Title";
        this.datePicker.ios.titleColor = Color.WHITE;
        this.datePicker.ios.titleFont = Font.create("Arial", 20, Font.BOLD);
        this.datePicker.ios.cancelText = "Cancel Action";
        this.datePicker.ios.cancelColor = Color.RED
        this.datePicker.ios.cancelHighlightedColor = Color.MAGENTA;
        this.datePicker.ios.cancelFont = Font.create("Arial", 14, Font.ITALIC);
        this.datePicker.ios.okText = "OK Action";
        this.datePicker.ios.okColor = Color.BLUE
        this.datePicker.ios.okHighlightedColor = Color.CYAN;
        this.datePicker.ios.okFont = Font.create("Arial", 14, Font.ITALIC);
        this.datePicker.ios.datePickerMode = DatePicker.iOS.DatePickerMode.DATEANDTIME;
        this.datePicker.ios.dialogBackgroundColor = Color.GRAY;
        this.datePicker.ios.dialogLineColor = Color.BLACK;
    }
    else {
        // this.datePicker.android.style = DatePicker.Android.Style.MATERIAL_DARK; // this doesn't work NTVE-607
    }
    this.datePicker.setDate(new Date());
    this.datePicker.setMinDate(new Date(2015, 10, 10));
    this.datePicker.setMaxDate(new Date(2024, 10, 10));
    this.datePicker.on("cancelled", () => {
        console.log("Datepicker onCancelled test");
    });
    this.datePicker.on("selected", () => {
        console.log("Datepicker onSelected test");
    });
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
