import PgModalTestDesign from 'generated/pages/pgModalTest';
import { Router, NativeStackRouter } from '@smartface/router';

export default class PgModalTest extends PgModalTestDesign {
    router: any;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    initButton() {
        this.btnOpenModal.onPress = () => {
            this.router.push('modal');
        }
        this.btnDismiss.onPress = () => {
            if (Router.currentRouter instanceof NativeStackRouter) {
                Router.currentRouter.dismiss();
            }
            else {
                alert("This page is not derived from modal.")
            }
        }
    }
}

function onShow(this: PgModalTest, superOnShow: () => void) {
    superOnShow();
}

function onLoad(this: PgModalTest, superOnLoad: () => void) {
    superOnLoad();
    this.initButton();
}
