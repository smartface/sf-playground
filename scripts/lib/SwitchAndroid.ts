import System from '@smartface/native/device/system';
import View from '@smartface/native/ui/view';

export default class SwitchAndroid extends View {
    constructor(params?: any) {
        super();
        if (System.OS === 'Android') {
            const AndroidConfig = require("@smartface/native/util/Android/androidconfig");
            const NativeSwitch = requireClass("android.widget.Switch");
            //@ts-ignore
            this.nativeObject = new NativeSwitch(AndroidConfig.activity);
        }
        // Assign parameters given in constructor
        if (params) {
            for (const param in params) {
                this[param] = params[param];
            }
        }
    }
    get toggle(): boolean {
        return this.nativeObject.isChecked();
    }
    set toggle(toggle: boolean) {
        this.nativeObject.setChecked(toggle);
    }
}