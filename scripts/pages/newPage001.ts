import NewPage001Design from 'generated/pages/newPage001';

export default class NewPage001 extends NewPage001Design {
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.onHide = onHide.bind(this, this.onHide && this.onHide.bind(this));
    }
}

function onShow(superOnShow: () => void) {
    superOnShow();
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
}

function onHide(superOnHide: () => void) {
    superOnHide && superOnHide();
}