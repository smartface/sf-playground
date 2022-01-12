import PgModalTestDesign from "generated/pages/pgModalTest";
import { NativeStackRouter } from "@smartface/router";
import Router from "@smartface/router/lib/router/Router";
import { Route } from "@smartface/router";
import { withDismissAndBackButton } from "@smartface/mixins";


export default class PgModalTest extends withDismissAndBackButton(PgModalTestDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  initButton() {
    this.btnOpenModal.onPress = () => {
      this.router.push("modal");
    };
    this.btnDismiss.onPress = () => {
      if (Router.currentRouter instanceof NativeStackRouter) {
        Router.currentRouter.dismiss();
      } else {
        alert("This page is not derived from modal.");
      }
    };
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
    this.initButton();
  }
}
