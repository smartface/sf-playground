import PgNativeFunctionsDesign from 'generated/pages/pgNativeFunctions';
import { Router, Route } from '@smartface/router';
import Button from '@smartface/native/ui/button';
import Linking from '@smartface/native/global/linking';
import Permission from '@smartface/native/device/permission';
import Application from '@smartface/native/application';
import Location from '@smartface/native/device/location';
import Network from '@smartface/native/device/network';
import { showMapsMenu, MapTypes, TransportTypes, showNavigationMenu } from '@smartface/extension-utils/lib/maps';

export default class PgNativeFunctions extends PgNativeFunctionsDesign {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  initLinking() {
    const url = 'tg://';
    this.btnOpenUrl.on('press', () => {
      Linking.openURL({
        uriScheme: url,
        onSuccess: () => {
          alert('URL Opened');
        },
        onFailure: (e) => {
          alert("URL couldn't open");
          // alert(JSON.stringify(e));
        }
      });
    });
    this.btnCanOpen.on('press', () => {
      const canOpen = Linking.canOpenURL(url);
      alert('Can Open URL: ' + canOpen);
    });
    this.btnOpenSettings.on('press', () => {
      Linking.openSettings()
        .then(() => alert('Settings opened'))
        .catch(() => alert("Settings couldn't open"));
    });
  }
  initPermission() {
    this.btnCameraPermission.on('press', () => {
      Permission.requestPermission('CAMERA')
        .then((res) => alert('Permission Success: ' + res))
        .catch((err) => {
          alert({
            title: 'Hey! I want your Camera permission',
            message: 'Keep and Calm! I will use your camera for testing purposes only'
          });
          console.error('Permission failed ' + JSON.stringify(err));
        });
    });
    this.btnLocationPermission.on('press', () => {
      Permission.requestPermission('LOCATION')
        .then((res) => alert('Permission Success: ' + res))
        .catch((err) => {
          alert({
            title: 'Hey! I want your Location permission',
            message: 'Keep and Calm! I will use your location for testing purposes only'
          });
          console.error('Permission failed ' + JSON.stringify(err));
        });
    });
  }
  initLocation() {
    this.btnGetLocation.on('press', () => {
      Location.getCurrentLocation()
        .then((res) => alert('Location Success: ' + res))
        .catch((err) => alert('Location failed ' + JSON.stringify(err)));
    });
  }
  initNetwork() {
    this.btnCheckConnected.on('press', () => {
      Network.isConnected()
        .then((res) => alert('Is connected: ' + res))
        .catch((err) => alert('Is Connected failed ' + JSON.stringify(err)));
    });
  }
  initMaps() {
    this.btnOpenMaps.on('press', () => {
       showMapsMenu({
         mapOptions: {
           isNavigation: false,
           locationName: '',
           mapType: MapTypes.GOOGLE_MAPS,
           name: 'Smartface Inc.',
           location: {
             latitude: 37.4488259,
             longitude: -122.1600047
           },
           page:this
         },
         page: this
       })
         .then(() => alert('Maps opened'))
         .catch(() => alert('Maps failed'));
    });
    this.btnOpenNavigation.on('press', () => {
      showNavigationMenu({
        navigationOptions: {
          mapType: MapTypes.GOOGLE_MAPS,
          location: {
            latitude: 37.4488259,
            longitude: -122.1600047
          },
          transportType: TransportTypes.WALKING,
          name: 'Smartface Inc.'
        },
        page: this
      })
        .then(() => alert('Navigation opened'))
        .catch(() => alert('Navigation failed'));
    });
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
