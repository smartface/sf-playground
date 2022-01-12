import PgBarcodeScannerDesign from "generated/pages/pgBarcodeScanner";
import { BarcodeScanner } from "lib/BarcodeScanner";
import { withDismissAndBackButton } from "@smartface/mixins";
import Router from "@smartface/router/lib/router/Router";
import { Route } from "@smartface/router";
import { backButtonImage } from "lib/constants/style";

export default class PgBarcodeScanner extends withDismissAndBackButton(PgBarcodeScannerDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  initBarcodeScanner() {
    const scanner = new BarcodeScanner(this);
    scanner.addEventListener((content) => {
      console.info(content);
    });
    scanner.show();
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router, {
      image: backButtonImage,
    });
  }

  onLoad() {
    super.onLoad();
    this.initBarcodeScanner();
  }
}
