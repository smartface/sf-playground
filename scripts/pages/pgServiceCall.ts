import PgServiceCallDesign from 'generated/pages/pgServiceCall';
import network from "@smartface/extension-utils/lib/network";
import isEmulator from "@smartface/extension-utils/lib/isEmulator";
import removeClassName from '@smartface/contx/lib/styling/action/removeClassName';
import { pushClassNames } from '@smartface/contx/lib/styling';
import { getDogPic, dogApiData } from "services/dogPic";
import { OfflineRequestServiceCall, OfflineResponseServiceCall } from "@smartface/extension-utils/lib/service-call-offline";

export default class PgServiceCall extends PgServiceCallDesign {
    isConnected: boolean;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.btnRequest.onPress = async () => {
            this.checkAndSetNetworkStatus();
            try {
                if (this.isConnected) {
                    // Use normal service call when user connected to internet
                    const response: dogApiData = await getDogPic();
                    this.imgDogPic.loadFromUrl({ url: response.message });
                }
                else {
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
        }
    }

    initIsEmulatorCheck() {
        if (isEmulator()) {
            this.lblIsEmulator.text = "Running on emulator environment";
        }
        else {
            this.lblIsEmulator.text = "Running on production environment";
        }
    }

    checkAndSetNetworkStatus() {
        network.isConnected()
            .then(() => {
                this.lblNetworkStatus.text = "Connected to internet";
                this.lblNetworkStatus.dispatch(pushClassNames("#pgServiceCall-lblNetworkStatus-online"));
                this.isConnected = true;
            })
            .catch(() => {
                this.lblNetworkStatus.text = "Not connected to internet";
                this.lblNetworkStatus.dispatch(removeClassName("#pgServiceCall-lblNetworkStatus-online"));
                this.isConnected = false;
            })
    }


}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow: () => void) {
    superOnShow();

}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initIsEmulatorCheck();
    this.checkAndSetNetworkStatus();
}
