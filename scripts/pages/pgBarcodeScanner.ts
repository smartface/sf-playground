import PgBarcodeScannerDesign from 'generated/pages/pgBarcodeScanner';
import { BarcodeScanner } from 'lib/BarcodeScanner';

export default class PgBarcodeScanner extends PgBarcodeScannerDesign {
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    initBarcodeScanner() {
        const scanner = new BarcodeScanner(this);
        scanner.addEventListener(content => {
            console.info(content);
        });
        scanner.show();
    }
}

function onShow(superOnShow: () => void) {
    superOnShow();
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initBarcodeScanner();
}
