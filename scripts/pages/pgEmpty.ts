import Page1Design from 'generated/pages/page1';

export default class Page1 extends Page1Design {
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
}


function onShow(this: Page1, superOnShow: () => void) {
    superOnShow();
}

function onLoad(this: Page1, superOnLoad: () => void) {
    superOnLoad();
}
