import Page1Design from "generated/pages/page1";
import { Route } from "@smartface/router";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router } from "@smartface/router";
import { backButtonImage } from "lib/constants/style";

export default class PgEmpty extends withDismissAndBackButton(Page1Design) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }
  onLoad() {
    super.onLoad();
  }
}
