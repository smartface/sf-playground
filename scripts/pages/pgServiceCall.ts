import PgServiceCallDesign from "generated/pages/pgServiceCall";
import network from "@smartface/extension-utils/lib/network";
import isEmulator from "@smartface/extension-utils/lib/isEmulator";
import removeClassName from "@smartface/contx/lib/styling/action/removeClassName";
import { pushClassNames } from "@smartface/contx/lib/styling";
import { getDogPic, dogApiData } from "services/dogPic";
import Network from "@smartface/native/device/network";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router, Route } from "@smartface/router";
import { backButtonImage } from "lib/constants/style";

export default class PgServiceCall extends withDismissAndBackButton(PgServiceCallDesign) {
  isConnected: boolean;
  constructor(private router?: Router, private route?: Route) {
    super({});

    this.btnRequest.onPress = async () => {
      this.checkAndSetNetworkStatus();
      try {
        if (this.isConnected) {
          // Use normal service call when user connected to internet
          const response: dogApiData = await getDogPic();
          this.imgDogPic.loadFromUrl({ url: response.message });
        } else {
          // Use service call offline when user not connected to internet
          /*const scOffline = new OfflineRequestServiceCall({
                        baseUrl: "https://dog.ceo",
                        logEnabled: true,
                        offlineRequestHandler: () => {
                            return scOffline.request('/api/breeds/image/random', {
                                method: "GET"
                            })
                        }
                    })*/
        }
      } catch (err) {
        alert("Service unavailable");
      }
    };
  }

  initIsEmulatorCheck() {
    if (isEmulator()) {
      this.lblIsEmulator.text = "Running on emulator environment";
    } else {
      this.lblIsEmulator.text = "Running on production environment";
    }
  }

  checkAndSetNetworkStatus() {
    network
      .isConnected()
      .then(() => {
        this.lblNetworkStatus.text = "Connected to internet";
        this.lblNetworkStatus.dispatch(pushClassNames("#pgServiceCall-lblNetworkStatus-online"));
        this.isConnected = true;
      })
      .catch(() => {
        this.lblNetworkStatus.text = "Not connected to internet";
        this.lblNetworkStatus.dispatch(removeClassName("#pgServiceCall-lblNetworkStatus-online"));
        this.isConnected = false;
      });
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router, {
      image: backButtonImage,
    });
  }

  onLoad() {
    super.onLoad();
    this.initIsEmulatorCheck();
    this.checkAndSetNetworkStatus();
    //@ts-ignore
    const notifier = new Network.createNotifier();

    //@ts-ignore
    notifier.subscribe((connectionType) => {
      this.checkAndSetNetworkStatus();
    });
  }
}
