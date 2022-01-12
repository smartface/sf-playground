import PgSafeAreaDesign from "generated/pages/pgSafeArea";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router, Route } from "@smartface/router";


export default class PgSafeArea extends withDismissAndBackButton(PgSafeAreaDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.ios.onSafeAreaPaddingChange = (padding) => {
      this.dispatch({
        type: "updateUserStyle",
        userStyle: {
          paddingBottom: padding.bottom,
          paddingLeft: padding.left,
          paddingRight: padding.right,
          paddingTop: padding.top,
        },
      } as any);
      this.layout.applyLayout();
    };
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
  }

  onLoad() {
    super.onLoad();
  }
}
