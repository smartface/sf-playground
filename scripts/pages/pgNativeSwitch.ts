import PgNativeSwitchDesign from 'generated/pages/pgNativeSwitch';
import SwitchAndroid from 'lib/SwitchAndroid';
import SwitchIOS from 'lib/SwitchIOS';
import System from '@smartface/native/device/system';

export default class PgNativeSwitch extends PgNativeSwitchDesign {
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    initAndroidSwitch() {
        const nativeSwitch = System.OS === 'iOS' ? new SwitchIOS() : new SwitchAndroid();
        //@ts-ignore
        this.addChild(nativeSwitch, "switchIOS");
    }
}

function onShow(this: PgNativeSwitch, superOnShow: () => void) {
    superOnShow();
}

function onLoad(this: PgNativeSwitch, superOnLoad: () => void) {
    superOnLoad();
    this.initAndroidSwitch()
}
