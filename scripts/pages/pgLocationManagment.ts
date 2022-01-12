import PgLocationManagmentDesign from "generated/pages/pgLocationManagment";
import MapView from "@smartface/native/ui/mapview";
import location from "@smartface/extension-utils/lib/location";
import { showMapsMenu } from "@smartface/extension-utils/lib/maps";
import { showNavigationMenu } from "@smartface/extension-utils/lib/navigation";
import { openApplicationSettings } from "@smartface/extension-utils/lib/settings";
import { Route } from "@smartface/router";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router } from "@smartface/router";
import { backButtonImage } from "lib/constants/style";

const CURRENT_LOCATION = "Current Location";
type Location = { latitude: number; longitude: number };

/**
 * Testing location, maps, navigation, settings and locaiton permission
 */

export default class PgLocationManagment extends withDismissAndBackButton(PgLocationManagmentDesign) {
  location: Location;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initButtons() {
    this.btnGetLocation.onPress = async () => await this.getLocation();
    this.btnNavigate.onPress = () => this.navigateToLocation(this.location);
    this.btnNavigate.enabled = false;
    this.btnOpenApplicationSettings.onPress = () => openApplicationSettings();
  }

  initLabels() {
    this.lblLatitude.text = "";
    this.lblLongitude.text = "";
  }

  async getLocation() {
    this.location = await location.getLocation();
    const _location = this.location;
    this.setCoordinateText(_location);
    this.markLocation(_location);
    this.btnNavigate.enabled = true;
    alert("Touch the pin!");
  }

  setCoordinateText(coordinate: Location) {
    const { latitude, longitude } = coordinate;
    this.lblLatitude.text = latitude.toFixed(10);
    this.lblLongitude.text = longitude.toFixed(10);
  }

  markLocation(location: Location) {
    this.mapView1.removeAllPins();
    const params = { location, title: CURRENT_LOCATION };
    const currentLocationPin = new MapView.Pin(params);
    currentLocationPin.onPress = () => this._showMapsMenu(location);
    this.mapView1.addPin(currentLocationPin);
    this.mapView1.setCenterLocationWithZoomLevel(location, 12, true);
  }

  _showMapsMenu(location: Location) {
    const page = this;
    const options = {
      page,
      location,
      name: CURRENT_LOCATION,
    };
    showMapsMenu(options);
  }

  navigateToLocation(location: Location) {
    const page = this;
    const options = {
      page,
      location,
      transportType: "d",
    };
    showNavigationMenu(options);
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
