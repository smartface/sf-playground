import PgMapViewDesign from 'generated/pages/pgMapView';
import MapView from '@smartface/native/ui/mapview';
import Menu from '@smartface/native/ui/menu';
import MenuItem from '@smartface/native/ui/menuitem';
import System from '@smartface/native/device/system';

const MAP_RANDOM_RANGE = 2;

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

export default class PgMapView extends PgMapViewDesign {
    menu: Menu = new Menu();
	constructor() {
		super();
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
	}
    generateMockMapData(): MapView.Pin[] {
        return Array(50).map(() => {
            const randomized = this.randomizeCoordinates(CenterMapCoordinates);
            return new MapView.Pin({
                location: {
                    latitude: randomized.lat,
                    longitude: randomized.lng,
                },
                title: randomized.title || ''
            })
        });
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
        }, 11, true);
    }

    initMenu() {
        this.menu.headerTitle = 'Choose method to fill the map';
        const withoutCluster = new MenuItem({ title: 'Without Cluster' });
        const withCluster = new MenuItem({ title: 'With Cluster' });
        const withoutClusterLazyLoad = new MenuItem( {title: 'Without Cluster and Lazy Load' });
        const withClusterLazyLoad = new MenuItem({ title: 'With Cluster and Lazy Load' });
        const cancel = new MenuItem({ title: 'Cancel' });
        cancel.ios.style = MenuItem.ios.Style.CANCEL;

        withoutCluster.onSelected = () => {
            this.map.removeAllPins();
            const pins = this.generateMockMapData();
            pins.forEach((pin) => this.map.addPin(pin));
        };

        const menuItems = [withoutCluster, withCluster, withoutClusterLazyLoad, withClusterLazyLoad];
        System.OS === System.OSType.IOS && menuItems.push(cancel); // Android doesn't need this
        this.menu.items = menuItems;
        this.flSelector.onTouchEnded = () => this.menu.show(this);
    }
}

function onShow(this: PgMapView, superOnShow: () => void) {
	superOnShow();
}

function onLoad(this: PgMapView, superOnLoad: () => void) {
	superOnLoad();
    this.initMapView();
    this.initMenu();
}

class Randomize {
    static randomSign(): number {
        return (10 * Math.random()) >= 5 ? 1 : -1;
    }
    static randomPositive(maxNumber = 1): number {
        return Math.random() * maxNumber;
    }
}