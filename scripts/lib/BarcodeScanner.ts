import Screen from "sf-core/device/screen";
import Application from "sf-core/application";
import System from "sf-core/device/system";
import Page from 'sf-core/ui/page';
import { BarcodeScanner as SFBarcodeScanner } from "sf-extension-barcode";
import AlertView from 'sf-core/ui/alertview';

export class BarcodeScanner {
    listeners: (() => void)[] = [];
    barcodeScanner: SFBarcodeScanner;
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
        if (System.OS === "iOS") {
            SFBarcodeScanner.ios.checkPermission({
                onSuccess: () => this.showScanPage(),
                onFailure: async () => {
                    await this.askUserForPermission();
                    Application.call({
                        uriScheme: `app-settings:root=LOCATION_SERVICES`
                    })
                }
            });
        }
        else {
            const CAMERA_PERMISSION_CODE = 1002;
            if (Application.android.checkPermission(Application.Android.Permissions.CAMERA)) {
                this.showScanPage();
            }
            else {
                Application.android.requestPermissions(CAMERA_PERMISSION_CODE, Application.Android.Permissions.CAMERA);
            }
            Application.android.onRequestPermissionsResult = e => {
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
                title: global.lang.needCameraPermission,
            });
            alertView.addButton({
                text: global.lang.doNotAllow,
                onClick: () => Promise.reject()
            });
            alertView.addButton({
                text: global.lang.allow,
                onClick: () => Promise.resolve()
            });
            alertView.show();
        });
    }
}