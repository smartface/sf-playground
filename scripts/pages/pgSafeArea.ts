import PgSafeAreaDesign from 'generated/pages/pgSafeArea';
import Screen from '@smartface/native/device/screen';
import System from '@smartface/native/device/system';

export default class PgSafeArea extends PgSafeAreaDesign {
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.ios.onSafeAreaPaddingChange = (padding) => {
            this.dispatch({
                type: "updateUserStyle",
                userStyle: {
                    paddingBottom: padding.bottom,
                    paddingLeft: padding.left,
                    paddingRight: padding.right,
                    paddingTop: padding.top
                }
            });
            this.layout.applyLayout();
        }
    }
}

function onShow(this: PgSafeArea, superOnShow: () => void) {
    superOnShow();
}

function onLoad(this: PgSafeArea, superOnLoad: () => void) {
    superOnLoad();
}

