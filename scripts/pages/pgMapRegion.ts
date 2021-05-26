import PgMapRegionDesign from 'generated/pages/pgMapRegion';
import Color from 'sf-core/ui/color';
import Font from 'sf-core/ui/font';
import MapView from 'sf-core/ui/mapview';

export default class PgMapRegion extends PgMapRegionDesign {
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initMapView() {
        this.mapView1.onCreate = () => {
            const centerLocation = {
                latitude: 37.4488259,
                longitude: -122.1600047
            };
            this.mapView1.setCenterLocationWithZoomLevel(centerLocation, 12, false);

            for (let i = 0; i < 10; i++) {
                const myPin = new MapView.Pin({
                    location: {
                        latitude: 37.4488259 + i * 0.01,
                        longitude: -122.1600047
                    },
                    title: 'Title ' + i,
                    //@ts-ignore
                    subtitle: 'Subtitle',
                    color: Color.RED
                });
                myPin.onPress = () => {
                    console.info("Title : ", myPin.title);
                };
                this.mapView1.addPin(myPin);
            }
        }
        this.mapView1.clusterEnabled = true;
        this.mapView1.clusterFillColor = Color.RED;
        this.mapView1.clusterBorderColor = Color.WHITE;
        this.mapView1.ios.clusterBorderWidth = 3;
        this.mapView1.clusterTextColor = Color.WHITE;
        this.mapView1.clusterFont = Font.create(Font.DEFAULT, 20, Font.BOLD);
        this.mapView1.ios.clusterPadding = 15;

        //@ts-ignore
        this.mapView1.onClusterPress = (pins: MapView.Pin[]) => {
            var centerLocation = this.averageGeolocation(pins);
            this.mapView1.setCenterLocationWithZoomLevel(centerLocation, 12, true);
        };
        console.info(this.mapView1.visibleRegion);
    }

    averageGeolocation(pins: MapView.Pin[]): { latitude: number, longitude: number } {
        if (pins.length === 1) {
            return pins[0].location;
        }
        let x = 0.0;
        let y = 0.0;
        let z = 0.0;

        pins.forEach((pin) => {
            let latitude = pin.location.latitude * Math.PI / 180;
            let longitude = pin.location.longitude * Math.PI / 180;

            x += Math.cos(latitude) * Math.cos(longitude);
            y += Math.cos(latitude) * Math.sin(longitude);
            z += Math.sin(latitude);

        });

        const total = pins.length;

        x = x / total;
        y = y / total;
        z = z / total;

        const centralLongitude = Math.atan2(y, x);
        const centralSquareRoot = Math.sqrt(x * x + y * y);
        const centralLatitude = Math.atan2(z, centralSquareRoot);

        return {
            latitude: centralLatitude * 180 / Math.PI,
            longitude: centralLongitude * 180 / Math.PI
        };
    }
}

function onShow(superOnShow: () => void) {
    superOnShow();
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initMapView();
}
