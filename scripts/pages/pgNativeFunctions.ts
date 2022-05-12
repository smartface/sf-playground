import PgNativeFunctionsDesign from 'generated/pages/pgNativeFunctions';
import { Router, Route } from '@smartface/router';
import Button from '@smartface/native/ui/button';
// import Linking from "@smartface/native/application/linking";
// import Permission from "@smartface/native/device/permission";
import Application from '@smartface/native/application';
import Location from '@smartface/native/device/location';
import Network from '@smartface/native/device/network';
// import "@smartface/native/core/base";
// import { openMaps, openNavigation } from "@smartface/native/application/maps";
// import { TransportTypes } from "@smartface/native/application/linking/shared/map";

export default class PgNativeFunctions extends PgNativeFunctionsDesign {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  initLinking() {
    // const url = "tg://";
    // this.btnOpenUrl.on(Button.Events.Press, () => {
    //   Linking.openURL({
    //     uriScheme: url,
    //     onSuccess: () => {
    //       alert("URL Opened");
    //     },
    //     onFailure: (e) => {
    //       alert("URL couldn't open");
    //       alert(JSON.stringify(e));
    //     },
    //   });
    // });
    // this.btnCanOpen.on(Button.Events.Press, () => {
    //   const canOpen = Linking.canOpenURL(url);
    //   alert("Can Open URL: " + canOpen);
    // });
    // this.btnOpenSettings.on(Button.Events.Press, () => {
    //   Linking.openSettings()
    //     .then(() => alert("Settings opened"))
    //     .catch(() => alert("Settings couldn't open"));
    // });
  }
  initPermission() {
    // this.btnCameraPermission.on(Button.Events.Press, () => {
    //   Permission.getPermission({
    //     permissionTitle: "Hey! I want your Camera permission",
    //     permissionText: "Keep and Calm! I will use your camera for test only",
    //     iosPermission: Permission.IOS_PERMISSIONS.CAMERA,
    //     androidPermission: Application.Android.Permissions.CAMERA,
    //     showSettingsAlert: true,
    //   })
    //     .then((res) => alert("Permission Success: " + res))
    //     .catch((err) => alert("Permission failed " + JSON.stringify(err)));
    // });
    // this.btnLocationPermission.on(Button.Events.Press, () => {
    //   Permission.getPermission({
    //     permissionTitle: "Hey! I want your Location permission",
    //     permissionText: "Keep and Calm! I will use your location for test only",
    //     iosPermission: Permission.IOS_PERMISSIONS.LOCATION,
    //     androidPermission: Application.Android.Permissions.ACCESS_FINE_LOCATION,
    //     showSettingsAlert: true,
    //   })
    //     .then((res) => alert("Permission Success: " + res))
    //     .catch((err) => alert("Permission failed " + JSON.stringify(err)));
    // });
  }
  initLocation() {
    // this.btnGetLocation.on(Button.Events.Press, () => {
    //   Location.getLocation()
    //     .then((res) => alert("Location Success: " + res))
    //     .catch((err) => alert("Location failed " + JSON.stringify(err)));
    // });
  }
  initNetwork() {
    // this.btnCheckConnected.on(Button.Events.Press, () => {
    //   Network.isConnected()
    //     .then((res) => alert("Is connected: " + res))
    //     .catch((err) => alert("Is Connected failed " + JSON.stringify(err)));
    // });
  }
  initMaps() {
    // this.btnOpenMaps.on(Button.Events.Press, () => {
    //   openMaps({
    //     mapType: "GOOGLE_MAPS",
    //     name: "Smartface Inc.",
    //     location: {
    //       latitude: 37.4488259,
    //       longitude: -122.1600047,
    //     },
    //   })
    //     .then(() => alert("Maps opened"))
    //     .catch(() => alert("Maps failed"));
    // });
    // this.btnOpenNavigation.on(Button.Events.Press, () => {
    //   openNavigation({
    //     mapType: "YANDEX_MAPS",
    //     name: "Smartface Inc.",
    //     location: {
    //       latitude: 37.4488259,
    //       longitude: -122.1600047,
    //     },
    //     transportType: TransportTypes.WALKING,
    //   })
    //     .then(() => alert("Navigation opened"))
    //     .catch(() => alert("Navigation failed"));
    // });
  }

  onShow() {
    super.onShow();
  }

  onLoad() {
    super.onLoad();
    this.initLinking();
    this.initPermission();
    this.initLocation();
    this.initNetwork();
    this.initMaps();
  }
}
