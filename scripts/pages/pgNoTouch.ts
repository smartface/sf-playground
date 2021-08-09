import PgNoTouchDesign from 'generated/pages/pgNoTouch';
import System from '@smartface/native/device/system';

export default class PgNoTouch extends PgNoTouchDesign {
    isPageTouchEnabled = true;
    touchCounter = 0;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    async yourServiceCall(): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 3000);
        })
    }

    initButtons() {
        this.btnTimeout.onPress = async () => {
            this.togglePageTouch(false);
            await this.yourServiceCall();
            this.togglePageTouch(true);
        }
        this.btnCounter.onPress = () => {
            this.touchCounter++;
            this.btnCounter.text = `Touch Counter : ${this.touchCounter}`;
        }
    }

    togglePageTouch(touchEnabled: boolean) {
        this.isPageTouchEnabled = touchEnabled;
        this.btnTimeout.enabled = this.isPageTouchEnabled;
        this.lblTouchIndicator.text = `Current Touch Status : ${this.isPageTouchEnabled ? 'Enabled' : 'Disabled'}`;
        if (System.OS === System.OSType.IOS) {
            this.layout.touchEnabled = this.isPageTouchEnabled;
        }
        else {
            /**
             * If you need to use this event somewhere else, add the code snippet below.
             */
            this.layout.android.onInterceptTouchEvent = () => {
                if (this.isPageTouchEnabled === false) {
                    return !this.isPageTouchEnabled;
                }
                // ...your other code
            }
        }
    }
}

function onShow(this: PgNoTouch, superOnShow: () => void) {
    superOnShow();
}

function onLoad(this: PgNoTouch, superOnLoad: () => void) {
    superOnLoad();
    this.initButtons();
}
