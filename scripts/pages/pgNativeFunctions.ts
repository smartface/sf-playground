import PgNativeFunctionsDesign from "generated/pages/pgNativeFunctions";
import Button from "@smartface/native/ui/button";

import Linking from "@smartface/native/application/linking";
import Permission from "@smartface/native/device/permission";
import Application from "@smartface/native/application";
import Location from "@smartface/native/device/location";
import Network from "@smartface/native/device/network";
import NetworkIOS from "@smartface/native/device/network/network-iOS";
import "@smartface/native/core/base";

export default class PgNativeFunctions extends PgNativeFunctionsDesign {
  constructor() {
    super();
    // Overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // Overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
  }
  initLinking() {
    const url = "tg://";
    this.btnOpenUrl.on(Button.Events.Press, () => {
      Linking.openURL({
        uriScheme: url,
        onSuccess: (value) => console.info("openURL: ", value),
        onFailure: (value) => console.error("openURLErr: ", value),
      });
    });
    this.btnCanOpen.on(Button.Events.Press, () => {
      const canOpen = Linking.canOpenURL(url);
      console.info("canOpenUrl: ", canOpen);
    });
    this.btnOpenSettings.on(Button.Events.Press, () => {
      Linking.openSettings()
        .then(() => console.info("openSettings"))
        .catch((err) => console.error("openSettingsErr: ", err));
    });
  }
  initPermission() {
    this.btnCameraPermission.on(Button.Events.Press, () => {
      Permission.getPermission({
        permissionTitle: "Hey! I want your Camera permission",
        permissionText: "Keep and Calm! I will use your camera for test only",
        iosPermission: Permission.IOS_PERMISSIONS.CAMERA,
        androidPermission: Application.Android.Permissions.CAMERA,
        showSettingsAlert: true,
      })
        .then((res) => console.info("cameraPermission: ", res))
        .catch((err) => console.error("cameraPermissionErr: ", err));
    });
    this.btnLocationPermission.on(Button.Events.Press, () => {
      Permission.getPermission({
        permissionTitle: "Hey! I want your Location permission",
        permissionText: "Keep and Calm! I will use your location for test only",
        iosPermission: Permission.IOS_PERMISSIONS.LOCATION,
        androidPermission: Application.Android.Permissions.ACCESS_FINE_LOCATION,
        showSettingsAlert: true,
      })
        .then((res) => console.info("locationPermission: ", res))
        .catch((err) => console.error("locationPermissionErr: ", err));
    });
  }
  initLocation() {
    this.btnGetLocation.on(Button.Events.Press, () => {
      Location.getLocation().then(console.info).catch(console.error);
    });
  }
  initNetwork() {
    this.btnCheckConnected.on(Button.Events.Press, () => {
      Network.isConnected().then(console.info).catch(console.error);
    });
  }
}

function onShow(superOnShow: () => void) {
  superOnShow();
}

function onLoad(this: PgNativeFunctions, superOnLoad: () => void) {
  superOnLoad();
  this.initLinking();
  this.initPermission();
  this.initLocation();
  this.initNetwork();
}
