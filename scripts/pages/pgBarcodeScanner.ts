import PgBarcodeScannerDesign from 'generated/pages/pgBarcodeScanner';
import { withDismissAndBackButton } from '@smartface/mixins';
import Router from '@smartface/router/lib/router/Router';
import { Route } from '@smartface/router';
import AlertView from '@smartface/native/ui/alertview';
import BarcodeScanner from '@smartface/native/device/barcodescanner';
import Screen from '@smartface/native/device/screen';
import Application from '@smartface/native/application';
import { themeService } from 'theme';
import System from '@smartface/native/device/system';
import Toast from '@smartface/native/ui/toast';

export default class PgBarcodeScanner extends withDismissAndBackButton(PgBarcodeScannerDesign) {
  nativeBarcodeScanner: BarcodeScanner;
  private wrapperOldHeight = themeService.getNativeStyle('.sf-flexLayout').height;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnShowBarcode.onPress = () => {
      this.showBarcode();
      this.toggleBarcodeVisibility(true);
    };
    this.lblBarcodeText.onTouch = () => {
      if (!this.lblBarcodeText.text.startsWith('(')) {
        System.clipboard = this.lblBarcodeText.text;
        const toast = new Toast();
        toast.message = 'Copied to Clipboard!';
        toast.duration = 2;
        toast.show();
      }
      return true;
    };
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
    this.nativeBarcodeScanner = new BarcodeScanner({
      layout: this.flBarcode,
      width: Screen.width,
      height: this.wrapperOldHeight // can also set null
    });
  }

  showBarcode() {
    this.nativeBarcodeScanner
      .checkPermission()
      .then(() => this.showScanPage())
      .catch(async () => {
        await this.askUserForPermission();
        Application.call({
          uriScheme: `app-settings:root=LOCATION_SERVICES`
        });
      });
  }
  hideBarcode(): void {
    this.nativeBarcodeScanner.stopCamera();
    this.nativeBarcodeScanner.hide();
  }

  showScanPage(): void {
    this.nativeBarcodeScanner.show().then((result) => {
      this.toggleBarcodeVisibility(false);
      this.hideBarcode();
      this.lblBarcodeFormat.text = result.barcode.format;
      this.lblBarcodeText.text = result.barcode.text;
    });
    setTimeout(() => {
      this.nativeBarcodeScanner.startCamera();
    }, 250);
  }

  private toggleButtonVisibility(visible: boolean) {
    this.btnShowBarcode.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        visible
      }
    });
  }

  private toggleBarcodeVisibility(toggle: boolean) {
    this.toggleButtonVisibility(!toggle);
    this.flBarcode.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        height: toggle ? this.wrapperOldHeight : 0
      }
    });
  }

  private async askUserForPermission(): Promise<void> {
    return new Promise((resolve, reject) => {
      const alertView = new AlertView({
        title: 'needCameraPermission'
      });
      alertView.addButton({
        type: AlertView.Android.ButtonType.NEGATIVE,
        text: 'Reject',
        onClick: () => reject()
      });
      alertView.addButton({
        type: AlertView.Android.ButtonType.POSITIVE,
        text: 'Allow',
        onClick: () => resolve()
      });
      alertView.show();
    });
  }
}
