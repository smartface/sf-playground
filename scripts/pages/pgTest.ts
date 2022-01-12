import Page1Design from "generated/pages/page1";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router, Route } from "@smartface/router";
import { backButtonImage } from "lib/constants/style";

export default class PgTest extends withDismissAndBackButton(Page1Design) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router, {
      image: backButtonImage,
    });
  }

  onLoad() {
    super.onLoad();
  }
}
