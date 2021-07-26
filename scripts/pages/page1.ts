import Page1Design from 'generated/pages/page1';
import componentContextPatch from "@smartface/contx/lib/smartface/componentContextPatch";
import PageTitleLayout from "components/PageTitleLayout";
import System = require("@smartface/native/device/system");
import { BarcodeScanner } from '@smartface/extension-barcode';
import Multimedia from '@smartface/native/device/multimedia';
import Permission from '@smartface/extension-utils/lib/permission';
import Application from '@smartface/native/application';
import SMSReceiver from '@smartface/extension-sms-receiver';
import TextContentType from '@smartface/native/ui/textcontenttype';
import DatePicker from '@smartface/native/ui/datepicker';

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

function onHide(superOnHide: () => void) {
    superOnHide();
    /**
     * This will be triggered when user leaves the page.
     */
    SMSReceiver.unRegisterReceiver();
}

function onShow(superOnShow: () => void) {
    superOnShow();
    this.initDatePicker();
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
    // this.capturePhoto();
    // this.requestSMSPermission();
    // this.initOTP();
}
