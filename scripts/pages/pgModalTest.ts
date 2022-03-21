import PgModalTestDesign from "generated/pages/pgModalTest";
import { NativeStackRouter } from "@smartface/router";
import Router from "@smartface/router/lib/router/Router";
import { Route } from "@smartface/router";
import { withDismissAndBackButton } from "@smartface/mixins";


export default class PgModalTest extends withDismissAndBackButton(PgModalTestDesign) {
    state = 0;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }
  initButton() {
    this.btnOpenModal.onPress = () => {
        if(this.state != 2)
            this.router.push("modal");
        this.router.push('/root/btb/tab3/modal/test')
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
    this.state +=1;
  }

  onLoad() {
    super.onLoad();
    this.initButton();
  }
}
