import PgMapRegionDesign from 'generated/pages/pgMapRegion';
import Color from '@smartface/native/ui/color';
import Font from '@smartface/native/ui/font';
import MapView from '@smartface/native/ui/mapview';

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
            const regions = this.mapView1.visibleRegion;
            const topLeftPin = new MapView.Pin({
                location: regions.topLeft,
                title: "TopLeft"
            });
            const topRightPin = new MapView.Pin({
                location: regions.topRight,
                title: "TopRight"
            });
            const bottomLeftPin = new MapView.Pin({
                location: regions.bottomLeft,
                title: "BottomLeft"
            });
            const bottomRightPin = new MapView.Pin({
                location: regions.bottomRight,
                title: "BottomRight"
            });
            this.mapView1.addPin(topLeftPin);
            this.mapView1.addPin(topRightPin);
            this.mapView1.addPin(bottomLeftPin);
            this.mapView1.addPin(bottomRightPin);
        }
        // this.mapView1.clusterEnabled = true;
        this.mapView1.clusterFillColor = Color.RED;
        this.mapView1.clusterBorderColor = Color.WHITE;
        this.mapView1.ios.clusterBorderWidth = 3;
        this.mapView1.clusterTextColor = Color.WHITE;
        this.mapView1.clusterFont = Font.create(Font.DEFAULT, 20, Font.BOLD);
        this.mapView1.ios.clusterPadding = 15;

        //@ts-ignore
        this.mapView1.onClusterPress = (pins: MapView.Pin[]) => {
            // var centerLocation = this.averageGeolocation(pins);
            // this.mapView1.setCenterLocationWithZoomLevel(centerLocation, 12, true);
        };
        this.mapView1.onCameraMoveStarted = () => {
            console.info(this.mapView1.visibleRegion);
        }
        // this.mapView1.android.prepareMap();
    }
}

function onShow(superOnShow: () => void) {
    superOnShow();
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initMapView();
}
