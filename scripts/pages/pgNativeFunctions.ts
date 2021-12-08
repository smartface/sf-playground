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
        onSuccess: () => {
          alert("URL Opened");
        },
        onFailure: (e) => {
          alert("URL couldn't open");
          alert(JSON.stringify(e));
        },
      });
    });
    this.btnCanOpen.on(Button.Events.Press, () => {
      const canOpen = Linking.canOpenURL(url);
      alert("Can Open URL: " + canOpen);
    });
    this.btnOpenSettings.on(Button.Events.Press, () => {
      Linking.openSettings()
        .then(() => alert("Settings opened"))
        .catch(() => alert("Settings couldn't open"));
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
        .then((res) => alert("Permission Success: " + res))
        .catch((err) => alert("Permission failed " + JSON.stringify(err)));
    });
    this.btnLocationPermission.on(Button.Events.Press, () => {
      Permission.getPermission({
        permissionTitle: "Hey! I want your Location permission",
        permissionText: "Keep and Calm! I will use your location for test only",
        iosPermission: Permission.IOS_PERMISSIONS.LOCATION,
        androidPermission: Application.Android.Permissions.ACCESS_FINE_LOCATION,
        showSettingsAlert: true,
      })
        .then((res) => alert("Permission Success: " + res))
        .catch((err) => alert("Permission failed " + JSON.stringify(err)));
    });
  }
  initLocation() {
    this.btnGetLocation.on(Button.Events.Press, () => {
      Location.getLocation()
        .then((res) => alert("Location Success: " + res))
        .catch((err) => alert("Location failed " + JSON.stringify(err)));
    });
  }
  initNetwork() {
    this.btnCheckConnected.on(Button.Events.Press, () => {
      Network.isConnected()
        .then((res) => alert("Is connected: " + res))
        .catch((err) => alert("Is Connected failed " + JSON.stringify(err)));
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
