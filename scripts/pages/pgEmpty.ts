import Page1Design from 'generated/pages/page1';

export default class PgEmpty extends Page1Design {
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
}


function onShow(this: PgEmpty, superOnShow: () => void) {
    superOnShow();
}

function onLoad(this: PgEmpty, superOnLoad: () => void) {
    superOnLoad();
}
