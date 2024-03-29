import PgServiceCallDesign from 'generated/pages/pgServiceCall';
import { getDogPic, dogApiData, getDogPicWithAxios } from 'services/dogPic';
import Network from '@smartface/native/device/network';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import System from '@smartface/native/device/system';
import Permission from '@smartface/native/device/permission';
import { Permissions } from '@smartface/native/device/permission/permission';

export default class PgServiceCall extends withDismissAndBackButton(PgServiceCallDesign) {
  isConnected: boolean;
  constructor(private router?: Router, private route?: Route) {
    super({});

    this.btnUseServiceCall.onPress = async () => {
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
        alert('Service unavailable');
      }
    };
    this.btnUseAxios.onPress = async () => {
      this.checkAndSetNetworkStatus();
      try {
        if (this.isConnected) {
          const response: dogApiData = await getDogPicWithAxios();
          this.imgDogPic.loadFromUrl({ url: response.message });
        }
      } catch (err) {
        alert('Service unavailable');
      }
    };
  }

  initIsEmulatorCheck() {
    if (System.isEmulator) {
      this.lblIsEmulator.text = 'Running on emulator environment';
    } else {
      this.lblIsEmulator.text = 'Running on production environment';
    }
  }

  checkAndSetNetworkStatus() {
    Network.isConnected()
      .then(() => {
        this.lblNetworkStatus.text = 'Connected to internet';
        this.lblNetworkStatus.style.addClass('#pgServiceCall-lblNetworkStatus-online');
        this.isConnected = true;
      })
      .catch(() => {
        this.lblNetworkStatus.text = 'Not connected to internet';
        this.lblNetworkStatus.style.removeClass('#pgServiceCall-lblNetworkStatus-online');
        this.isConnected = false;
      });
  }

  initNativeTypescriptTest() {
    console.log('Network carrier test: ', Network.carrier);
    console.log('Network connectionIP test: ', Network.connectionIP);
    console.log('Network SMSEnabled test: ', Network.SMSEnabled);
    try {
    console.log('Network IMSI test: ', Network.IMSI);
    } catch (error) {
        console.log("Works on Android 10 and below")
    }
    if( System.OS === System.OSType.IOS || (System.OS === System.OSType.ANDROID && Permission.android.checkPermission(Permissions.ANDROID.BLUETOOTH_CONNECT))){
        console.log('Network bluetoothMacAddress test: ', Network.bluetoothMacAddress);
    }
    console.log('Network wirelessMacAddress test: ', Network.wirelessMacAddress);
    console.log('Network roamingEnabled test: ', Network.roamingEnabled);
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
    this.initIsEmulatorCheck();
    this.checkAndSetNetworkStatus();
    const notifier = Network.notifier;

    notifier.subscribe((connectionType) => {
      this.checkAndSetNetworkStatus();
    });
    this.initNativeTypescriptTest();
  }
}
