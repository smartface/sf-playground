import PgMapViewRadiusDesign from "generated/pages/pgMapViewRadius";
import MapView from "@smartface/native/ui/mapview";
import { Route } from "@smartface/router";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router } from "@smartface/router";
import Pin from "@smartface/native/ui/mapview/pin";


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
  description: "2nd Floor, 530 Lytton Ave, Palo Alto, CA 94301",
  lat: 37.4488259,
  lng: -122.1600047,
  title: "Smartface Inc.",
});

export default class PgMapViewRadius extends withDismissAndBackButton(PgMapViewRadiusDesign) {
  allPins: Pin[] = this.generateMockMapData();
  addedPins: Pin[] = []; // This is for duplicate prevention
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  generateMockMapData(): Pin[] {
    const randomizedArray = Array.from({ length: 50 }).map(() => {
      const randomized = this.randomizeCoordinates(CenterMapCoordinates);
      return new MapView.Pin({
        location: {
          latitude: randomized.lat,
          longitude: randomized.lng,
        },
        title: randomized.title || "",
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
      lng: randomLongitude,
    };
  }

  initMapView() {
    this.map.setCenterLocationWithZoomLevel(
      {
        longitude: CenterMapCoordinates.lng,
        latitude: CenterMapCoordinates.lat,
      },
      DEFAULT_ZOOM_LEVEL,
      true
    );
    this.map.onCameraMoveEnded = () => this.addPinsWithLazyLoad();
    this.map.minZoomLevel = DEFAULT_ZOOM_LEVEL - 1;
    this.map.maxZoomLevel = DEFAULT_ZOOM_LEVEL + 1;
  }

  addPinsWithLazyLoad() {
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
