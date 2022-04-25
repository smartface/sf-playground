import PgMapViewDesign from 'generated/pages/pgMapView';
import Pin from '@smartface/native/ui/mapview/pin';
import Menu from '@smartface/native/ui/menu';
import MenuItem from '@smartface/native/ui/menuitem';
import System from '@smartface/native/device/system';
import { Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router } from '@smartface/router';

const MAP_RANDOM_RANGE = 1;
const DEFAULT_ZOOM_LEVEL = 8;

interface MapPoint {
  lat: number;
  lng: number;
  title?: string;
  description?: string;
  phone?: string;
}

const CenterMapCoordinates: MapPoint = Object.freeze({
  description: '2nd Floor, 530 Lytton Ave, Palo Alto, CA 94301',
  lat: 37.4488259,
  lng: -122.1600047,
  title: 'Smartface Inc.'
});

enum MAPVIEW_CHOICES {
  RADIUS = 'Radius',
  FOUR_REGIONS = 'Four Regions'
}

export default class PgMapView extends withDismissAndBackButton(PgMapViewDesign) {
  menu: Menu = new Menu();
  allPins: Pin[] = this.generateMockMapData();
  addedPins: Pin[] = []; // This is for duplicate prevention
  currentMapViewStyle: MAPVIEW_CHOICES = null;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  generateMockMapData(): Pin[] {
    const randomizedArray = Array.from({ length: 50 }).map(() => {
      const randomized = this.randomizeCoordinates(CenterMapCoordinates);
      return new Pin({
        location: {
          latitude: randomized.lat,
          longitude: randomized.lng
        },
        title: randomized.title || ''
      });
    });
    return randomizedArray;
  }

  randomizeCoordinates(centerPoint: MapPoint): MapPoint {
    const randomLatitude = CenterMapCoordinates.lat + Randomize.randomSign() * Randomize.randomPositive(MAP_RANDOM_RANGE);
    const randomLongitude = CenterMapCoordinates.lng + Randomize.randomSign() * Randomize.randomPositive(MAP_RANDOM_RANGE);
    return {
      ...centerPoint,
      lat: randomLatitude,
      lng: randomLongitude
    };
  }

  initMapView() {
    this.map.setCenterLocationWithZoomLevel(
      {
        longitude: CenterMapCoordinates.lng,
        latitude: CenterMapCoordinates.lat
      },
      DEFAULT_ZOOM_LEVEL,
      true
    );
    this.map.onCameraMoveEnded = () => this.addPinsWithLazyLoad(this.currentMapViewStyle);
    this.map.minZoomLevel = DEFAULT_ZOOM_LEVEL - 1;
    this.map.maxZoomLevel = DEFAULT_ZOOM_LEVEL + 1;
  }

  initMenu() {
    this.menu.headerTitle = 'Choose method to fill the map';
    const radius = new MenuItem({ title: MAPVIEW_CHOICES.RADIUS });
    const fourRegions = new MenuItem({ title: MAPVIEW_CHOICES.FOUR_REGIONS });
    const cancel = new MenuItem({ title: 'Cancel' });
    cancel.ios.style = MenuItem.Styles.CANCEL;
    const menuItems = [radius, fourRegions];

    /**
     * For initializing onSelected calls dynamically
     */
    menuItems.forEach((item) => {
      item.onSelected = () => {
        // Fill the texts and select the style
        const currentSelection = item.title || 'Select a Style';
        this.currentMapViewStyle = item.title as MAPVIEW_CHOICES;
        this.lblCurrentSelection.text = currentSelection;

        // Empty the pins
        this.map.removeAllPins();
        this.addedPins = [];

        // Reset the camera location and zoom
        this.map.setCenterLocationWithZoomLevel(
          {
            latitude: CenterMapCoordinates.lat,
            longitude: CenterMapCoordinates.lng
          },
          DEFAULT_ZOOM_LEVEL,
          true
        );
      };
    });
    System.OS === System.OSType.IOS && menuItems.push(cancel); // Android doesn't need this
    this.menu.items = menuItems;
    this.flSelector.onTouchEnded = () => {
      this.menu.show(this);
      return true;
    };
  }

  addPinsWithLazyLoad(lazyLoadType: MAPVIEW_CHOICES) {
    if (lazyLoadType === MAPVIEW_CHOICES.RADIUS) {
      // First, get the current distance between center and the corner of the visible map
      const visibleRegions = this.map.visibleRegion;
      const bottomLeft: MapPoint = { lat: visibleRegions.bottomLeft.latitude, lng: visibleRegions.bottomLeft.longitude };
      const center: MapPoint = { lat: this.map.centerLocation.latitude, lng: this.map.centerLocation.longitude };
      const visibleDistance = this.getDistanceFromLatLonInKm(center, bottomLeft); //This variable is our 'radius'

      this.allPins.forEach((pin) => {
        if (this.checkForDuplicate(pin)) {
          return; // Do not add the current pin if it's already there
        }
        const pinPoint: MapPoint = { lat: pin.location.latitude, lng: pin.location.longitude };
        const currentDistance = this.getDistanceFromLatLonInKm(center, pinPoint);
        if (currentDistance <= visibleDistance) {
          this.map.addPin(pin); // Add the pin if inside of the current pin.
          this.addedPins.push(pin);
        }
      });
    } else if (lazyLoadType === MAPVIEW_CHOICES.FOUR_REGIONS) {
    }
  }
  checkForDuplicate(pin: Pin) {
    const doesCurrentPinAdded = this.addedPins.find((addedPin) => {
      return pin.location.latitude === addedPin.location.latitude && pin.location.longitude === addedPin.location.longitude;
    });
    return !!doesCurrentPinAdded;
  }
  /**
   * Use basic geometry to calculate if the pins are in the imaginary circle
   */
  getDistanceFromLatLonInKm(point1: MapPoint, point2: MapPoint): number {
    const deg2rad = (deg: number) => deg * (Math.PI / 180);
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(point2.lat - point1.lat); // deg2rad below
    const dLon = deg2rad(point2.lng - point1.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(point1.lat)) * Math.cos(deg2rad(point2.lng)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
    this.initMapView();
    this.initMenu();
  }
}

class Randomize {
  static randomSign(): number {
    return 10 * Math.random() >= 5 ? 1 : -1;
  }
  static randomPositive(maxNumber = 1): number {
    return Math.random() * maxNumber;
  }
}
