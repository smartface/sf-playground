import PgApplicationEventsDesign from 'generated/pages/pgApplicationEvents';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Application from '@smartface/native/application';
import System from '@smartface/native/device/system';
import { hideWaitDialog, showWaitDialog } from 'lib/LoadingIndicator';
import { getDogPicWithAxios } from '../services/dogPic'

export default class PgApplicationEvents extends withDismissAndBackButton(PgApplicationEventsDesign) {
    constructor(private router?: Router, private route?: Route) {
        super({});
    }

    initNativeTypescriptTest() {
        console.log('Application currentReleaseChannel test: ', Application.currentReleaseChannel);
        console.log('Application smartfaceAppName test: ', Application.smartfaceAppName);
        console.log('Application appName test: ', Application.appName);
        console.log('Application version test: ', Application.version);
        console.log('Application isVoiceOverEnabled test: ', Application.isVoiceOverEnabled);
        Application.keepScreenAwake = true;
        if (System.OS === System.OSType.IOS) {
            console.log('Application bundleIdentifier test: ', Application.ios.bundleIdentifier);
            console.log('Application userInterfaceLayoutDirection test: ', Application.ios.userInterfaceLayoutDirection);
        } else if (System.OS === System.OSType.ANDROID) {
            console.log('Application locale test: ', Application.android.locale);
            console.log('Application getLayoutDirection test: ', Application.android.getLayoutDirection);
            console.log('Application packageName test: ', Application.android.packageName);
            console.log('Application shouldShowRequestPermissionRationale test: ' + Application.android.shouldShowRequestPermissionRationale(Application.Android.Permissions.ACCESS_FINE_LOCATION));
        }
        console.log('Application canOpenUrl test: ', Application.canOpenUrl('whatsapp://'));
    }

    /**
     * @event onShow
     * This event is called when the page appears on the screen (everytime).
     */
    onShow() {
        super.onShow();
        this.initBackButton(this.router); //Addes a back button to the page headerbar.
        this.initNativeTypescriptTest();
    }

    /**
     * @event onLoad
     * This event is called once when the page is created.
     */
    onLoad() {
        super.onLoad();
        this.btnExit.on('press', () => {
            Application.exit();
        });
        this.btnRestart.on('press', async () => {
            showWaitDialog();
            await getDogPicWithAxios();
            hideWaitDialog();
            Application.restart();
        });
    }
}
