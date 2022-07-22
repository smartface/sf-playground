import PgLocationManagmentDesign from 'generated/pages/pgLocationManagment';
import MapView from '@smartface/native/ui/mapview';
import { MapTypes, showMapsMenu, showNavigationMenu, TransportTypes } from '@smartface/extension-utils/lib/maps';
import { Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router } from '@smartface/router';
import Location from '@smartface/native/device/location';
import Permission from '@smartface/native/device/permission';
import Linking from '@smartface/native/global/linking';

const CURRENT_LOCATION = 'Current Location';

type LocationType = Awaited<ReturnType<typeof Location.getCurrentLocation>>;

/**
 * Testing location, maps, navigation, settings and locaiton permission
 */

export default class PgLocationManagment extends withDismissAndBackButton(PgLocationManagmentDesign) {
  location: LocationType;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initButtons() {
    this.btnGetLocation.onPress = async () => await this.getLocation();
    this.btnNavigate.onPress = () => this.navigateToLocation(this.location);
    this.btnLastKnownLocation.on('press', () => this.getLastKnownLocation());
    this.btnNavigate.enabled = false;
    this.btnOpenApplicationSettings.onPress = () => Linking.openSettings();
  }

  initLabels() {
    this.lblLatitude.text = '';
    this.lblLongitude.text = '';
  }

  async getLocation() {
    try {
      this.location = await Location.getCurrentLocation();
      console.info('Location is granted: ', this.location);
      const _location = this.location;
      this.setCoordinateText(_location);
      this.markLocation(_location);
      this.btnNavigate.enabled = true;
      alert('Touch the pin!');
    } catch (e) {
      console.warn('Location is denied: ', e);
    }
  }

  setCoordinateText(coordinate: LocationType) {
    const { latitude, longitude } = coordinate;
    this.lblLatitude.text = latitude.toFixed(10);
    this.lblLongitude.text = longitude.toFixed(10);
  }

  markLocation(location: LocationType) {
    this.mapView1.removeAllPins();
    const params = { location: { latitude: location.latitude, longitude: location.longitude }, title: CURRENT_LOCATION };
    const currentLocationPin = new MapView.Pin(params);
    currentLocationPin.onPress = () => this._showMapsMenu(location);
    this.mapView1.addPin(currentLocationPin);
    this.mapView1.setCenterLocationWithZoomLevel({ latitude: location.latitude, longitude: location.longitude }, 12, true);
  }

  getLastKnownLocation() {
    Permission.requestPermission('LOCATION').then(() => {
      Location.getLastKnownLocation(
        (e) => {
          alert('Last location: ' + e.latitude + ' ' + e.longitude);
        },
        () => alert('Could not get last known location')
      );
    });
  }

  _showMapsMenu(location: LocationType) {
    const page = this;
    showMapsMenu({
      page,
      mapOptions: {
        page,
        location: {
          latitude: location.latitude,
          longitude: location.longitude
        },
        name: CURRENT_LOCATION,
        locationName: '',
        mapType: MapTypes.GOOGLE_MAPS,
        isNavigation: false
      }
    });
  }

  navigateToLocation(location: LocationType) {
    const page = this;
    const options = {};
    showNavigationMenu({
      navigationOptions: {
        location: {
          latitude: location.latitude,
          longitude: location.longitude
        },
        transportType: TransportTypes.DRIVING
      },
      page
    });
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
    this.initButtons();
    this.initLabels();
  }
}
