import Screen from '@smartface/native/device/screen';
import Application from '@smartface/native/application';
import System from '@smartface/native/device/system';
import Page from '@smartface/native/ui/page';
import { BarcodeScanner as SFBarcodeScanner } from '@smartface/extension-barcode';
import AlertView from '@smartface/native/ui/alertview';

export class BarcodeScanner {
  listeners: (() => void)[] = [];
  barcodeScanner: InstanceType<typeof SFBarcodeScanner>;
  constructor(page: Page) {
    this.barcodeScanner = new SFBarcodeScanner({
      layout: page.layout,
      width: Screen.width,
      height: Screen.height,
      onResult: (e) => {
        this.hide();
        this.listeners.forEach((f) => f.call(null, e.barcode.text));
        this.listeners = [];
        //@ts-ignore
        page.router.dismiss();
      }
    });
  }
  show() {
    if (System.OS === System.OSType.IOS) {
      //@ts-ignore
      SFBarcodeScanner.ios.checkPermission({
        onSuccess: () => this.showScanPage(),
        onFailure: async () => {
          await this.askUserForPermission();
          Application.call({
            uriScheme: `app-settings:root=LOCATION_SERVICES`
          });
        }
      });
    } else {
      const CAMERA_PERMISSION_CODE = 1002;
      if (Application.android.checkPermission(Application.Android.Permissions.CAMERA)) {
        this.showScanPage();
      } else {
        Application.android.requestPermissions(CAMERA_PERMISSION_CODE, Application.Android.Permissions.CAMERA);
      }
      Application.android.onRequestPermissionsResult = (e) => {
        if (e.requestCode === CAMERA_PERMISSION_CODE && e.result) {
          this.showScanPage();
        }
      };
    }
  }
  hide(): void {
    this.barcodeScanner.stopCamera();
    this.barcodeScanner.hide();
  }

  addEventListener(e: any): void {
    this.listeners.push(e);
  }

  showScanPage(): void {
    this.barcodeScanner.show();
    setTimeout(() => {
      this.barcodeScanner.startCamera();
    }, 250);
  }

  private async askUserForPermission(): Promise<void> {
    return new Promise((resolve, reject) => {
      const alertView = new AlertView({
        title: 'needCameraPermission'
      });
      alertView.addButton({
        type: AlertView.Android.ButtonType.NEGATIVE,
        text: 'doNotAllow',
        onClick: () => Promise.reject()
      });
      alertView.addButton({
        type: AlertView.Android.ButtonType.NEGATIVE,
        text: 'allow',
        onClick: () => Promise.resolve()
      });
      alertView.show();
    });
  }
}
