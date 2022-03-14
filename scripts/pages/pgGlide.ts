import PgGlideDesign from "generated/pages/pgGlide";
import Button from "@smartface/native/ui/button";
import ImageView from "@smartface/native/ui/imageview";
import Dialog from "@smartface/native/ui/dialog";
import ActivityIndicator from "@smartface/native/ui/activityindicator";
import FlexLayout from "@smartface/native/ui/flexlayout";
import Screen from "@smartface/native/device/screen";
import { themeService } from "theme";
import { styleableComponentMixin } from "@smartface/styling-context";
import System from "@smartface/native/device/system";
import Hardware from "@smartface/native/device/hardware";
import Accelerometer from "@smartface/native/device/accelerometer";

class StyleableActivityIndicator extends styleableComponentMixin(ActivityIndicator) {}
class StyleableImageView extends styleableComponentMixin(ImageView) {}

enum CacheTypes {
  "Memory Caching",
  "HTTP Caching",
  "Disk Caching",
}
const imageOptions = {
  count: 150,
  size: {
    width: 2800,
    height: 2000,
  },
};

const { paddingLeft, paddingRight } = themeService.getStyle(".sf-page");
const IMAGE_WIDTH = Screen.width - (paddingLeft + paddingRight);

export default class PgGlide extends PgGlideDesign {
  dialog: Dialog;
  activityIndicator: StyleableActivityIndicator;
  constructor() {
    super({});
  }
  initButtons() {
    let i = 1;
    const items = Object.values(CacheTypes).filter((value) => typeof value === "string") as string[];
    for (let item of items) {
      const button = new Button();
      this.flOptions.addChild(button, `button${i}`, ".sf-button");
      button.text = item;
      button.on(Button.Events.Press, () => {
        this.initImages(
          item === String(CacheTypes["Disk Caching"]) ? CacheTypes["Disk Caching"] : item === String(CacheTypes["HTTP Caching"]) ? CacheTypes["HTTP Caching"] : CacheTypes["Memory Caching"]
        );
      });
      i++;
    }
    this.flOptions.applyLayout();
  }
  initImages(type: CacheTypes) {
    this.dialog.show();
    this.svMain.layout.removeAll();

    for (let i = 1; i <= imageOptions.count; i++) {
      const imageView = new StyleableImageView({
        width: Math.round(IMAGE_WIDTH),
        height: Math.round(IMAGE_WIDTH / (imageOptions.size.width / imageOptions.size.height)),
      });
      this.svMain.addChild(imageView, `image${i}`, ".sf-imageView #pgGlide-image");
      imageView.loadFromUrl({
        url: this.getImageEndpoint(i),
        useHTTPCacheControl: type === CacheTypes["HTTP Caching"],
        android: {
          useMemoryCache: type === CacheTypes["Memory Caching"],
          useDiskCache: type === CacheTypes["Disk Caching"],
        },
      });
    }
    this.layout.applyLayout();
    setTimeout(() => this.dialog.hide(), 500);
  }
  initDialog() {
    this.dialog = new Dialog({
      android: {
        themeStyle: Dialog.Android.Style.ThemeNoHeaderBar, // Show StatusBar
        // isTransparent: true,
        // cancelable: true
      },
    });
    this.dialog.layout.alignItems = FlexLayout.AlignItems.CENTER;
    this.dialog.layout.justifyContent = FlexLayout.JustifyContent.CENTER;

    this.activityIndicator = new StyleableActivityIndicator();
    this.dialog.layout.addChild(this.activityIndicator);
    this.dialog.layout.applyLayout();
  }
  getImageEndpoint(index: number) {
    return `https://picsum.photos/id/${index}/${imageOptions.size.width}/${imageOptions.size.height}`;
  }

  initNativeTypescriptTest() {
      // SCREEN TESTS
      console.log("Screen module test: ", {
          orientation: Screen.orientation,
          height: Screen.height,
          width: Screen.width,
          touchSupported: Screen.touchSupported,
          dpi: Screen.dpi,
          iosForceTouchAvaliable: Screen.ios.forceTouchAvaliable
      });
      const screenshot = Screen.capture();
      console.log(screenshot)

      //SYSTEM TESTS
        console.log("Device.System.OS: "                             + System.OS);
        console.log("Device.System.OSVersion: "                      + System.OSVersion);
        console.log("Device.System.batteryLevel: "                   + System.batteryLevel);
        console.log("Device.System.isBatteryCharged: "               + System.isBatteryCharged);
        console.log("Device.System.clipboard: "                      + System.clipboard);
        console.log("Device.System.language: "                       + System.language);
        console.log("Device.System.region: "                         + System.region);
        console.log("Device.System.vibrate(): "                      + System.vibrate({millisecond: 500}));
        console.log("Device.System.fingerPrintAvailable: "           + System.fingerPrintAvailable);
        console.log("Device.System.isEmulator: "                     + System.isEmulator);
        console.log("Device.System.biometricsAvailable: "            + System.biometricsAvailable);
        console.log("Device.System.biometricType: "                  + System.biometricType);
        if(System.OS === System.OSType.ANDROID) {
            console.log("Device.System.android.apiLevel: "               + System.android.apiLevel);
            console.log("Device.System.android.menuKeyAvaliable: "       + System.android.menuKeyAvaliable);
        }

        // HARDWARE TESTS
        console.log("Device.Hardware.UID: "        + Hardware.UID);
        console.log("Device.Hardware.brandName: "  + Hardware.brandName);
        console.log("Device.Hardware.brandModel: " + Hardware.brandModel);
        console.log("Device.Hardware.deviceType: "   + Hardware.deviceType);
        if(System.OS === System.OSType.ANDROID) {
            console.log("Device.Hardware.vendorID: "   + Hardware.android.vendorID);
        };
        if(System.OS === System.OSType.IOS) {
            console.log("Device.Hardware.ios.modelName: "   + Hardware.ios.modelName);
        };
        
        // Accelerometer TESTS
        Accelerometer.start();
        Accelerometer.on(Accelerometer.Events.Accelerate, (e) => {
            console.log("x: " + e.x + "  y : " + e.y + "  z : " + e.z);
            if (e.z > 9) {
                Accelerometer.stop();
            }
        })
        
  }

  onShow() {
    super.onShow();
  }

  onLoad() {
    super.onLoad();
    this.initButtons();
    this.initDialog();
    this.initNativeTypescriptTest();
  }
}


