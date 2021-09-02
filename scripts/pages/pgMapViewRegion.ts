import PgMapViewRegionDesign from 'generated/pages/pgMapViewRegion';
import MapView from '@smartface/native/ui/mapview';

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

export default class PgMapViewRegion extends PgMapViewRegionDesign {
    allPins: MapView.Pin[] = this.generateMockMapData();
    addedPins: MapView.Pin[] = []; // This is for duplicate prevention
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    generateMockMapData(): MapView.Pin[] {
        const randomizedArray = Array.from({ length: 50 }).map(() => {
            const randomized = this.randomizeCoordinates(CenterMapCoordinates);
            return new MapView.Pin({
                location: {
                    latitude: randomized.lat,
                    longitude: randomized.lng,
                },
                title: randomized.title || ''
            });
        });
        return randomizedArray;
    }

    randomizeCoordinates(centerPoint: MapPoint): MapPoint {
        const randomLatitude = CenterMapCoordinates.lat + (Randomize.randomSign() * Randomize.randomPositive(MAP_RANDOM_RANGE));
        const randomLongitude = CenterMapCoordinates.lng + (Randomize.randomSign() * Randomize.randomPositive(MAP_RANDOM_RANGE));
        return {
            ...centerPoint,
            lat: randomLatitude,
            lng: randomLongitude
        }
    }

    initMapView() {
        this.map.setCenterLocationWithZoomLevel({
            longitude: CenterMapCoordinates.lng,
            latitude: CenterMapCoordinates.lat
        }, DEFAULT_ZOOM_LEVEL, true);
        this.map.onCameraMoveEnded = () => this.addPinsWithLazyLoad();
        this.map.minZoomLevel = DEFAULT_ZOOM_LEVEL - 1;
        this.map.maxZoomLevel = DEFAULT_ZOOM_LEVEL + 1;
    }

    addPinsWithLazyLoad() {
        this.allPins.forEach((pin) => {
            if (this.checkForDuplicate(pin)) {
                return; // Do not add the current pin if it's already there
            }
            if (this.checkIfInsideRegion(pin)) {
                this.map.addPin(pin); // Add the pin if inside of the current pin.
                this.addedPins.push(pin);
            }
        });
    }
    checkForDuplicate(pin: MapView.Pin): boolean {
        const doesCurrentPinAdded = this.addedPins.find((addedPin) => {
            return pin.location.latitude === addedPin.location.latitude && pin.location.longitude === addedPin.location.longitude
        });
        return !!doesCurrentPinAdded;
    }

    checkIfInsideRegion(pin: MapView.Pin): boolean {
        const xCoordinateLower = this.map.visibleRegion.bottomLeft.latitude;
        const xCoordinateHigher = this.map.visibleRegion.topRight.latitude;
        const yCoordinateLower = this.map.visibleRegion.bottomLeft.longitude;
        const yCoordinateHigher = this.map.visibleRegion.topRight.longitude;

        const isLatInside = pin.location.latitude >= xCoordinateLower && pin.location.latitude <= xCoordinateHigher;
        const isLngInside = pin.location.longitude >= yCoordinateLower && pin.location.longitude <= yCoordinateHigher;

        console.info({
            xCoordinateHigher,
            xCoordinateLower,
            yCoordinateHigher,
            yCoordinateLower,
            pinLatitude: pin.location.latitude,
            pinLongitude: pin.location.longitude,
            isLatInside,
            isLngInside
        })
        return isLatInside && isLngInside;
    }
}

function onShow(this: PgMapViewRegion, superOnShow: () => void) {
    superOnShow();
}

function onLoad(this: PgMapViewRegion, superOnLoad: () => void) {
    superOnLoad();
    this.initMapView();
}

class Randomize {
    static randomSign(): number {
        return (10 * Math.random()) >= 5 ? 1 : -1;
    }
    static randomPositive(maxNumber = 1): number {
        return Math.random() * maxNumber;
    }
}